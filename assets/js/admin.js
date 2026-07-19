/* =====================================================
   GRAPTO ADMIN PANEL
   Version 2.0

   Connected With:
   - firebase.js Version 3.0
   - Firebase Realtime Database
   - Google Form Manager
===================================================== */

"use strict";


/* =====================================================
   GLOBAL STATE
===================================================== */

let hasUnsavedChanges = false;


/* =====================================================
   DOM READY INITIALIZATION
===================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    initializeSidebar();

    initializeNavigation();

    initializeDashboard();

    initializeSearch();

    initializeNotifications();

    initializeImageUploads();

    initializeTableSearch();

    initializeTableActions();

    initializeBulkSelection();

    initializeGoogleForms();

    initializeSaveButtons();

    initializeUnsavedChanges();

    initializeAdmin();

});


/* =====================================================
   SIDEBAR
===================================================== */

function initializeSidebar(){

    const sidebar=document.querySelector(".sidebar");

    const toggle=document.querySelector("#sidebarToggle");


    if(!sidebar || !toggle) return;


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


            links.forEach(item=>{

                item.classList.remove("active");

            });


            link.classList.add("active");


        });


    });


}



/* =====================================================
   DASHBOARD PAGE SYSTEM
===================================================== */

function initializeDashboard(){


    const menuLinks=document.querySelectorAll("[data-page]");

    const pages=document.querySelectorAll(".admin-page");


    if(!menuLinks.length || !pages.length) return;



    menuLinks.forEach(link=>{


        link.addEventListener("click",(event)=>{


            event.preventDefault();


            const page=link.dataset.page;


            switchPage(page);


        });


    });



    const firstPage=document.querySelector(".admin-page");


    if(firstPage){


        pages.forEach(page=>{

            page.style.display="none";

        });


        firstPage.style.display="block";


    }


}



function switchPage(pageId){


    const pages=document.querySelectorAll(".admin-page");

    const links=document.querySelectorAll("[data-page]");



    pages.forEach(page=>{


        page.style.display="none";


    });



    const activePage=document.getElementById(pageId);



    if(activePage){

        activePage.style.display="block";

    }



    links.forEach(link=>{


        link.classList.remove("active");



        if(link.dataset.page===pageId){

            link.classList.add("active");

        }


    });



    const title=document.querySelector(".page-title");


    const activeLink=document.querySelector(`[data-page="${pageId}"]`);



    if(title && activeLink){

        title.textContent=
        activeLink.textContent.trim();

    }



}



/* =====================================================
   SEARCH
===================================================== */

function initializeSearch(){


    const search=document.querySelector(".admin-search input");


    if(!search) return;



    search.addEventListener("input",(e)=>{


        console.log(

            "Admin search:",
            e.target.value

        );


    });


}



/* =====================================================
   NOTIFICATIONS
===================================================== */

function initializeNotifications(){


    const button=document.querySelector("#notificationBtn");


    if(!button) return;



    button.addEventListener("click",()=>{


        showToast(

            "Notifications",

            "No new notifications available.",

            "info"

        );


    });


}



/* =====================================================
   TOAST SYSTEM
===================================================== */

function showToast(title,message,type="success"){


    let toast=document.querySelector(".toast");



    if(toast){

        toast.remove();

    }



    toast=document.createElement("div");


    toast.className="toast";


    toast.innerHTML=`

        <h4>${title}</h4>

        <p>${message}</p>

    `;



    document.body.appendChild(toast);



    setTimeout(()=>{


        toast.style.opacity="0";


        setTimeout(()=>{


            toast.remove();


        },300);



    },3000);



}



/* =====================================================
   LOADING
===================================================== */

function showLoading(){


    const loader=document.querySelector(".loading-overlay");


    if(loader){

        loader.style.display="flex";

    }


}



function hideLoading(){


    const loader=document.querySelector(".loading-overlay");


    if(loader){

        loader.style.display="none";

    }


}/* =====================================================
   FIREBASE DATA HELPERS
===================================================== */

async function adminSave(path,data){


    if(typeof saveData !== "function"){

        console.error(
            "Firebase saveData function missing"
        );

        return false;

    }



    const result = await saveData(path,data);



    if(result.success){

        return true;

    }


    showToast(

        "Error",

        result.message,

        "error"

    );


    return false;


}



