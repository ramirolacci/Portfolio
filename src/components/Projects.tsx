import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../constants';
import type { Project } from '../types';
import { X, ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type FilterType = 'all' | 'featured' | 'frontend' | 'fullstack' | 'interactive';

const Projects: React.FC = () => {
    const { t } = useTranslation();
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const [visibleCount, setVisibleCount] = useState(8);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const filterCategories: { id: FilterType; labelKey: string }[] = [
        { id: 'all', labelKey: 'filter_all' },
        { id: 'featured', labelKey: 'filter_featured' },
        { id: 'frontend', labelKey: 'filter_frontend' },
        { id: 'fullstack', labelKey: 'filter_fullstack' },
        { id: 'interactive', labelKey: 'filter_interactive' },
    ];

    const filteredProjects = PROJECTS.filter(project => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'featured') return project.featured;
        return project.category === activeFilter;
    });

    const visibleProjects = filteredProjects.slice(0, visibleCount);

    const handleFilterChange = (newFilter: FilterType) => {
        if (newFilter === activeFilter) return;
        setActiveFilter(newFilter);
        setVisibleCount(8);
    };

    // Handle ESC key for modal close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSelectedProject(null);
            }
        };
        if (selectedProject) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [selectedProject]);

    const handleSeeMore = () => {
        if (visibleCount >= filteredProjects.length) {
            setVisibleCount(8);
        } else {
            setVisibleCount(filteredProjects.length);
        }
    };

    return (
        <section className="proyects" id="projects" ref={sectionRef}>
            <div className="proyects-box">
                <h2 className="heading">{t('proyect_heading')}</h2>

                {/* Filter Tabs */}
                <div className="project-filters">
                    {filterCategories.map(category => (
                        <button
                            key={category.id}
                            type="button"
                            className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
                            onClick={() => handleFilterChange(category.id)}
                        >
                            {t(category.labelKey)}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div key={`${activeFilter}-${visibleCount}`} className="wrapper projects-grid" ref={gridRef}>
                    {visibleProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className="proyect-item"
                            style={{ animationDelay: `${index * 60}ms` }}
                        >
                            <div className="project-img-container">
                                <img src={project.image} alt={project.title} loading="lazy" />
                                {project.featured && (
                                    <span className="featured-badge">⭐ {t('filter_featured')}</span>
                                )}
                            </div>
                            <h2>{project.title}</h2>
                            <p>{t(project.translationKey)}</p>
                            <div className="tech-icons">
                                {project.technologies?.map((tech, i) => (
                                    <i key={i} className={`bx ${tech} tech-icon`}></i>
                                ))}
                            </div>
                            
                            <div className="btn-group">
                                <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-sm">
                                    Demo <ExternalLink size={14} style={{ marginLeft: '4px' }} />
                                </a>
                                <a href={project.repo} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline">
                                    Repo <Github size={14} style={{ marginLeft: '4px' }} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* See More Button */}
                {filteredProjects.length > 8 && (
                    <div className="ver-mas-container" style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <button
                            className="btn ver-mas-btn"
                            onClick={handleSeeMore}
                        >
                            {visibleCount >= filteredProjects.length ? t('ver-menos') : t('ver-mas')}
                        </button>
                    </div>
                )}

                {/* Case Study Modal */}
                {selectedProject && (
                    <div className="project-modal-backdrop" onClick={() => setSelectedProject(null)}>
                        <div className="project-modal" onClick={e => e.stopPropagation()}>
                            <button
                                type="button"
                                className="modal-close-btn"
                                onClick={() => setSelectedProject(null)}
                                aria-label="Close"
                            >
                                <X size={24} />
                            </button>
                            
                            <div className="modal-header">
                                <img src={selectedProject.image} alt={selectedProject.title} />
                            </div>
                            
                            <div className="modal-body">
                                <h3>{selectedProject.title}</h3>
                                <p className="modal-desc">{t(selectedProject.translationKey)}</p>

                                {selectedProject.roleKey && (
                                    <div className="modal-meta-item">
                                        <strong>{t('project_role_label')}</strong> {t(selectedProject.roleKey)}
                                    </div>
                                )}

                                <div className="modal-meta-item">
                                    <strong>{t('project_tech_label')}</strong>
                                    <div className="modal-tech-list">
                                        {selectedProject.technologies.map((tech, i) => (
                                            <span key={i} className="modal-tech-chip">
                                                <i className={`bx ${tech}`}></i> {tech.replace('bxl-', '').replace('bx-', '')}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {selectedProject.highlightsKey && (
                                    <div className="modal-meta-item">
                                        <strong>{t('project_highlights_label')}</strong>
                                        <p className="highlights-text">{t(selectedProject.highlightsKey)}</p>
                                    </div>
                                )}

                                <div className="modal-actions">
                                    <a href={selectedProject.demo} target="_blank" rel="noreferrer" className="btn">
                                        Ver Demo Online <ExternalLink size={16} />
                                    </a>
                                    <a href={selectedProject.repo} target="_blank" rel="noreferrer" className="btn btn-secondary">
                                        Ver Código GitHub <Github size={16} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
