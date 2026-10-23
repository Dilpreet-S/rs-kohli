"""Static release checks for the actual emitted pages and links."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import re
ROOT=Path(__file__).resolve().parents[1]/'dist'
class Page(HTMLParser):
 def __init__(self): super().__init__();self.tags=[];self.ids=set();self.links=[];self.assets=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs);self.tags.append(tag)
  if 'id' in a:self.ids.add(a['id'])
  if tag=='a':self.links.append(a)
  if tag in ('script','img') and a.get('src'):self.assets.append(a['src'])
  if tag=='link' and a.get('href'):self.assets.append(a['href'])
pages={p.name:Page() for p in ROOT.glob('*.html') if not p.name.startswith('__')}
for name,p in pages.items():p.feed((ROOT/name).read_text())
checks=0
for name,p in pages.items():
 assert p.tags.count('h1')==1,(name,'h1')
 assert 'form' not in p.tags,(name,'unexpected form')
 assert 'main' in p.tags,(name,'main')
 for a in p.links:
  u=urlsplit(a.get('href',''))
  if u.scheme=='https':
   assert u.hostname in ('forms.gle','docs.google.com'),(name,u.hostname)
   assert a.get('target')=='_blank' and {'noopener','noreferrer'}<=set(a.get('rel','').split()),(name,'external security')
  elif not u.scheme:
   target=u.path or name
   assert target in pages,(name,target)
   if u.fragment:assert unquote(u.fragment) in pages[target].ids,(name,target,u.fragment)
  checks+=1
 for src in p.assets:
  if not urlsplit(src).scheme:assert (ROOT/src).is_file(),(name,src)
 for m in re.findall(r"from ['\"](.+?)['\"]",(ROOT/'assets/main.js').read_text()):
  assert (ROOT/'assets'/m).is_file(),m
assert 'Prince William County' in (ROOT/'services.html').read_text()
assert all(t in (ROOT/'about.html').read_text() for t in ['Arlington County','Fairfax County','Anne Arundel County','4.0','Virginia Tech','VDOT'])
print(f'PASS: {len(pages)} pages, {checks} links, local assets/modules, required content, and no custom forms.')
