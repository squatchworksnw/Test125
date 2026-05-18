from pathlib import Path

index_path = Path("index.html")
app_path = Path("app.js")

index_text = index_path.read_text(encoding="utf-8-sig")
index_text = index_text.replace(
    'onclick="showView(\'documents\')">Upload Photo / Document',
    'onclick="openUploadFile()">Upload Photo / Document',
)
index_text = index_text.replace(
    'onclick="showView(\'documents\')">\n        <span>Upload Photo / Document</span>',
    'onclick="openUploadFile()">\n        <span>Upload Photo / Document</span>',
)
index_text = index_text.replace(
    'onclick="showView(\'documents\')">Upload Receipt',
    'onclick="openUploadFile()">Upload Receipt',
)
index_path.write_text(index_text, encoding="utf-8")

app_text = app_path.read_text(encoding="utf-8")
needle = '''function openMySubmissions(){
  showView("importReview");
  setFormCollapsed("submissionForm", true);
}

function openSupplyRequest(){'''
replacement = '''function openMySubmissions(){
  showView("importReview");
  setFormCollapsed("submissionForm", true);
}

function openUploadFile(){
  showView("documents");
  setFormCollapsed("fileForm", false);
}

function openSupplyRequest(){'''
if "function openUploadFile()" not in app_text:
    app_text = app_text.replace(needle, replacement)
app_path.write_text(app_text, encoding="utf-8")
