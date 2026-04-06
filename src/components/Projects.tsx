import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
    const { t } = useTranslation();
    const [showAll, setShowAll] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 895);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 895);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isMobile && wrapperRef.current) {
            const el = wrapperRef.current;
            // Delay a bit to ensure full scrollWidth is available
            const timeout = setTimeout(() => {
                el.scrollLeft = el.scrollWidth / 3;
            }, 50);
            return () => clearTimeout(timeout);
        }
    }, [isMobile]);

    useEffect(() => {
        const items = wrapperRef.current?.querySelectorAll('.proyect-item');
        if (!items || items.length === 0) return;

        const ctx = gsap.context(() => {
            gsap.set(items, { opacity: 1, y: 0 });
            gsap.from(items, {
                opacity: 0,
                y: 40,
                duration: 0.7,
                stagger: 0.12,
                ease: 'power2.out',
                clearProps: 'all',
            });
        });

        return () => ctx.revert();
    }, [showAll, isMobile]);

    const visibleProjects = (showAll || isMobile) ? PROJECTS : PROJECTS.filter(p => !p.extra);

    return (
        <section className="proyects" id="projects" ref={sectionRef}>
            <div className="proyects-box">
                <h2 className="heading">{t('projects_heading')}</h2>

                <div 
                    className="wrapper" 
                    ref={wrapperRef} 
                    onScroll={(e) => {
                        if (!isMobile) return;
                        const el = e.currentTarget;
                        const itemWidth = el.scrollWidth / 3;
                        if (el.scrollLeft >= itemWidth * 2) el.scrollLeft -= itemWidth;
                        if (el.scrollLeft <= 0) el.scrollLeft += itemWidth;
                    }}
                >
                    {(isMobile ? [...PROJECTS, ...PROJECTS, ...PROJECTS] : visibleProjects).map((project, index) => (
                        <div key={`${project.id}-${index}`} className="proyect-item">
                            <img src={project.image} alt={project.title} loading="lazy" />
                            <h2>{project.title}</h2>
                            <div className="rating">
                                {[...Array(5)].map((_, i) => (
                                    <i key={i} className='bx bxs-star star'></i>
                                ))}
                            </div>
                            <p>{t(project.translationKey)}</p>
                            <div className="btn-group">
                                <a href={project.demo} target="_blank" rel="noreferrer" className="btn">Demo</a>
                                <a href={project.repo} target="_blank" rel="noreferrer" className="btn">Repo</a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="ver-mas-container" style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <button
                        className="btn ver-mas-btn"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? t('ver-menos', 'See Less') : t('ver-mas', 'See More')}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Projects;
