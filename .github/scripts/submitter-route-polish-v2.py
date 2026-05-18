from pathlib import Path
p = Path('index.html')
html = p.read_text(encoding='utf-8-sig')
html = html.replace('onclick="showView(\'importReview\')">Submit Estimate', 'onclick="openSubmitRequest()">Submit Estimate')
html = html.replace('<button class="workspace-card review" type="button" onclick="showView(\'importReview\')">\n        <span>Submit New Request</span>', '<button class="workspace-card review" type="button" onclick="openSubmitRequest()">\n        <span>Submit New Request</span>')
html = html.replace('<button class="workspace-card materials" type="button" onclick="showView(\'materials\')">\n        <span>Purchase / Supply Request</span>', '<button class="workspace-card materials" type="button" onclick="openSupplyRequest()">\n        <span>Purchase / Supply Request</span>')
html = html.replace('?v=20260518-qa5', '?v=20260518-qa6')
p.write_text('\ufeff' + html.lstrip('\ufeff'), encoding='utf-8')
