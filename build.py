#!/usr/bin/env python3
"""Assemble deploy/ from src/: shared head, header, footer, scripts around each page in src/pages."""
import re, shutil, pathlib
root = pathlib.Path(__file__).resolve().parent
src, out = root / 'src', root / 'deploy'
out.mkdir(exist_ok=True)
if (out / 'img').exists(): shutil.rmtree(out / 'img')
shutil.copytree(root / 'img', out / 'img')
shutil.copy(src / 'styles.css', out / 'styles.css')
shutil.copy(src / 'scripts.js', out / 'scripts.js')
header = (src / 'partials/header.html').read_text(encoding='utf-8')
footer = (src / 'partials/footer.html').read_text(encoding='utf-8')
HEAD = '''<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600;700;800&display=swap">
<link rel="stylesheet" href="styles.css">
</head>
<body>
'''
TAIL = '''<script src="scripts.js"></script>
</body>
</html>
'''
for page in sorted((src / 'pages').glob('*.html')):
    body = page.read_text(encoding='utf-8')
    meta = dict(re.findall(r'<!-- (title|desc|nav): (.*?) -->', body))
    body = re.sub(r'<!-- (title|desc|nav): .*? -->\n', '', body)
    nav = meta.get('nav', '')
    hdr = header
    for key in ('HOME', 'ABOUT', 'PRODUCTS', 'CONTACT'):
        hdr = hdr.replace('{{ON_%s}}' % key, 'on' if key == nav else '')
    hdr = hdr.replace('{{OPEN_PRODUCTS}}', 'open' if nav == 'PRODUCTS' else '')
    hdr = hdr.replace(' class=""', '').replace('class="has-sub "', 'class="has-sub"').replace(' open>', ' open>').replace('<details class="mdd" >', '<details class="mdd">')
    html = HEAD.format(title=meta['title'], desc=meta['desc']) + hdr + body + footer + TAIL
    (out / page.name).write_text(html, encoding='utf-8')
    print('built', page.name, len(html), 'bytes')