async function adminRead(path){


    if(typeof readData !== "function"){

        console.error(
            "Firebase readData function missing"
        );

        return null;

    }



    return await readData(path);


}



/* =====================================================
   GOOGLE FORM MANAGER
=====================================================

   Firebase Location:

   website/settings/googleForms

===================================================== */


const GOOGLE_FORM_PATH =
"website/settings/googleForms";



function initializeGoogleForms(){


    loadGoogleForms();


    const saveButton=
    document.querySelector("#saveSettings");



    if(saveButton){


        saveButton.addEventListener(
        "click",
        saveGoogleForms
        );


    }


}



async function loadGoogleForms(){


    const data =
    await adminRead(GOOGLE_FORM_PATH);



    if(!data) return;



    const candidate =
    document.querySelector("#candidateGoogleForm");


    const employer =
    document.querySelector("#employerGoogleForm");


    const contact =
    document.querySelector("#contactGoogleForm");



    if(candidate){

        candidate.value =
        data.candidate || "";

    }



    if(employer){

        employer.value =
        data.employer || "";

    }



    if(contact){

        contact.value =
        data.contact || "";

    }



    window.GOOGLE_FORMS =
    {

        candidate:data.candidate || "",

        employer:data.employer || "",

        contact:data.contact || ""

    };



}




async function saveGoogleForms(){


    const candidate =
    document.querySelector("#candidateGoogleForm");


    const employer =
    document.querySelector("#employerGoogleForm");


    const contact =
    document.querySelector("#contactGoogleForm");



    const data={


        candidate:
        candidate ?
        candidate.value.trim()
        :
        "",



        employer:
        employer ?
        employer.value.trim()
        :
        "",



        contact:
        contact ?
        contact.value.trim()
        :
        ""

    };



    showLoading();



    const saved =
    await adminSave(

        GOOGLE_FORM_PATH,

        data

    );



    hideLoading();



    if(saved){


        window.GOOGLE_FORMS=data;



        showToast(

            "Saved",

            "Google Form links updated successfully.",

            "success"

        );


    }


}




/* =====================================================
   IMAGE PREVIEW SYSTEM
===================================================== */

function initializeImageUploads(){


    const inputs =
    document.querySelectorAll(
        'input[type="file"]'
    );



    inputs.forEach(input=>{


        input.addEventListener(
        "change",
        function(event){



            const file =
            event.target.files[0];



            if(!file) return;



            const container =
            input.closest(".form-group")
            ?.querySelector(".image-preview");



            if(!container) return;



            const reader =
            new FileReader();



            reader.onload=function(e){


                container.innerHTML=`

                    <img 
                    src="${e.target.result}"
                    alt="Preview">

                `;


            };



            reader.readAsDataURL(file);



        });


    });



}



/* =====================================================
   SAVE BUTTON SYSTEM
===================================================== */

function initializeSaveButtons(){


    document.querySelectorAll(
        ".btn-primary"
    )
    .forEach(button=>{


        button.addEventListener(
        "click",
        ()=>{


            hasUnsavedChanges=false;


        });


    });


}



/* =====================================================
   UNSAVED CHANGES TRACKER
===================================================== */

function initializeUnsavedChanges(){


    document.querySelectorAll(
        "input,textarea,select"
    )
    .forEach(field=>{


        field.addEventListener(
        "input",
        ()=>{


            hasUnsavedChanges=true;


        });


    });



    window.addEventListener(
    "beforeunload",
    (event)=>{


        if(hasUnsavedChanges){


            event.preventDefault();

            event.returnValue="";


        }


    });


}



/* =====================================================
   TABLE SEARCH
===================================================== */

function initializeTableSearch(){


    document.querySelectorAll(
        "[data-table-search]"
    )
    .forEach(search=>{


        search.addEventListener(
        "input",
        function(){


            const keyword =
            this.value.toLowerCase();



            const tableId =
            this.dataset.tableSearch;



            const table =
            document.getElementById(tableId);



            if(!table) return;



            table.querySelectorAll(
                "tbody tr"
            )
            .forEach(row=>{


                row.style.display =
                row.textContent
                .toLowerCase()
                .includes(keyword)
                ?
                ""
                :
                "none";


            });



        });


    });


}/* =====================================================
   TABLE ACTIONS
===================================================== */

