import json, os, re, sys
from bs4 import BeautifulSoup, Comment
SRC='/home/claude/claude-mrdevello-homepage'; OUT=SRC+'/web/content'
pages=[('home','index.html','/'),('mr-starter','mr-starter/index.html','/mr-starter/'),('mr-pro','mr-pro/index.html','/mr-pro/'),
('mr-team','mr-team/index.html','/mr-team/'),('mr-check','mr-check/index.html','/mr-check/'),('mr-booster','mr-booster/index.html','/mr-booster/'),
('inquiry','inquiry/index.html','/inquiry/'),('philosophy','intro/philosophy/index.html','/intro/philosophy/')]
OLD='https://devello-overview-study.mrdevello2027.chatgpt.site'
reg=[]
for slug,f,route in pages:
    raw=open(os.path.join(SRC,f),encoding='utf-8').read()
    # head / body raw split (keep original markup byte-exact for body)
    hs=raw.index('<head>')+6; he=raw.index('</head>')
    bm=re.search(r'<body([^>]*)>',raw); be=raw.rindex('</body>')
    head=raw[hs:he]; body=raw[bm.end():be]
    soup=BeautifulSoup(head,'html.parser')
    meta={}
    t=soup.find('title'); meta['title']=t.get_text() if t else ''
    d=soup.find('meta',attrs={'name':'description'}); meta['description']=d['content'] if d else ''
    og=soup.find('meta',attrs={'property':'og:image'}); meta['ogImage']=og['content'].replace(OLD,'') if og else None
    ic=soup.find('link',rel='icon'); meta['icon']=ic['href'] if ic else None
    # drop tags handled by Next metadata
    for tag in soup.find_all(['title','meta']): tag.decompose()
    for tag in soup.find_all('link',rel=lambda r: r and any(x in r for x in ['canonical','icon'])): tag.decompose()
    for c in soup.find_all(string=lambda s:isinstance(s,Comment)): c.extract()
    from urllib.parse import urljoin
    nodes=[]
    for t in soup.contents:
        if not getattr(t,'name',None): continue
        a={}
        for k,v in t.attrs.items():
            if k=='data-precedence': continue
            v=' '.join(v) if isinstance(v,list) else v
            if k in('href','src') and not re.match(r'^(/|https?:|data:|mailto:|tel:|#)',v): v=urljoin(route,v)
            a[k]=v
        inner=t.string if t.name in('script','style') else None
        if inner: inner=inner.replace(OLD,'{{SITE_URL}}')
        nodes.append(dict(tag=t.name,attrs=a,inner=inner))
    body=body.replace(OLD,'{{SITE_URL}}')
    battrs=dict(BeautifulSoup('<body'+bm.group(1)+'>','html.parser').body.attrs)
    hm=re.search(r'<html([^>]*)>',raw); hattrs=dict(BeautifulSoup('<html'+hm.group(1)+'></html>','html.parser').html.attrs)
    os.makedirs(f'{OUT}/{slug}',exist_ok=True)
    json.dump(nodes,open(f'{OUT}/{slug}/head.json','w'),ensure_ascii=False,indent=1)
    open(f'{OUT}/{slug}/body.html','w').write(body)
    bc=battrs.get('class',[]); hc=hattrs.get('class',[])
    reg.append(dict(slug=slug,route=route,**meta,bodyClass=' '.join(bc) if isinstance(bc,list) else bc,htmlClass=' '.join(hc) if isinstance(hc,list) else hc,htmlStyle=hattrs.get('style')))
json.dump(reg,open(OUT+'/pages.json','w'),ensure_ascii=False,indent=2)
print(json.dumps(reg,ensure_ascii=False,indent=1)[:3000])
