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
/* =====================================================
   STAGGER SERVICE CARD ANIMATION
===================================================== */

document.addEventListener("DOMContentLoaded",()=>{

const cards=document.querySelectorAll(".service-card");

cards.forEach((card,index)=>{

card.style.transitionDelay=`${index*0.08}s`;

});

});

/* =====================================================
   HERO IMAGE PARALLAX
===================================================== */

window.addEventListener("scroll",()=>{

const heroImage=document.querySelector(".hero-image img");

if(!heroImage) return;

const offset=window.pageYOffset;

heroImage.style.transform=`translateY(${offset*0.08}px)`;

});

/* =====================================================
   BUTTON HOVER RIPPLE
===================================================== */

document.querySelectorAll(".btn").forEach(button=>{

button.addEventListener("mouseenter",()=>{

button.style.transform="translateY(-3px) scale(1.02)";

});

button.addEventListener("mouseleave",()=>{

button.style.transform="translateY(0) scale(1)";

});

});
