// Show the homepage back-to-top link once the visitor scrolls down.
 const homeToTop = document.querySelector('.home-to-top');

 if (homeToTop) {
   const updateBackToTop = () => {
     const visible = window.scrollY > 350;
     homeToTop.classList.toggle('visible', visible);
     homeToTop.setAttribute('aria-hidden', String(!visible));
     homeToTop.tabIndex = visible ? 0 : -1;
   };
 
   window.addEventListener('scroll', updateBackToTop, { passive: true });
   updateBackToTop();
 }
 