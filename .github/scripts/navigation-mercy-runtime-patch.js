const fs = require('fs');

const indexPath = 'github-pages-runtime/index.html';
const appPath = 'github-pages-runtime/app.js';
let html = fs.readFileSync(indexPath, 'utf8').replace(/^\uFEFF/, '');
let app = fs.readFileSync(appPath, 'utf8');

const replaceAll = (text, from, to) => text.split(from).join(to);
const apply = (text, pairs) => pairs.reduce((out, [from, to]) => replaceAll(out, from, to), text);

if (!html.includes('<a class="skip-link" href="#mainContent">Skip to workspace</a>')) {
  html = html.replace('<body data-auth="signed-out" data-role="signed-out">', '<body data-auth="signed-out" data-role="signed-out">\n<a class="skip-link" href="#mainContent">Skip to workspace</a>');
}

html = apply(html, [
  ['data-open-add-new>+ Add New</button>', 'data-open-add-new>+ Add</button>'],
  ['<div class="sync-pill" data-companion="bee">', '<div class="sync-pill" data-companion="bee" aria-live="polite" aria-atomic="true">'],
  ['<main>', '<main id="mainContent" tabindex="-1">'],
  ['Requests, files, estimates, and material lists go through review before they become live operational records.', 'Requests, files, estimates, and material lists go through Needs Review before they become active work.'],
  ['<strong>Coming from RLS</strong>', '<strong>Coming from workspace permissions</strong>'],
  ['<h2>Access limited</h2>', '<h2>That area is not available for this login</h2>'],
  ['Go to my home</button>', 'Return to my home</button>'],
  ['data-open-add-new>Quick Add</button>', 'data-open-add-new>Add</button>'],
  ['Review Queue intake desk', 'Needs Review intake desk'],
  ['<span>Import Review</span>', '<span>Needs Review</span>'],
  ['<h2>Import Review</h2>', '<h2>Needs Review</h2>'],
  ['Extracted PDF, Excel, CSV, and incoming field notes wait here before becoming live records.', 'Requests, files, receipts, estimates, material lists, and spreadsheet rows wait here before becoming active work.'],
  ['Files are staged with this request until you submit it to Import Review.', 'Files stay with this request until the operations team reviews it.'],
  ['Add to Import Review</button>', 'Send for Review</button>'],
  ['<h3>Waiting for Review</h3>', '<h3>Needs Review</h3>'],
  ['Back to Review</button>', 'Back to Needs Review</button>'],
  ['Reject / Archive</button>', 'Move out of active work</button>'],
  ['<h3>Materials Review</h3>', '<h3>Materials Needing Review</h3>'],
  ['id="workOrderDetailArchiveBtn">Archive</button>', 'id="workOrderDetailArchiveBtn">Move out of active work</button>'],
  ['<h3>Archived Work Orders</h3><p class="meta">Recoverable records kept out of the active field list.</p>', '<h3>Inactive Work Orders</h3><p class="meta">Recoverable records kept out of the active field list.</p>'],
  ['<h2>Documents</h2>', '<h2>Upload Something</h2>'],
  ['PDF, Excel, CSV, photos, estimates, and reports linked back to buildings, spaces, assets/systems, vehicles, and work orders.', 'Upload a photo, receipt, PDF estimate or invoice, spreadsheet, or supporting file. The app routes it safely behind the scenes.'],
  ['Type<select id="fileType"><option>Contract</option><option>Bid</option><option>Estimate</option><option>Invoice</option><option>Fuel Receipt</option><option>Inspection</option><option>Photo</option><option>Report</option><option>Checklist</option><option>Other</option></select>', 'What kind of file is this?<select id="fileType"><option>Photo</option><option>Fuel Receipt</option><option>Estimate</option><option>Invoice</option><option>Spreadsheet</option><option>Contract</option><option>Bid</option><option>Inspection</option><option>Report</option><option>Checklist</option><option>Other / Not sure</option></select>'],
  ['<h2>Import / Extraction Center</h2>', '<h2>Admin Import Tools</h2>'],
  ['Pull information from Excel, CSV, and PDF files into the Review Queue before it becomes live work.', 'Pull information from Excel, CSV, and PDF files into Needs Review before it becomes active work.'],
  ['Smart import is on. Recognized records are staged in Review Queue first so they can be checked, approved, or archived.', 'Smart import is on. Recognized records are staged in Needs Review first so they can be checked, approved, or moved out of active work.'],
  ['Fix or match spreadsheet columns before rows are staged in Import Review.', 'Fix or match spreadsheet columns before rows are staged in Needs Review.'],
  ['Retry Pending Writes</button>', 'Retry items waiting to sync</button>'],
  ['Pending retry queue:', 'Waiting to sync:'],
  ['Direct table writes are on: creates, edits, archives, documents, and import reviews write to normalized <strong>field_ops_*</strong> tables.', 'Secure workspace records are on: creates, edits, files, and items needing review write to Supabase workspace tables.'],
  ['<span>Pending Writes</span>', '<span>Waiting to Sync</span>'],
  ['Choose the closest option. If you are not sure, send it to Submitted Request and it will wait in Import Review.', 'Choose the closest option. If you are not sure, send it to Needs Review and the operations team can route it.'],
  ['<div class="modal-backdrop" id="editModal">', '<div class="modal-backdrop" id="editModal" role="dialog" aria-modal="true" aria-labelledby="editModalTitle">'],
  ['Make changes, then save. Records write directly to Supabase.', 'Make changes, then save. Changes update the secure workspace records.'],
]);

