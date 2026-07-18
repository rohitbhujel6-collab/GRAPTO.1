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
/* =====================================================
   HEADER SHADOW ON SCROLL
===================================================== */

const header=document.querySelector(".header");

window.addEventListener("scroll",()=>{

if(window.scrollY>40){

header.classList.add("header-scrolled");

}else{

header.classList.remove("header-scrolled");

}

});

/* =====================================================
   SMOOTH PAGE LOADING
===================================================== */

window.addEventListener("load",()=>{

document.body.classList.add("page-loaded");

});

/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections=document.querySelectorAll("section[id]");
const navLinks=document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const sectionTop=section.offsetTop-120;

const sectionHeight=section.clientHeight;

if(window.scrollY>=sectionTop){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

/* =====================================================
   END OF FILE
===================================================== */
