import React, { useLayoutEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { GITHUB_REPO, LINKEDIN_PROFILE, WHATSAPP_LINK } from '../constants';

const Hero: React.FC = () => {
    const { t } = useTranslation();
    const heroRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.hero-text > *', {
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            });

            gsap.from(imageRef.current, {
                opacity: 0,
                scale: 0.8,
                duration: 1.2,
                ease: 'back.out(1.7)'
            });
        }, heroRef);

        return () => ctx.revert();
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
                    <a href={`mailto:ramiroalejandolacci19@gmail.com`} className="btn">{t('hire_btn')}</a>
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
