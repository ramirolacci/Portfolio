import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './index.css';
import './i18n';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LINKEDIN_PROFILE, GITHUB_REPO, WHATSAPP_LINK } from './constants';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const { t } = useTranslation();
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      const social = footer.querySelector('.social');
      const list = footer.querySelector('.list');
      const copyright = footer.querySelector('.copyright');

      const tl = gsap.timeline({
        scrollTrigger: { trigger: footer, start: 'top 90%' }
      });

      tl.fromTo(social, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
        .fromTo(list, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .fromTo(copyright, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2');
    }, footerRef);

    return () => ctx.revert();
  }, [t]);

  return (
    <div className="portfolio">
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Services />
        <Projects />
        <Contact />
      </main>

      <footer className="footer" ref={footerRef}>
        <div className="social">
          <a href={LINKEDIN_PROFILE} target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className='bx bxl-linkedin'></i></a>
          <a href={GITHUB_REPO} target="_blank" rel="noreferrer" aria-label="GitHub"><i className='bx bxl-github'></i></a>
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" aria-label="WhatsApp"><i className='bx bxl-whatsapp'></i></a>
        </div>
        <ul className="list">
          <li><a href="#home">{t('about_me_link')}</a></li>
          <li><a href="#services">{t('services_link_footer')}</a></li>
          <li><a href="#projects">{t('projects_link_footer')}</a></li>
        </ul>
        <p className="copyright">
          <span style={{ color: 'white' }}>{t('footer_heading')} </span>
          <span>Ramiro Lacci</span>
          <span style={{ color: 'white' }}>{t('footer2_heading')}</span>
        </p>
      </footer>
    </div>
  );
};

export default App;
