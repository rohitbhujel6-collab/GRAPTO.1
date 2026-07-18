/* =====================================================
   GRAPTO ANIMATIONS
===================================================== */

document.addEventListener("DOMContentLoaded",()=>{

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("animate-show");

}

});

},{

threshold:.15

});

document.querySelectorAll(

".section-header,.service-card,.placeholder-box,.hero-image"

).forEach(el=>{

el.classList.add("animate-hidden");

observer.observe(el);

});

});
