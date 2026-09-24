import React from 'react';

export interface TechDetails {
    id: string;
    name: string;
    iconClass: string;
}

export const TECH_DETAILS: Record<string, TechDetails> = {
    react: { id: 'react', name: 'React', iconClass: 'bxl-react' },
    typescript: { id: 'typescript', name: 'TypeScript', iconClass: 'bxl-typescript' },
    javascript: { id: 'javascript', name: 'JavaScript', iconClass: 'bxl-javascript' },
    html5: { id: 'html5', name: 'HTML5', iconClass: 'bxl-html5' },
    css3: { id: 'css3', name: 'CSS3', iconClass: 'bxl-css3' },
    vanilla_css3: { id: 'vanilla_css3', name: 'Vanilla CSS3', iconClass: 'bxl-css3' },
    tailwindcss: { id: 'tailwindcss', name: 'Tailwind CSS', iconClass: 'bxl-tailwind-css' },
    threejs: { id: 'threejs', name: 'Three.js', iconClass: 'bx-cube' },
    postgresql: { id: 'postgresql', name: 'PostgreSQL', iconClass: 'bxs-data' },
    supabase: { id: 'supabase', name: 'Supabase', iconClass: 'bxs-data' },
    joystick: { id: 'joystick', name: 'Joystick', iconClass: 'bx-joystick' },
    camera: { id: 'camera', name: 'Camera', iconClass: 'bx-camera' },
    video: { id: 'video', name: 'Video Camera', iconClass: 'bx-video' },
    bolt: { id: 'bolt', name: 'Interactive', iconClass: 'bx-bolt' },
};

export const getTechDetails = (techKey: string): TechDetails => {
    const keyLower = techKey.toLowerCase().trim();
    if (TECH_DETAILS[keyLower]) {
        return TECH_DETAILS[keyLower];
    }

    if (techKey.startsWith('bxl-') || techKey.startsWith('bx-') || techKey.startsWith('bxs-')) {
        const cleanName = techKey.replace(/^bx[ls]-/, '').replace(/-/g, ' ');
        const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
        return {
            id: techKey,
            name: formattedName,
            iconClass: techKey
        };
    }

    return {
        id: techKey,
        name: techKey,
        iconClass: `bx-${techKey}`
    };
};

interface TechIconProps {
    tech: string;
    className?: string;
    showTooltip?: boolean;
}

export const TechIcon: React.FC<TechIconProps> = ({ tech, className = 'tech-icon', showTooltip = true }) => {
    const details = getTechDetails(tech);
    const isBoxIcon = details.iconClass.startsWith('bx');
    const fullClass = isBoxIcon ? `bx ${details.iconClass} ${className}` : `${details.iconClass} ${className}`;

    return (
        <i
            className={fullClass.trim()}
            title={showTooltip ? details.name : undefined}
            aria-label={details.name}
        ></i>
    );
};

export default TechIcon;