const nav = [
  '  <nav class="top-nav" aria-label="Primary tasks">',
  '    <button class="tab" data-view="fieldPortal" data-nav-group="portal">My Home</button>',
  '    <button class="tab active" data-view="dashboard" data-nav-group="command">Today</button>',
  '    <button class="tab" data-view="workOrders" data-nav-group="operations">Work</button>',
  '    <button class="tab" data-view="documents" data-nav-group="support">Upload</button>',
  '    <button class="tab" data-view="importReview" data-nav-group="command">Needs Review</button>',
  '    <button class="tab" data-view="settings" data-nav-group="oversight">More</button>',
  '  </nav>',
].join('\n');
html = html.replace(/  <nav class="top-nav"[\s\S]*?  <\/nav>/, nav);
html = html.replace('        <button type="button" class="ghost" onclick="loadDemoPilotData()">Load Demo Data</button>\n        <button type="button" class="ghost" onclick="clearDemoPilotData()">Clear Demo</button>\n', '');
if (!html.split('<section id="settings"')[1]?.includes('loadDemoPilotData()')) {
  html = html.replace('<button class="ghost" onclick="downloadBackup()">Download Backup</button>', '<button class="ghost" onclick="downloadBackup()">Download Backup</button>\n        <button class="ghost" onclick="loadDemoPilotData()">Load Demo Data</button>\n        <button class="ghost" onclick="clearDemoPilotData()">Clear Demo</button>');
}

app = apply(app, [
  ['Supabase RLS remains the source of truth; this screen is hidden to prevent mistakes.', 'Database permission rules still protect the workspace; this screen is hidden to prevent mistakes.'],
  ['if(importTitle) importTitle.textContent = submitterOnly ? "Submit Request" : "Import Review";', 'if(importTitle) importTitle.textContent = submitterOnly ? "Submit Request" : "Needs Review";'],
  [': "Extracted PDF, Excel, CSV, and incoming field notes wait here before becoming live records.";', ': "Requests, files, receipts, estimates, material lists, and spreadsheet rows wait here before becoming active work.";'],
  ['if(submitButton) submitButton.textContent = submitterOnly ? "Submit Request" : "Add to Import Review";', 'if(submitButton) submitButton.textContent = submitterOnly ? "Submit Request" : "Send for Review";'],
  ['Approve when it is ready to become operational work.', 'Approve when it is ready to become active work.'],
  ['if(documentsTitle) documentsTitle.textContent = submitterOnly ? "Uploads" : "Documents";', 'if(documentsTitle) documentsTitle.textContent = "Upload Something";'],
  ['if(documentsMeta) documentsMeta.textContent = submitterOnly ? "Upload photos, PDFs, spreadsheets, and receipts for the operations team." : "PDF, Excel, CSV, photos, estimates, and reports stored in Supabase Storage and linked to records.";', 'if(documentsMeta) documentsMeta.textContent = submitterOnly ? "Upload a photo, receipt, PDF, spreadsheet, or file for the operations team." : "Upload a photo, receipt, PDF estimate or invoice, spreadsheet, or supporting file and link it to the right work.";'],
  ['tab.textContent = canSubmitOnly() ? "Submit Request" : "Review Queue";', 'tab.textContent = canSubmitOnly() ? "Submit" : "Needs Review";'],
  ['tab.textContent = canSubmitOnly() ? "Upload Document" : "Documents";', 'tab.textContent = "Upload";'],
  ['tab.textContent = canSubmitOnly() ? "My Home" : "Field Portal";', 'tab.textContent = "My Home";'],
  ['if(!requireArchivePermission("archive operational records")) throw new Error("Role cannot archive this record");', 'if(!requireArchivePermission("move records out of active work")) throw new Error("Role cannot move this record out of active work");'],
  ['setStatus("Archiving...");', 'setStatus("Moving out of active work...");'],
  ['setStatus("Archived");\n    await refreshAfterWrite("Archived");', 'setStatus("Moved out of active work");\n    await refreshAfterWrite("Moved out of active work");'],
  ['>Archive</button>', '>Move out of active work</button>'],
  ['archive operational records', 'move records out of active work'],
  ['Archive this item? It will be hidden from active lists but kept for history.', 'Move this item out of active work? It will be hidden from active lists but kept for history.'],
  ['stage rows to Import Review.', 'stage rows to Needs Review.'],
  ['PDF staged in Import Review.', 'PDF staged in Needs Review.'],
  ['staged in Import Review.', 'staged in Needs Review.'],
  ['if(viewId === "materials")', 'if(false && viewId === "materials")'],
  ['if(viewId === "assets")', 'if(false && viewId === "assets")'],
  ['if(viewId === "vehicles")', 'if(false && viewId === "vehicles")'],
  ['const visible = isAuthenticated() && currentWorkspace && canManageOperations();\n    primaryAdd.classList.toggle("hidden", !visible);\n    primaryAdd.hidden = !visible;', 'const visible = isAuthenticated() && currentWorkspace;\n    primaryAdd.classList.toggle("hidden", !visible);\n    primaryAdd.hidden = !visible;\n    primaryAdd.textContent = canSubmitOnly() ? "+ Send" : "+ Add";'],
]);

