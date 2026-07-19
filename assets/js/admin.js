/* =====================================================
   GRAPTO ADMIN PANEL
   Version 1.0
===================================================== */

document.addEventListener("DOMContentLoaded",()=>{

initializeSidebar();

initializeNavigation();

initializeSearch();

initializeNotifications();

});

/* =====================================================
   SIDEBAR
===================================================== */

function initializeSidebar(){

const sidebar=document.querySelector(".sidebar");

const toggle=document.querySelector("#sidebarToggle");

if(!sidebar||!toggle) return;

toggle.addEventListener("click",()=>{

sidebar.classList.toggle("active");

});

}

/* =====================================================
   NAVIGATION
===================================================== */

function initializeNavigation(){

const links=document.querySelectorAll(".sidebar-menu a");

links.forEach(link=>{

link.addEventListener("click",()=>{

links.forEach(item=>item.classList.remove("active"));

link.classList.add("active");

});

});

}

/* =====================================================
   SEARCH
===================================================== */

function initializeSearch(){

const search=document.querySelector(".admin-search input");

if(!search) return;

search.addEventListener("input",(e)=>{

const value=e.target.value.trim().toLowerCase();

console.log("Searching:",value);

});

}

/* =====================================================
   NOTIFICATIONS
===================================================== */

function initializeNotifications(){

const notification=document.querySelector("#notificationBtn");

if(!notification) return;

notification.addEventListener("click",()=>{

showToast(

"Notifications",

"No new notifications available."

);

});

}/* =====================================================
   TOAST NOTIFICATION
===================================================== */

function showToast(title,message,type="success"){

let toast=document.querySelector(".toast");

if(toast){

toast.remove();

}

toast=document.createElement("div");

toast.className="toast";

const colors={

success:"var(--primary)",

error:"#dc2626",

warning:"#d97706",

info:"#2563eb"

};

toast.style.borderLeftColor=colors[type]||colors.success;

toast.innerHTML=`

<h4>${title}</h4>

<p>${message}</p>

`;

document.body.appendChild(toast);

setTimeout(()=>{

toast.style.opacity="0";

toast.style.transform="translateY(20px)";

setTimeout(()=>{

toast.remove();

},300);

},3000);

}

/* =====================================================
   LOADING OVERLAY
===================================================== */

function showLoading(){

if(document.querySelector(".loading-overlay")) return;

const overlay=document.createElement("div");

overlay.className="loading-overlay";

overlay.innerHTML=`

<div class="loading-spinner"></div>

`;

document.body.appendChild(overlay);

}

function hideLoading(){

const overlay=document.querySelector(".loading-overlay");

if(overlay){

overlay.remove();

}

}

/* =====================================================
   CONFIRM DIALOG
===================================================== */

function confirmAction(message,callback){

const confirmed=window.confirm(message);

if(confirmed && typeof callback==="function"){

callback();

}

}

/* =====================================================
   GENERATE UNIQUE ID
===================================================== */

function generateId(prefix="item"){

return `${prefix}_${Date.now()}_${Math.floor(Math.random()*1000)}`;

}/* =====================================================
   DASHBOARD NAVIGATION
===================================================== */

function initializeDashboard(){

const menuLinks=document.querySelectorAll("[data-page]");

const pages=document.querySelectorAll(".admin-page");

if(!menuLinks.length||!pages.length) return;

menuLinks.forEach(link=>{

link.addEventListener("click",(e)=>{

e.preventDefault();

const target=link.dataset.page;

switchPage(target);

});

});

}

function switchPage(pageId){

const pages=document.querySelectorAll(".admin-page");

const menuLinks=document.querySelectorAll("[data-page]");

pages.forEach(page=>{

page.style.display="none";

});

const activePage=document.getElementById(pageId);

if(activePage){

activePage.style.display="block";

}

menuLinks.forEach(link=>{

link.classList.remove("active");

if(link.dataset.page===pageId){

link.classList.add("active");

}

});

const title=document.querySelector(".page-title");

if(title){

const activeLink=document.querySelector(`[data-page="${pageId}"]`);

if(activeLink){

title.textContent=activeLink.textContent.trim();

}

}

}

/* =====================================================
   INITIAL PAGE
===================================================== */

document.addEventListener("DOMContentLoaded",()=>{

initializeDashboard();

const firstPage=document.querySelector(".admin-page");

if(firstPage){

document.querySelectorAll(".admin-page").forEach(page=>{

page.style.display="none";

});

firstPage.style.display="block";

}

});

/* =====================================================
   PAGE REFRESH
===================================================== */

function refreshCurrentPage(){

const active=document.querySelector(".sidebar-menu a.active");

if(active){

const pageId=active.dataset.page;

if(pageId){

switchPage(pageId);

}

}

}/* =====================================================
   IMAGE PREVIEW
===================================================== */

function initializeImageUploads(){

const uploadInputs=document.querySelectorAll('input[type="file"]');

uploadInputs.forEach(input=>{

input.addEventListener("change",(e)=>{

const file=e.target.files[0];

if(!file) return;

const previewContainer=input.closest(".form-group")?.querySelector(".image-preview");

if(!previewContainer) return;

const reader=new FileReader();

reader.onload=function(event){

previewContainer.innerHTML=`

<img src="${event.target.result}" alt="Preview">

`;

};

reader.readAsDataURL(file);

});

});

}

