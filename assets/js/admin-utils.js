/* =====================================================
   GRAPTO ADMIN UTILITIES
===================================================== */

/* =====================================================
   LOADING
===================================================== */

function showLoading(){

const loader=document.getElementById("loadingOverlay");

if(loader){

loader.style.display="flex";

}

}

function hideLoading(){

const loader=document.getElementById("loadingOverlay");

if(loader){

loader.style.display="none";

}

}

/* =====================================================
   TOAST
===================================================== */

function showToast(title,message,type="success"){

const toast=document.getElementById("toast");

if(!toast) return;

const titleElement=document.getElementById("toastTitle");

const messageElement=document.getElementById("toastMessage");

titleElement.textContent=title;

messageElement.textContent=message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},3000);

}/* =====================================================
   CONFIRM ACTION
===================================================== */

function confirmAction(message,onConfirm){

const confirmed=confirm(message);

if(confirmed){

onConfirm();

}

}

/* =====================================================
   GENERATE UNIQUE ID
===================================================== */

function generateId(prefix="id"){

return prefix+"_"+Date.now()+"_"+Math.floor(Math.random()*10000);

}

/* =====================================================
   FORMAT DATE
===================================================== */

function formatDate(date=new Date()){

return date.toLocaleDateString("en-IN",{

day:"2-digit",

month:"short",

year:"numeric"

});

}

/* =====================================================
   FORMAT TIME
===================================================== */

function formatTime(date=new Date()){

return date.toLocaleTimeString("en-IN",{

hour:"2-digit",

minute:"2-digit"

});

}/* =====================================================
   COPY TO CLIPBOARD
===================================================== */

function copyToClipboard(text){

navigator.clipboard.writeText(text);

showToast(

"Copied",

"Copied to clipboard successfully.",

"success"

);

}

/* =====================================================
   IMAGE PREVIEW
===================================================== */

function previewImage(input,previewContainer){

if(!input.files.length) return;

const file=input.files[0];

const reader=new FileReader();

reader.onload=function(e){

previewContainer.innerHTML=`
<img src="${e.target.result}" alt="Preview">
`;

};

reader.readAsDataURL(file);

}

/* =====================================================
   RESET FORM
===================================================== */

function resetForm(form){

if(!form) return;

form.reset();

showToast(

"Reset",

"Form has been reset.",

"success"

);

}

/* =====================================================
   INITIALIZE UTILITIES
===================================================== */

document.addEventListener("DOMContentLoaded",()=>{

console.log("GRAPTO Admin Utilities Loaded");

});
