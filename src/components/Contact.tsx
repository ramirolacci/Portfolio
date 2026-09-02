import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import {
    WEB3FORMS_ACCESS_KEY,
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_NOTIF,
    EMAILJS_TEMPLATE_AUTO,
    EMAILJS_PUBLIC_KEY
} from '../constants';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{
        type: 'success' | 'error' | 'warning';
        message: string;
    } | null>(null);

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        textarea.style.height = 'auto';

        const phoneInput = document.getElementById('phone_number');
        const fullInput = document.getElementById('full_name');

        let minH = 258;
        if (phoneInput && fullInput) {
            const phoneRect = phoneInput.getBoundingClientRect();
            const fullRect = fullInput.getBoundingClientRect();
            if (phoneRect.height > 0) {
                minH = phoneRect.bottom - fullRect.top;
            }
        }

        const calculatedHeight = Math.max(minH, textarea.scrollHeight);
        textarea.style.height = `${calculatedHeight}px`;
    };

    useEffect(() => {
        adjustTextareaHeight();
        window.addEventListener('resize', adjustTextareaHeight);
        return () => window.removeEventListener('resize', adjustTextareaHeight);
    }, []);

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
                gsap.to(input, { boxShadow: '0 0 15px rgba(0,255,238,0.35)', duration: 0.25, ease: 'power2.out' });
            };
            const onBlur = () => {
                gsap.to(input, { boxShadow: 'none', duration: 0.35, ease: 'power2.inOut' });
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

    // Form submit logic
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = formRef.current;
        if (!form) return;

        setIsSubmitting(true);
        setStatus(null);

        const formData = new FormData(form);
        formData.append("access_key", WEB3FORMS_ACCESS_KEY);
        formData.append("from_name", "Portafolio | Ramiro Lacci");
        
        const clientName = formData.get("name") || "Cliente";
        const clientSubject = formData.get("subject") || "Consulta Web";
        const clientEmail = formData.get("email") as string;

        formData.append("subject", `📩 Nuevo contacto de ${clientName}: ${clientSubject}`);
        if (clientEmail) {
            formData.append("replyto", clientEmail);
        }

        try {
            if (EMAILJS_SERVICE_ID && EMAILJS_PUBLIC_KEY && EMAILJS_TEMPLATE_NOTIF) {
                // 1. Notificación a Ramiro (HTML a medida)
                await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_NOTIF,
                    {
                        from_name: clientName,
                        from_email: clientEmail,
                        phone: formData.get("phone") || "No especificado",
                        subject: clientSubject,
                        message: formData.get("message"),
                    },
                    EMAILJS_PUBLIC_KEY
                );

                // 2. Respuesta automática de confirmación al cliente (HTML a medida)
                if (EMAILJS_TEMPLATE_AUTO && clientEmail) {
                    try {
                        const autoRes = await emailjs.send(
                            EMAILJS_SERVICE_ID,
                            EMAILJS_TEMPLATE_AUTO,
                            {
                                to_name: clientName,
                                name: clientName,
                                to_email: clientEmail,
                                email: clientEmail,
                                reply_to: "ramiroalejandolacci19@gmail.com",
                                from_name: "Ramiro Lacci",
                                subject: clientSubject,
                            },
                            EMAILJS_PUBLIC_KEY
                        );
                        console.log("Autoresponder success:", autoRes);
                    } catch (autoErr: any) {
                        console.error("Autoresponder error details:", autoErr?.text || autoErr);
                    }
                }
            } else {
                // Fallback a Web3Forms
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });
                const res = await response.json();
                if (!res.success && !response.ok) {
                    throw new Error(res.message || "No se pudo procesar el envío.");
                }
            }

            setStatus({
                type: 'success',
                message: '¡Mensaje enviado con éxito! Te responderé a la brevedad 🚀'
            });
            form.reset();
            adjustTextareaHeight();
            setTimeout(() => setStatus(null), 6000);
        } catch (err: any) {
            setStatus({
                type: 'warning',
                message: err.message || "No se pudo enviar el mensaje. Por favor intenta más tarde."
            });
            setTimeout(() => setStatus(null), 6000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="contact" id="contact" ref={sectionRef}>
            <h2 className="heading">
                <span style={{ color: 'white' }}>{t('contact_me_heading')}</span>
                <span className="minuscula-span">{t('minuscula')}</span>
            </h2>

            <form ref={formRef} onSubmit={handleSubmit}>
                <div className="form-container">
                    <div className="input-group">
                        <input type="text" name="name" id="full_name" autoComplete="name" placeholder={t('full_name_input')} required />
                        <input type="email" name="email" id="email" autoComplete="email" placeholder={t('email_input')} required />
                        <input type="tel" name="phone" id="phone_number" autoComplete="tel" placeholder={t('phone_number_input')} />
                        <input type="text" name="subject" id="subject" autoComplete="off" placeholder={t('subject_input')} />
                    </div>
                    <div className="input-group-2">
                        <textarea
                            ref={textareaRef}
                            name="message"
                            id="message"
                            rows={1}
                            placeholder={t('your_message_input')}
                            onInput={adjustTextareaHeight}
                            required
                        ></textarea>
                        <div className="submit-btn-box">
                            <input
                                type="submit"
                                disabled={isSubmitting}
                                value={isSubmitting ? t('sending_message_btn') : t('send_message_btn')}
                                className="btn contact-submit-btn"
                            />
                        </div>
                    </div>
                </div>

                {status && (
                    <div className={`contact-status-msg contact-${status.type}-msg`} role="status">
                        {status.type === 'success' && <i className="bx bx-check-circle contact-status-icon"></i>}
                        {status.type === 'error' && <i className="bx bx-x-circle contact-status-icon"></i>}
                        {status.type === 'warning' && <i className="bx bx-error contact-status-icon"></i>}
                        <span>{status.message}</span>
                    </div>
                )}
            </form>
        </section>
    );
};

export default Contact;