/* =====================================================
   FORM RESET
===================================================== */

function resetForm(formSelector){

const form=document.querySelector(formSelector);

if(!form) return;

form.reset();

form.querySelectorAll(".image-preview").forEach(preview=>{

preview.innerHTML="";

});

}

/* =====================================================
   SAVE BUTTONS
===================================================== */

function initializeSaveButtons(){

document.querySelectorAll("[data-save]").forEach(button=>{

button.addEventListener("click",()=>{

showLoading();

setTimeout(()=>{

hideLoading();

showToast(

"Saved Successfully",

"Your changes have been saved locally.",

"success"

);

},1000);

});

});

}

/* =====================================================
   UNSAVED CHANGES DETECTION
===================================================== */

let hasUnsavedChanges=false;

function initializeUnsavedChanges(){

document.querySelectorAll("input, textarea, select").forEach(field=>{

field.addEventListener("input",()=>{

hasUnsavedChanges=true;

});

});

window.addEventListener("beforeunload",(e)=>{

if(hasUnsavedChanges){

e.preventDefault();

e.returnValue="";

}

});

}

/* =====================================================
   INITIALIZE FORM MODULES
===================================================== */

document.addEventListener("DOMContentLoaded",()=>{

initializeImageUploads();

initializeSaveButtons();

initializeUnsavedChanges();

});/* =====================================================
   TABLE SEARCH
===================================================== */

function initializeTableSearch(){

document.querySelectorAll("[data-table-search]").forEach(searchBox=>{

searchBox.addEventListener("input",function(){

const keyword=this.value.toLowerCase();

const tableId=this.dataset.tableSearch;

const table=document.getElementById(tableId);

if(!table) return;

const rows=table.querySelectorAll("tbody tr");

rows.forEach(row=>{

const text=row.textContent.toLowerCase();

row.style.display=text.includes(keyword)?"":"none";

});

});

});

}

/* =====================================================
   TABLE ACTIONS
===================================================== */

function initializeTableActions(){

/* EDIT */

document.querySelectorAll("[data-edit]").forEach(button=>{

button.addEventListener("click",()=>{

const item=button.dataset.edit;

showToast(

"Edit",

`Opening ${item} for editing...`,

"info"

);

});

});

/* VIEW */

document.querySelectorAll("[data-view]").forEach(button=>{

button.addEventListener("click",()=>{

const item=button.dataset.view;

showToast(

"View",

`Viewing ${item}...`,

"info"

);

});

});

/* DELETE */

document.querySelectorAll("[data-delete]").forEach(button=>{

button.addEventListener("click",()=>{

const item=button.dataset.delete;

confirmAction(

`Delete "${item}"?`,

()=>{

const row=button.closest("tr");

if(row){

row.remove();

}

showToast(

"Deleted",

`${item} removed successfully.`,

"success"

);

}

);

});

});

}

/* =====================================================
   BULK SELECT
===================================================== */

function initializeBulkSelection(){

const master=document.querySelector("#selectAll");

if(!master) return;

master.addEventListener("change",()=>{

document.querySelectorAll(".row-checkbox").forEach(box=>{

box.checked=master.checked;

});

});

}

/* =====================================================
   INITIALIZE TABLE MODULES
===================================================== */

document.addEventListener("DOMContentLoaded",()=>{

initializeTableSearch();

initializeTableActions();

initializeBulkSelection();

});/* =====================================================
   LOCAL DRAFT STORAGE
===================================================== */

function saveDraft(key,data){

localStorage.setItem(

`grapto_${key}`,

JSON.stringify(data)

);

}

function loadDraft(key){

const data=localStorage.getItem(`grapto_${key}`);

if(!data) return null;

try{

return JSON.parse(data);

}

catch(e){

return null;

}

}

function clearDraft(key){

localStorage.removeItem(`grapto_${key}`);

}

/* =====================================================
   AUTO SAVE (FOUNDATION)
===================================================== */

function autoSave(){

const forms=document.querySelectorAll("form[data-autosave]");

forms.forEach(form=>{

const formData={};

new FormData(form).forEach((value,key)=>{

formData[key]=value;

});

saveDraft(form.id||generateId("form"),formData);

});

}

/* =====================================================
   KEYBOARD SHORTCUTS
===================================================== */

document.addEventListener("keydown",(e)=>{

/* Ctrl + S */

if((e.ctrlKey||e.metaKey)&&e.key==="s"){

e.preventDefault();

showLoading();

setTimeout(()=>{

hideLoading();

showToast(

"Saved",

"All changes saved successfully.",

"success"

);

hasUnsavedChanges=false;

},700);

}

/* ESC */

if(e.key==="Escape"){

const modal=document.querySelector(".modal-overlay.active");

if(modal){

modal.classList.remove("active");

}

}

});

/* =====================================================
   ADMIN INITIALIZER
===================================================== */

function initializeAdmin(){

console.log("GRAPTO Admin Panel Initialized");

showToast(

"Welcome",

"GRAPTO Admin Panel Ready.",

"success"

);

}

/* =====================================================
   START APPLICATION
===================================================== */

document.addEventListener("DOMContentLoaded",()=>{

initializeAdmin();

});

/* =====================================================
   END OF FILE
===================================================== */
