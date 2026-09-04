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
        { id: 'skills', label: t('skills_heading') },
        { id: 'services', label: t('services_heading') },
        { id: 'projects', label: t('projects_heading') },
        { id: 'contact', label: t('contact_heading') },
    ];

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        document.documentElement.lang = lng;
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
            const sections = ['home', 'skills', 'services', 'projects', 'contact'];

            // Check if scrolled near bottom of page -> activate contact
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120) {
                setActiveSection('contact');
                return;
            }

            let currentSection = 'home';
            let minDistance = Infinity;

            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const distance = Math.abs(rect.top - 80);
                    if (rect.top <= 350 && distance < minDistance) {
                        minDistance = distance;
                        currentSection = section;
                    }
                }
            });

            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        setIsMenuOpen(false);
        setActiveSection(id);

        setTimeout(() => {
            const targetElement = document.getElementById(id);
            if (targetElement) {
                try {
                    ScrollTrigger.refresh();
                } catch {
                    // ignore if ScrollTrigger not ready
                }
                const header = headerRef.current;
                const headerHeight = header ? header.getBoundingClientRect().height : (window.innerWidth <= 895 ? 60 : 80);
                let offsetPosition = 0;
                if (id !== 'home') {
                    offsetPosition = Math.max(0, targetElement.offsetTop - Math.floor(headerHeight));
                }

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 50);
    };

    return (
        <header className="header" ref={headerRef}>
            <a href="#home" className="logo" onClick={(e) => handleNavClick(e, 'home')}>
                <img src="/logo/logo_dev.png" alt="Logo" className="navbar-logo" />
                Ramiro <span>Lacci</span>
            </a>

            <div className="nav-container">
                <button
                    type="button"
                    id="menu-icon"
                    className={isMenuOpen ? 'active' : ''}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMenuOpen}
                >
                    <Menu className="menu-icon-inner" size={30} />
                    <X className="x-icon-inner" size={30} />
                </button>

                <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
                    {navItems.map(item => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={activeSection === item.id ? 'active' : ''}
                            onClick={(e) => handleNavClick(e, item.id)}
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
