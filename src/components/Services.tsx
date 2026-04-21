import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CodeEditorSimulator from './CodeEditorSimulator';

gsap.registerPlugin(ScrollTrigger);

const Services: React.FC = () => {
    const { t, i18n } = useTranslation();
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);




    useEffect(() => {
        const section = sectionRef.current;
        const heading = headingRef.current;
        const container = containerRef.current;
        if (!section || !heading || !container) return;

        const items = container.querySelectorAll('.service-box, .code-editor-wrapper');

        // Heading fade in
        gsap.fromTo(heading,
            { opacity: 0, y: -40 },
            {
                opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: heading, start: 'top 85%' }
            }
        );

        // Content fade up
        items.forEach((item, i) => {
            const fromX = i % 2 === 0 ? -60 : 60;
            gsap.fromTo(item,
                { opacity: 0, x: fromX, scale: 0.95 },
                {
                    opacity: 1, x: 0, scale: 1,
                    duration: 0.7, ease: 'power2.out',
                    delay: (i % 2) * 0.15,
                    scrollTrigger: { trigger: item, start: 'top 88%' }
                }
            );
        });

        return () => { ScrollTrigger.getAll().forEach((st: ScrollTrigger) => st.kill()); };
    }, [i18n.language]);

    return (
        <section className="services" id="services" ref={sectionRef}>
            <h2 className="heading" ref={headingRef}>{t('service_heading')}</h2>

            <div ref={containerRef}>
                <CodeEditorSimulator />
            </div>
        </section>
    );
};

export default Services;
