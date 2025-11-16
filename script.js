let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// Guardamos último idioma cargado
window.currentLangData = null;

// Botón para mostrar más proyectos - Variables globales
let currentLanguage = 'en'; // Idioma por defecto: inglés
let mostrandoProyectosExtras = false;

const BTN_TEXTS = {
    en: { more: 'See More', less: 'See Less' },
    es: { more: 'Ver Más', less: 'Ver Menos' }
};

function updateButtonText() {
    const verMasBtn = document.getElementById('ver-mas-btn');
    if (verMasBtn) {
        const texts = BTN_TEXTS[currentLanguage];
        verMasBtn.textContent = mostrandoProyectosExtras ? texts.less : texts.more;
    }
}

function changeLanguage(language) {
  fetch(`translations_${language}.json`)
    .then(response => response.json())
    .then(data => {
      window.currentLangData = data;
      const byId = (id) => document.getElementById(id);
      const setText = (id, value) => { const el = byId(id); if (el) el.innerText = value };
      const setValue = (id, value) => { const el = byId(id); if (el) el.value = value };
      const setPlaceholder = (id, value) => { const el = byId(id); if (el) el.placeholder = value };

      setText('greeting', data.greeting);
      setText('subheading', data.subheading);
      setText('about-me', data.about_me);
      setText('hire-btn', data.hire_btn);
      setText('download-cv-btn', data.download_cv_btn);
      setText('home-heading', data.home_heading);
      setText('education-heading', data.education_heading);
      setText('services-heading', data.services_heading);
      setText('projects-heading', data.projects_heading);
      setText('contact-heading', data.contact_heading);
      setText('about-me-link', data.about_me_link);
      setText('educations-heading', data.education_heading);
      setText('service-heading', data.service_heading);
      setText('ui-design-subheading', data.ui_design_subheading);
      const uiDesc = document.getElementById('ui-design-description');
      if (uiDesc && data.ui_design_description) uiDesc.innerText = data.ui_design_description;
      setText('front-develop-subheading', data.front_develop_subheading);
      const frontDesc = document.getElementById('front-develop-description');
      if (frontDesc && data.front_develop_description) frontDesc.innerText = data.front_develop_description;
      setText('back-develop-subheading', data.back_develop_subheading);
      const backDesc = document.getElementById('back-develop-description');
      if (backDesc && data.back_develop_description) backDesc.innerText = data.back_develop_description;
      setText('testing-subheading', data.testing_subheading);
      setText('proyect-heading', data.proyect_heading);
      const p1 = byId('project1-desc'); if (p1 && data.project1_desc) p1.innerText = data.project1_desc;
      const p2 = byId('project2-desc'); if (p2 && data.project2_desc) p2.innerText = data.project2_desc;
      const p3 = byId('project3-desc'); if (p3 && data.project3_desc) p3.innerText = data.project3_desc;
      const p4 = byId('project4-desc'); if (p4 && data.project4_desc) p4.innerText = data.project4_desc;
      const p5 = byId('project5-desc'); if (p5 && data.project5_desc) p5.innerText = data.project5_desc;
      const p6 = byId('project6-desc'); if (p6 && data.project6_desc) p6.innerText = data.project6_desc;
      setText('contact-me-heading', data.contact_me_heading);
      setText('minuscula', data.minuscula);
      setText('services-link-footer', data.services_link_footer);
      setText('projects-link-footer', data.projects_link_footer);
      setText('footer-heading', data.footer_heading);
      setText('footer2-heading', data.footer2_heading);
      const footerName = byId('footer2-minuscula'); if (footerName) footerName.innerText = data.footer_minuscula;
      setPlaceholder('full-name-input', data.full_name_input);
      setPlaceholder('email-input', data.email_input);
      setPlaceholder('phone-number-input', data.phone_number_input);
      setPlaceholder('subject-input', data.subject_input);
      setPlaceholder('your-message-input', data.your_message_input);
      setValue('send-message-btn', data.send_message_btn);
      const testDesc = byId('testing-description');
      if (testDesc && data.testing_description) testDesc.innerText = data.testing_description;
      // Projects 5 y 6 ya están arriba
      // Actualizar idioma actual y texto del botón
      currentLanguage = language;
      updateButtonText();
    })
    .catch(error => console.error('Error:', error));
}

