import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { GITHUB_REPO, LINKEDIN_PROFILE, WHATSAPP_LINK } from '../constants';

const Hero: React.FC = () => {
    const { t } = useTranslation();
    const heroRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const ctaRef = useRef<HTMLAnchorElement>(null);

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

    // ── Magnetic pull on CTA button ──
    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;
        const btn = ctaRef.current;
        if (!btn) return;

        const handleMove = (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            gsap.to(btn, { x: (e.clientX - cx) * 0.3, y: (e.clientY - cy) * 0.3, duration: 0.3, ease: 'power2.out' });
        };
        const handleLeave = () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        };

        btn.addEventListener('mousemove', handleMove);
        btn.addEventListener('mouseleave', handleLeave);
        return () => {
            btn.removeEventListener('mousemove', handleMove);
            btn.removeEventListener('mouseleave', handleLeave);
        };
    }, []);

    return (
        <section className="home" id="home" ref={heroRef}>
            <div className="home-content hero-text">
                <h1>
                    <span style={{ color: 'white' }}>{t('greeting')}</span>
                    <span> Ramiro</span>
                </h1>
                <h3>
                    <span style={{ color: 'white' }}>{t('subheading')}</span>
                    <span className="text-animation"> </span>
                </h3>
                <p id="about-me">{t('about_me')}</p>

                <div className="social-icons">
                    <a href={LINKEDIN_PROFILE} target="_blank" rel="noreferrer"><i className='bx bxl-linkedin'></i></a>
                    <a href={GITHUB_REPO} target="_blank" rel="noreferrer"><i className='bx bxl-github'></i></a>
                    <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer"><i className='bx bxl-whatsapp'></i></a>
                </div>

                <div className="btn-group">
                    <a
                        href={`mailto:ramiroalejandolacci19@gmail.com`}
                        className="btn btn-magnetic"
                        ref={ctaRef}
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
                    alt="Ramiro Lacci"
                    loading="lazy"
                />
            </div>
        </section>
    );
};

export default Hero;
