let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let flags = document.querySelectorAll('.flags__item');

function changeLanguage(language) {
    fetch(`translations_${language}.json`)
    .then(response => response.json())
    .then(data => {
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
        setText('high-school-subheading', data.high_school_subheading);
        setText('university-subheading', data.university_subheading);
        setText('internship-subheading', data.internship_subheading);
        setText('first-job-subheading', data.first_job_subheading);
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
        setText('virtual-wallet-subheading', data.virtual_wallet_subheading);
        setText('online-store-subheading', data.online_store_subheading);
        setText('block-game-subheading', data.block_game_subheading);
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

        const educationTimeline = byId('education-timeline');
        const servicesContainer = byId('services-container');
        const projectsWrapper = byId('projects-wrapper');
        if (educationTimeline && Array.isArray(data.education_timeline)) {
            educationTimeline.innerHTML = "";
            data.education_timeline.forEach(item => {
                educationTimeline.innerHTML += `<div class="timeline-item">
                                                    <div class="timeline-dot"></div>
                                                        <div class="timeline-date">${item.date}</div>
                                                        <div class="timeline-content">
                                                            <h3>${item.title}</h3>
                                                            <p>${item.description}</p>
                                                        </div>
                                                </div>`;
            });
        }
        if (servicesContainer && Array.isArray(data.services)) {
            servicesContainer.innerHTML = "";
            data.services.forEach(service => {
                servicesContainer.innerHTML += `<div class="service-box">
                                                    <div class="service-info">
                                                        <h4>${service.title}</h4>
                                                        <p>${service.description}</p>
                                                    </div>
                                                </div>`;
            });
        }
        if (projectsWrapper && Array.isArray(data.projects)) {
            projectsWrapper.innerHTML = "";
            data.projects.forEach(project => {
                projectsWrapper.innerHTML += `<div class="project-item">
                                                    <img src="${project.image}" alt="">
                                                    <h2>${project.name}</h2>
                                                    <div class="rating">${project.rating}</div>
                                                    <p>${project.description}</p>
                                                    <div class="btn-group">
                                                        <a href="${project.demo_link}" target="_blank" class="btn" rel="noopener noreferrer">Demo</a>
                                                        <a href="${project.repo_link}" target="_blank" class="btn" rel="noopener noreferrer">Repo</a>
                                                    </div>
                                                </div>`;
            });
        }
    })
    .catch(error => console.error('Error:', error));
}

// Manejador de eventos para cambiar de idioma cuando se hace clic en una bandera
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
    const obs = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });
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