// Traducción de banderas
let flags = document.querySelectorAll('.flags__item');
flags.forEach(flag => {
  flag.addEventListener('click', () => {
    let lang = flag.dataset.lang;
    changeLanguage(lang);
  });
});

window.onscroll = () =>{
    sections.forEach(sec =>{
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if(top >= offset && top < offset + height){
            navLinks.forEach(links =>{ links.classList.remove('active'); })
            const link = document.querySelector('header nav a[href="#' + id + '"]');
            if (link) link.classList.add('active');
        }
    })
}

menuIcon.onclick = () =>{
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// Scroll Reveal con IntersectionObserver
(function initScrollReveal(){
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
        return;
    }
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || items.length === 0) {
        items.forEach(el => el.classList.add('is-visible'));
        return;
    }
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, { rootMargin: '0px 0px 30% 0px', threshold: 0 });
    items.forEach(el => obs.observe(el));
})();

// Arrastre horizontal para carrusel de Skills
(function initSkillsDrag(){
    const carousel = document.getElementById('skills-carousel');
    if (!carousel) return;
    const track = carousel.querySelector('.skills-track');
    if (!track) return;
    let isDown = false; let startX = 0; let scrollLeft = 0;
    const onDown = (e) => { isDown = true; startX = (e.pageX || e.touches?.[0]?.pageX) - track.offsetLeft; scrollLeft = track.scrollLeft; track.classList.add('dragging'); }
    const onLeaveUp = () => { isDown = false; track.classList.remove('dragging'); }
    const onMove = (e) => { if (!isDown) return; e.preventDefault(); const x = (e.pageX || e.touches?.[0]?.pageX) - track.offsetLeft; const walk = (x - startX); track.scrollLeft = scrollLeft - walk; }
    track.addEventListener('mousedown', onDown); track.addEventListener('mouseleave', onLeaveUp); track.addEventListener('mouseup', onLeaveUp); track.addEventListener('mousemove', onMove);
    track.addEventListener('touchstart', onDown, { passive: true }); track.addEventListener('touchend', onLeaveUp); track.addEventListener('touchmove', onMove, { passive: false });
})();

// Botón para mostrar más proyectos - Inicialización
document.addEventListener('DOMContentLoaded', () => {
    const verMasBtn = document.getElementById('ver-mas-btn');
    if (verMasBtn) {
        // Inicializar con texto en inglés
        verMasBtn.textContent = BTN_TEXTS['en'].more;
        
        verMasBtn.addEventListener('click', () => {
            const extras = document.querySelectorAll('.extra-project');
            mostrandoProyectosExtras = !mostrandoProyectosExtras;
            if (mostrandoProyectosExtras) {
                extras.forEach(el => {
                    el.classList.remove('hidden');
                    el.classList.remove('hiding');
                    // Forzar repaint para que la animación funcione
                    el.offsetHeight;
                    // Agregar is-visible después de un pequeño delay para que el reveal funcione
                    setTimeout(() => {
                        el.classList.add('is-visible');
                    }, 50);
                });
            } else {
                extras.forEach(el => {
                    el.classList.add('hiding');
                    el.classList.remove('is-visible');
                    el.addEventListener('transitionend', function handler(e) {
                        if (e.propertyName === 'opacity') {
                            el.classList.add('hidden');
                            el.classList.remove('hiding');
                            el.removeEventListener('transitionend', handler);
                        }
                    });
                });
            }
            updateButtonText();
        });
    }
});
