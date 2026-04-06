import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

const Navbar: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const headerRef = useRef<HTMLElement>(null);

    const navItems = [
        { id: 'home', label: t('home_heading') },
        { id: 'education', label: t('education_heading') },
        { id: 'services', label: t('services_heading') },
        { id: 'projects', label: t('projects_heading') },
        { id: 'contact', label: t('contact_heading') },
    ];

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    // Entrance animation
    useEffect(() => {
        const header = headerRef.current;
        if (!header) return;
        const logo = header.querySelector('.logo');
        const links = header.querySelectorAll('.navbar a');
        const flags = header.querySelector('.flags-container');

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.fromTo(header, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
            .fromTo(logo, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 }, '-=0.3')
            .fromTo(links, { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, '-=0.3')
            .fromTo(flags, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.4 }, '-=0.3');

        return () => { tl.kill(); };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'education', 'services', 'projects', 'contact'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top >= -150 && rect.top <= 150;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="header" ref={headerRef}>
            <a href="#home" className="logo">Ramiro <span>Lacci</span></a>

            <div className="nav-container">
                <div id="menu-icon" className={isMenuOpen ? 'active' : ''} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Menu className="menu-icon-inner" size={36} />
                    <X className="x-icon-inner" size={36} />
                </div>

                <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
                    {navItems.map(item => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={activeSection === item.id ? 'active' : ''}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className="flags-container">
                    <button className="flags" onClick={() => changeLanguage('en')} aria-label="Switch to English">
                        <div className="flags__item">
                            <img src="/flags/us.svg" alt="English" />
                        </div>
                    </button>
                    <button className="flags" onClick={() => changeLanguage('es')} aria-label="Switch to Spanish">
                        <div className="flags__item">
                            <img src="/flags/ar.svg" alt="Spanish" />
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
