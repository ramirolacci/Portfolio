import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import Typed from 'typed.js';
import { GITHUB_REPO, LINKEDIN_PROFILE, WHATSAPP_LINK, EMAIL } from '../constants';

const Hero: React.FC = () => {
    const { t, i18n } = useTranslation();
    const heroRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const typedInstanceRef = useRef<Typed | null>(null);

    // ── Entrance animations ──
    useLayoutEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const ctx = gsap.context(() => {
            if (!prefersReduced) {
                gsap.from('.hero-text > *', {
                    opacity: 0,
                    y: 40,
                    duration: 0.9,
                    stagger: 0.18,
                    ease: 'power3.out',
                    delay: 0.3,
                });
                gsap.from(imageRef.current, {
                    opacity: 0,
                    scale: 0.75,
                    duration: 1.3,
                    ease: 'back.out(1.7)',
                    delay: 0.1,
                });
            }
        }, heroRef);
        return () => ctx.revert();
    }, []);

    // ── Typing animation ──
    useEffect(() => {
        const el = textRef.current;
        if (!el) return;

        // Destroy previous typed instance if exists
        if (typedInstanceRef.current) {
            typedInstanceRef.current.destroy();
            typedInstanceRef.current = null;
        }

        // Clear inner text and remove any duplicate cursor elements in parent
        el.innerHTML = '';
        const parent = el.parentElement;
        if (parent) {
            const cursors = parent.querySelectorAll('.typed-cursor');
            cursors.forEach(c => c.remove());
        }

        const isEs = i18n.language.startsWith('es');
        const strings = isEs
            ? ['Frontend Developer', 'Full Stack Developer', 'Diseñador UI / UX', 'Desarrollador Web']
            : ['Frontend Developer', 'Full Stack Developer', 'UI / UX Designer', 'Web Developer'];

        const typed = new Typed(el, {
            strings,
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 1500,
            startDelay: 300,
            loop: true,
            showCursor: true,
            cursorChar: '|',
        });

        typedInstanceRef.current = typed;

        return () => {
            typed.destroy();
            typedInstanceRef.current = null;
            if (el) el.innerHTML = '';
            if (parent) {
                const cursors = parent.querySelectorAll('.typed-cursor');
                cursors.forEach(c => c.remove());
            }
        };
    }, [i18n.language]);

    return (
        <section className="home" id="home" ref={heroRef}>
            <div className="home-content hero-text">
                <h1>
                    <span style={{ color: 'white' }}>{t('greeting')}</span>
                    <span> Ramiro</span>
                </h1>
                <h3 className="hero-subtitle">
                    <span style={{ color: 'white' }}>{t('subheading')} </span>
                    <span ref={textRef} className="text-animation"></span>
                </h3>
                <p id="about-me">{t('about_me')}</p>

                <div className="social-icons">
                    <a href={LINKEDIN_PROFILE} target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className='bx bxl-linkedin'></i></a>
                    <a href={GITHUB_REPO} target="_blank" rel="noreferrer" aria-label="GitHub"><i className='bx bxl-github'></i></a>
                    <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" aria-label="WhatsApp"><i className='bx bxl-whatsapp'></i></a>
                </div>

                <div className="btn-group">
                    <a
                        href={`mailto:${EMAIL}`}
                        className="btn"
                    >
                        {t('hire_btn')}
                    </a>
                    <a
                        href="/cv_pdf/cv ramiro lacci.pdf"
                        download="Cv Ramiro Lacci"
                        className="btn"
                    >
                        {t('download_cv_btn')}
                    </a>
                </div>
            </div>

            <div className="home-img">
                <img
                    ref={imageRef}
                    src="/profile_photo/imagenlacci.png"
                    alt="Ramiro Lacci - Full Stack & Frontend Developer"
                    loading="lazy"
                />
            </div>
        </section>
    );
};

export default Hero;
