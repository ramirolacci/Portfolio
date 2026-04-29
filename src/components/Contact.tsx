import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [submitted, setSubmitted] = useState(false);

    // Scroll reveal
    useEffect(() => {
        const section = sectionRef.current;
        const form = formRef.current;
        if (!section || !form) return;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const ctx = gsap.context(() => {
            const heading = section.querySelector('.heading');
            const inputs = form.querySelectorAll('input, textarea');
            const submitBtn = form.querySelector('input[type="submit"], .contact-submit-btn');

            if (!prefersReduced) {
                if (heading) {
                    gsap.fromTo(heading,
                        { opacity: 0, y: -30 },
                        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: heading, start: 'top 85%' } }
                    );
                }
                gsap.fromTo(form,
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: form, start: 'top 88%' } }
                );
                gsap.fromTo(inputs,
                    { opacity: 0, x: -20 },
                    { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: form, start: 'top 85%' } }
                );
                if (submitBtn) {
                    gsap.fromTo(submitBtn,
                        { opacity: 0, scale: 0.85 },
                        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)', scrollTrigger: { trigger: submitBtn, start: 'top 90%' } }
                    );
                }
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [t]);

    // Input focus glow via GSAP
    useEffect(() => {
        const form = formRef.current;
        if (!form) return;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const inputs = form.querySelectorAll<HTMLElement>('input:not([type="submit"]), textarea');
        const cleanups: (() => void)[] = [];

        inputs.forEach((input) => {
            const onFocus = () => {
                gsap.to(input, { boxShadow: '0 0 0 3px rgba(0,255,238,0.5), 0 0 20px rgba(0,255,238,0.2)', x: 6, duration: 0.25, ease: 'power2.out' });
            };
            const onBlur = () => {
                gsap.to(input, { boxShadow: 'none', x: 0, duration: 0.35, ease: 'power2.inOut' });
            };
            input.addEventListener('focus', onFocus);
            input.addEventListener('blur', onBlur);
            cleanups.push(() => {
                input.removeEventListener('focus', onFocus);
                input.removeEventListener('blur', onBlur);
            });
        });

        return () => cleanups.forEach(fn => fn());
    }, []);

    // Submit success animation
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = formRef.current;
        if (!form) return;

        const successEl = document.querySelector('.contact-success');
        if (!successEl) return;

        gsap.timeline()
            .to(form, { opacity: 0, y: -20, duration: 0.35, ease: 'power2.in' })
            .set(form, { display: 'none' })
            .fromTo(successEl,
                { display: 'flex', opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
            );

        setSubmitted(true);

        // Reset after 3s
        setTimeout(() => {
            gsap.timeline()
                .to(successEl, { opacity: 0, scale: 0.9, duration: 0.3 })
                .set(successEl, { display: 'none' })
                .set(form, { display: 'flex', opacity: 0 })
                .to(form, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
            form.reset();
            setSubmitted(false);
        }, 3000);
    };

    return (
        <section className="contact" id="contact" ref={sectionRef}>
            <h2 className="heading">
                <span style={{ color: 'white' }}>{t('contact_me_heading')}</span>
                <span id="minuscula">{t('minuscula')}</span>
            </h2>

            <form action="" ref={formRef} onSubmit={handleSubmit}>
                <div className="input-group">
                    <div className="input-box">
                        <input type="text" name="full_name" id="full_name" autoComplete="name" placeholder={t('full_name_input')} required />
                        <input type="email" name="email" id="email" autoComplete="email" placeholder={t('email_input')} required />
                    </div>
                    <div className="input-box">
                        <input type="tel" name="phone_number" id="phone_number" autoComplete="tel" placeholder={t('phone_number_input')} />
                        <input type="text" name="subject" id="subject" autoComplete="off" placeholder={t('subject_input')} />
                    </div>
                </div>
                <div className="input-group-2">
                    <textarea name="message" id="message" cols={30} rows={10} placeholder={t('your_message_input')} required></textarea>
                    <input type="submit" value={submitted ? '✓' : t('send_message_btn')} className="btn contact-submit-btn" />
                </div>
            </form>

            {/* Success state */}
            <div className="contact-success" style={{ display: 'none' }}>
                <div className="success-icon">✓</div>
                <h3>{t('send_message_btn')} ✓</h3>
                <p>¡Mensaje enviado! Te contactaré pronto 🚀</p>
            </div>
        </section>
    );
};

export default Contact;
