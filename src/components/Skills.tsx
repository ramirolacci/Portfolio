import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKILLS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const ctx = gsap.context(() => {
            const heading = section.querySelector('.heading');
            const timelineItems = section.querySelectorAll('.timeline-item');
            const dots = section.querySelectorAll('.timeline-dot');

            // Heading
            if (heading && !prefersReduced) {
                gsap.fromTo(heading,
                    { opacity: 0, y: -40, scale: 0.95 },
                    {
                        opacity: 1, y: 0, scale: 1,
                        duration: 0.9, ease: 'power3.out',
                        scrollTrigger: { trigger: heading, start: 'top 85%' }
                    }
                );
            }

            // Timeline dots pop in
            dots.forEach((dot, i) => {
                if (prefersReduced) return;
                gsap.fromTo(dot,
                    { opacity: 0, scale: 0 },
                    {
                        opacity: 1, scale: 1,
                        duration: 0.5, ease: 'back.out(2)',
                        scrollTrigger: { trigger: dot, start: 'top 88%' },
                        delay: i * 0.05
                    }
                );
            });

            // Timeline items alternating left/right
            timelineItems.forEach((item, i) => {
                const card = item.querySelector('.skills-timeline-content');
                if (!card || prefersReduced) return;
                const fromX = i % 2 === 0 ? -80 : 80;

                gsap.fromTo(card,
                    { opacity: 0, x: fromX },
                    {
                        opacity: 1, x: 0,
                        duration: 0.8, ease: 'power3.out',
                        scrollTrigger: { trigger: card, start: 'top 88%' }
                    }
                );

                // Chips stagger within card
                const chips = card.querySelectorAll('.skill-chip');
                gsap.fromTo(chips,
                    { opacity: 0, scale: 0.6, y: 12 },
                    {
                        opacity: 1, scale: 1, y: 0,
                        duration: 0.45, stagger: 0.055, ease: 'back.out(1.5)',
                        scrollTrigger: { trigger: card, start: 'top 85%' }
                    }
                );
            });
        }, sectionRef);

        // ── Hover: glow pulse + scale on skill chips ──
        const chips = section.querySelectorAll<HTMLElement>('.skill-chip');
        const cleanups: (() => void)[] = [];

        chips.forEach((chip) => {
            const onEnter = () => {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                gsap.to(chip, {
                    scale: 1.12,
                    boxShadow: '0 0 16px 4px rgba(0,255,238,0.55)',
                    duration: 0.22,
                    ease: 'power2.out',
                });
            };
            const onLeave = () => {
                gsap.to(chip, {
                    scale: 1,
                    boxShadow: '0 0 0 2px rgba(255,255,255,0.08) inset',
                    duration: 0.3,
                    ease: 'power2.inOut',
                });
            };
            chip.addEventListener('mouseenter', onEnter);
            chip.addEventListener('mouseleave', onLeave);
            cleanups.push(() => {
                chip.removeEventListener('mouseenter', onEnter);
                chip.removeEventListener('mouseleave', onLeave);
            });
        });

        return () => {
            ctx.revert();
            cleanups.forEach(fn => fn());
        };
    }, [t]);

    return (
        <section className="education" id="education" ref={sectionRef}>
            <h2 className="heading">{t('education_heading')}</h2>

            <div className="timeline-items">
                {SKILLS.map((category, idx) => (
                    <div key={idx} className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-date"></div>
                        <div className="timeline-content skills-timeline-content">
                            <div className="category-card">
                                <h3 className="category-title">
                                    <i className={`bx ${category.icon}`}></i> {t(category.translationKey || category.category)}
                                </h3>
                                <div className="category-content">
                                    {category.items.map((skill, sIdx) => (
                                        <div
                                            key={sIdx}
                                            className={`skill-chip badge--${skill.badge}`}
                                            data-tooltip={skill.name}
                                        >
                                            <i className={`bx ${skill.icon}`}></i>
                                            <span>{skill.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
