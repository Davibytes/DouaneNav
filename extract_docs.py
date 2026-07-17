import os
import re
import zipfile

base = 'documentation'
files = [
    'SOFTWARE REQUIREMENTS SPECIFICATION.docx',
    'COMPLETE PROJECT DESCRIPTION.docx',
    'CUSTOMSTRACK AI COMPLETE SOFTWARE ARCHITECTURE.docx',
    'DESCRIPTION DU PROJET.docx',
]

for name in files:
    path = os.path.join(base, name)
    print('FILE:', name)
    if not os.path.exists(path):
        print('MISSING')
        print('\n---\n')
        continue
    try:
        with zipfile.ZipFile(path) as z:
            for info in z.infolist():
                if info.filename.endswith('document.xml'):
                    data = z.read(info.filename).decode('utf-8', errors='ignore')
                    text = re.sub(r'<[^>]+>', ' ', data)
                    text = re.sub(r'\s+', ' ', text)
                    print(text[:4000])
                    break
            else:
                print('NO document.xml FOUND')
    except Exception as e:
        print('ERR', e)
    print('\n---\n')