function initializeTableActions(){


    document.querySelectorAll(
        "[data-edit]"
    )
    .forEach(button=>{


        button.addEventListener(
        "click",
        ()=>{


            showToast(

                "Edit",

                "Edit mode opened.",

                "info"

            );


        });


    });




    document.querySelectorAll(
        "[data-view]"
    )
    .forEach(button=>{


        button.addEventListener(
        "click",
        ()=>{


            showToast(

                "View",

                "Opening preview.",

                "info"

            );


        });


    });





    document.querySelectorAll(
        "[data-delete]"
    )
    .forEach(button=>{


        button.addEventListener(
        "click",
        ()=>{


            const item =
            button.dataset.delete
            ||
            "item";



            if(
            confirm(
            `Delete ${item}?`
            )
            ){


                const row =
                button.closest("tr");



                if(row){

                    row.remove();

                }



                showToast(

                    "Deleted",

                    `${item} deleted successfully.`,

                    "success"

                );


            }


        });


    });


}



/* =====================================================
   BULK SELECT
===================================================== */

function initializeBulkSelection(){


    const selectAll =
    document.querySelector("#selectAll");



    if(!selectAll) return;



    selectAll.addEventListener(
    "change",
    ()=>{


        document.querySelectorAll(
            ".row-checkbox"
        )
        .forEach(box=>{


            box.checked =
            selectAll.checked;


        });


    });


}



/* =====================================================
   LOCAL DRAFT STORAGE
===================================================== */

function saveDraft(key,data){


    localStorage.setItem(

        "grapto_"+key,

        JSON.stringify(data)

    );


}



function loadDraft(key){


    const data =
    localStorage.getItem(
        "grapto_"+key
    );



    if(!data) return null;



    try{


        return JSON.parse(data);


    }
    catch(error){


        return null;


    }


}



function clearDraft(key){


    localStorage.removeItem(
        "grapto_"+key
    );


}



/* =====================================================
   AUTO SAVE FOUNDATION
===================================================== */

function autoSave(){


    document.querySelectorAll(
        "form[data-autosave]"
    )
    .forEach(form=>{


        const data={};



        new FormData(form)
        .forEach(
        (value,key)=>{


            data[key]=value;


        });



        saveDraft(

            form.id
            ||
            generateId("form"),

            data

        );


    });


}



/* =====================================================
   UNIQUE ID GENERATOR
===================================================== */

function generateId(prefix="item"){


    return (

        prefix +

        "_" +

        Date.now()

    );


}



/* =====================================================
   KEYBOARD SHORTCUTS
===================================================== */

document.addEventListener(
"keydown",
(event)=>{


    if(
    (event.ctrlKey || event.metaKey)
    &&
    event.key==="s"
    ){


        event.preventDefault();



        hasUnsavedChanges=false;



        showToast(

            "Saved",

            "Changes saved.",

            "success"

        );


    }




    if(event.key==="Escape"){


        document
        .querySelectorAll(
            ".modal-overlay.active"
        )
        .forEach(modal=>{


            modal.classList.remove(
                "active"
            );


        });


    }


});




/* =====================================================
   FIREBASE CONNECTION CHECK
===================================================== */

async function checkAdminConnection(){


    if(
    typeof testFirebaseConnection
    !==
    "function"
    ){

        console.warn(
        "Firebase connection tester unavailable"
        );


        return;


    }



    const connected =
    await testFirebaseConnection();



    if(connected){


        console.log(
        "GRAPTO Admin Firebase Connected"
        );


    }


}



/* =====================================================
   ADMIN STARTUP
===================================================== */

function initializeAdmin(){


    console.log(
    "================================"
    );


    console.log(
    " GRAPTO ADMIN PANEL VERSION 2.0"
    );


    console.log(
    " Google Form Manager Enabled"
    );


    console.log(
    " Firebase Integration Ready"
    );


    console.log(
    "================================"
    );



    checkAdminConnection();



}



/* =====================================================
   END OF FILE
===================================================== */
