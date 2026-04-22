import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const form = formRef.current;
        if (!section || !form) return;

        const ctx = gsap.context(() => {
            const heading = section.querySelector('.heading');
            const inputs = form.querySelectorAll('input, textarea');
            const submitBtn = form.querySelector('input[type="submit"]');

            // Heading animation
            if (heading) {
                gsap.fromTo(heading,
                    { opacity: 0, y: -30 },
                    {
                        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                        scrollTrigger: { trigger: heading, start: 'top 85%' }
                    }
                );
            }

            // Form slides up
            gsap.fromTo(form,
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
                    scrollTrigger: { trigger: form, start: 'top 88%' }
                }
            );

            // Individual inputs stagger
            gsap.fromTo(inputs,
                { opacity: 0, x: -20 },
                {
                    opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: form, start: 'top 85%' }
                }
            );

            // Submit button pop
            if (submitBtn) {
                gsap.fromTo(submitBtn,
                    { opacity: 0, scale: 0.85 },
                    {
                        opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)',
                        scrollTrigger: { trigger: submitBtn, start: 'top 90%' }
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [t]);

    return (
        <section className="contact" id="contact" ref={sectionRef}>
            <h2 className="heading">
                <span style={{ color: 'white' }}>{t('contact_me_heading')}</span>
                <span id="minuscula">{t('minuscula')}</span>
            </h2>

            <form action="" ref={formRef}>
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
                    <input type="submit" value={t('send_message_btn')} className="btn" />
                </div>
            </form>
        </section>
    );
};

export default Contact;