app = app.replace('function setActiveView(id){\n  activeViewId = id;\n  document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.id===id));\n  document.querySelectorAll(".tab").forEach(b=>b.classList.toggle("active",b.dataset.view===id));\n  updateBackButton();\n  window.scrollTo({top:0,behavior:"smooth"});\n}', 'function setActiveView(id){\n  activeViewId = id;\n  document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.id===id));\n  document.querySelectorAll(".tab").forEach(b=>{\n    const active = b.dataset.view===id;\n    b.classList.toggle("active", active);\n    b.setAttribute?.("aria-current", active ? "page" : "false");\n    b.setAttribute?.("aria-selected", active ? "true" : "false");\n  });\n  updateBackButton();\n  document.getElementById("mainContent")?.focus?.({ preventScroll:true });\n  window.scrollTo({top:0,behavior:"smooth"});\n}');

app = app.replace('if(!canAccessView(id)){\n    if(id !== activeViewId && !options.skipHistory){\n      AppState.pushViewHistory(runtimeState, activeViewId);\n    }\n    const home = defaultViewForRole();\n    if(home && home !== id && document.getElementById(home)){\n      setStatus("Redirected to your workspace");\n      showView(home, { skipHistory:true });\n    } else {\n      showAccessDenied(id);\n    }\n    return;\n  }', 'if(!canAccessView(id)){\n    if(!isAuthenticated()){\n      setActiveView("login");\n      return;\n    }\n    if(id !== activeViewId && !options.skipHistory){\n      AppState.pushViewHistory(runtimeState, activeViewId);\n    }\n    showAccessDenied(id);\n    return;\n  }');

if (!app.includes('function setupFormDisclosure(){')) {
  const disclosure = `function setupFormDisclosure(){
  const collapsedForms = ["projectForm","vendorForm","bidForm","materialForm","taskForm","buildingForm","spaceForm","assetForm","vehicleForm","fuelReceiptForm","budgetForm"];
  collapsedForms.forEach(formId => {
    const form = document.getElementById(formId);
    const panel = form?.closest?.(".panel");
    const title = panel?.querySelector?.(".panel-title");
    if(!form || !panel || !title || typeof title.appendChild !== "function" || panel.dataset.formDisclosureReady) return;
    panel.dataset.formCollapsed = "true";
    panel.dataset.formDisclosureReady = "true";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "ghost form-disclosure-btn";
    button.textContent = formId === "taskForm" ? "Create Work Order" : "Add / Edit";
    button.setAttribute("aria-expanded", "false");
    button.addEventListener("click", () => {
      const collapsed = panel.dataset.formCollapsed !== "false";
      panel.dataset.formCollapsed = collapsed ? "false" : "true";
      button.textContent = collapsed ? "Hide Form" : (formId === "taskForm" ? "Create Work Order" : "Add / Edit");
      button.setAttribute("aria-expanded", collapsed ? "true" : "false");
      if(collapsed) form.querySelector?.("input,select,textarea,button")?.focus?.();
    });
    title.appendChild(button);
  });
}

`;
  app = app.replace('function goBackView(){', disclosure + 'function goBackView(){');
}
app = app.replace('InteractionService?.init?.();\ninitializeAuth();', 'InteractionService?.init?.();\nsetupFormDisclosure();\ninitializeAuth();');

fs.writeFileSync(indexPath, '\uFEFF' + html, 'utf8');
fs.writeFileSync(appPath, app, 'utf8');
