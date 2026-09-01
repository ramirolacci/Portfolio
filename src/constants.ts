import type { Project, SkillCategory } from './types';

export const GITHUB_REPO = "https://github.com/ramirolacci";
export const LINKEDIN_PROFILE = "https://www.linkedin.com/in/ramiro-lacci-20386026a/";
export const WHATSAPP_LINK = "https://wa.link/a1bh6y";
export const EMAIL = "ramiroalejandolacci19@gmail.com";

export const PROJECTS: Project[] = [
    {
        id: "waveframe",
        title: "WaveFrame Studio",
        image: "/images/waveframe.png",
        demo: "https://waveframe.com.ar/",
        repo: "https://github.com/ramirolacci/WaveFrame-Studio",
        translationKey: "project_waveframe_desc",
        category: "featured",
        featured: true,
        technologies: ["bxl-react", "bxl-typescript", "bxl-tailwind-css", "bx-cube"],
        roleKey: "project_waveframe_role",
        highlightsKey: "project_waveframe_highlights"
    },
    {
        id: "migusto-flamin",
        title: "Mi Gusto Flamin' Hot",
        image: "/images/project5.png",
        demo: "https://www.migusto.com.ar/crunchy/",
        repo: "https://github.com/ramirolacci/Mi-Gusto-x-Doritos-Flamin-Hot",
        translationKey: "project5_desc",
        category: "featured",
        featured: true,
        technologies: ["bxl-html5", "bxl-css3", "bxl-javascript", "bx-bolt"],
        roleKey: "project5_role",
        highlightsKey: "project5_highlights"
    },
    {
        id: "golden-tickets",
        title: "Golden Tickets Mi Gusto",
        image: "/images/Golden Tickets.png",
        demo: "https://www.migusto.com.ar/tickets/",
        repo: "https://github.com/ramirolacci/GoldenTickets",
        translationKey: "project_golden_desc",
        category: "fullstack",
        featured: true,
        technologies: ["bxl-react", "bxl-typescript", "bxl-php", "bxs-data"],
        roleKey: "project_golden_role",
        highlightsKey: "project_golden_highlights"
    },
    {
        id: "qr-generator",
        title: "QR Generator PRO",
        image: "/images/QR Generator.png",
        demo: "https://www.migusto.com.ar/tools/QR/",
        repo: "https://github.com/ramirolacci/QRgenPRO",
        translationKey: "project_qr_desc",
        category: "frontend",
        featured: false,
        technologies: ["bxl-react", "bxl-typescript", "bxl-tailwind-css"],
        roleKey: "project_qr_role",
        highlightsKey: "project_qr_highlights"
    },
    {
        id: "photoparty",
        title: "Photo Party App",
        image: "/images/photoparty.png",
        demo: "https://mis15bianca-recuerdos.netlify.app/",
        repo: "https://github.com/ramirolacci/PhotoPartyApp",
        translationKey: "project_photoparty_desc",
        category: "interactive",
        featured: false,
        technologies: ["bxl-react", "bxl-typescript", "bx-camera", "bx-video"],
        roleKey: "project_photoparty_role",
        highlightsKey: "project_photoparty_highlights"
    },
    {
        id: "migusto-games",
        title: "Mi Gusto Games (Lollapalooza)",
        image: "/images/Games.png",
        demo: "https://www.migusto.com.ar/games/aperturas/",
        repo: "https://github.com/ramirolacci/MiGusto-Games",
        translationKey: "project_games_desc",
        category: "interactive",
        featured: false,
        technologies: ["bxl-react", "bxl-typescript", "bx-joystick"],
        roleKey: "project_games_role",
        highlightsKey: "project_games_highlights"
    },
    {
        id: "reminders-rooms",
        title: "Reminders Rooms",
        image: "/images/Rooms.png",
        demo: "https://www.migusto.com.ar/tools/rooms/",
        repo: "https://github.com/ramirolacci/RR-RemindersRoomsAPP",
        translationKey: "project_reminders_desc",
        category: "fullstack",
        featured: false,
        technologies: ["bxl-react", "bxl-typescript", "bxl-nodejs"],
        roleKey: "project_reminders_role",
        highlightsKey: "project_reminders_highlights"
    },
    {
        id: "influencers-form",
        title: "Influencers Exchange System",
        image: "/images/Influencers.png",
        demo: "https://www.migusto.com.ar/canjes/",
        repo: "https://github.com/ramirolacci/InfluencersForm",
        translationKey: "project_influencers_desc",
        category: "fullstack",
        featured: false,
        technologies: ["bxl-react", "bxl-typescript", "bxl-php", "bx-user-voice"],
        roleKey: "project_influencers_role",
        highlightsKey: "project_influencers_highlights"
    },
    {
        id: "kiruki",
        title: "Kiruki Make It Happen",
        image: "/images/project1.png",
        demo: "https://kiruki-makeit.netlify.app/",
        repo: "https://github.com/ramirolacci/Kiruki-Make-It-Happen",
        translationKey: "project1_desc",
        category: "frontend",
        featured: false,
        technologies: ["bxl-html5", "bxl-css3", "bxl-javascript"]
    },
    {
        id: "bexc-gym",
        title: "Bexc 2.0 Gym",
        image: "/images/project2.png",
        demo: "https://bexc.netlify.app/#home",
        repo: "https://github.com/ramirolacci/Bexc2.0-Gym",
        translationKey: "project2_desc",
        category: "frontend",
        featured: false,
        technologies: ["bxl-react", "bxl-bootstrap", "bxl-javascript"]
    },
    {
        id: "rune-rental",
        title: "Rüne Rental Car",
        image: "/images/project3.png",
        demo: "https://rune-rental-car.netlify.app/",
        repo: "https://github.com/ramirolacci/Rune-Rental-Car",
        translationKey: "project3_desc",
        category: "frontend",
        featured: false,
        technologies: ["bxl-react", "bxl-typescript", "bxl-css3"]
    }
];

export const SKILLS: SkillCategory[] = [
    {
        category: "Languages",
        translationKey: "languages_heading",
        icon: "bx-code-alt",
        items: [
            { name: "HTML5", icon: "bxl-html5", badge: "html5" },
            { name: "CSS3", icon: "bxl-css3", badge: "css3" },
            { name: "JavaScript", icon: "bxl-javascript", badge: "js" },
            { name: "TypeScript", icon: "bxl-typescript", badge: "ts" },
            { name: "Python", icon: "bxl-python", badge: "python" },
            { name: "Ruby", icon: "bxs-diamond", badge: "ruby" },
            { name: "PHP", icon: "bxl-php", badge: "php" },
        ]
    },
    {
        category: "Frameworks",
        translationKey: "frameworks_heading",
        icon: "bx-cog",
        items: [
            { name: "React", icon: "bxl-react", badge: "react" },
            { name: "Node.js", icon: "bxl-nodejs", badge: "node" },
            { name: "Tailwind CSS", icon: "bxl-tailwind-css", badge: "tailwind" },
            { name: "Bootstrap", icon: "bxl-bootstrap", badge: "bootstrap" },
            { name: "GSAP", icon: "bx-movie-play", badge: "gsap" },
            { name: "Rails", icon: "bx-layer", badge: "rails" },
        ]
    },
    {
        category: "Databases",
        translationKey: "databases_heading",
        icon: "bx-data",
        items: [
            { name: "MySQL", icon: "bxs-data", badge: "mysql" },
            { name: "Supabase", icon: "bx-cloud", badge: "supabase" },
            { name: "phpMyAdmin", icon: "bxs-data", badge: "phpmyadmin" },
        ]
    },
    {
        category: "IDE",
        translationKey: "ide_heading",
        icon: "bx-laptop",
        items: [
            { name: "Visual Studio Code", icon: "bxl-visual-studio", badge: "vscode" },
            { name: "Cursor", icon: "bx-navigation", badge: "cursor" },
            { name: "Antigravity", icon: "bx-rocket", badge: "antigravity" },
            { name: "Replit", icon: "bx-code", badge: "replit" },
        ]
    },
    {
        category: "Hostings",
        translationKey: "hostings_heading",
        icon: "bx-cloud",
        items: [
            { name: "Hostinger", icon: "bx-globe", badge: "hostinger" },
            { name: "Netlify", icon: "bx-cloud-upload", badge: "netlify" },
            { name: "Vercel", icon: "bx-terminal", badge: "vercel" },
        ]
    },
    {
        category: "Other Tools",
        translationKey: "other_tools_heading",
        icon: "bx-grid-alt",
        items: [
            { name: "GitHub", icon: "bxl-github", badge: "github" },
            { name: "Git", icon: "bxl-git", badge: "git" },
            { name: "Adobe XD", icon: "bxl-adobe", badge: "adobexd" },
            { name: "Slack", icon: "bxl-slack", badge: "slack" },
            { name: "Jira", icon: "bx-task", badge: "jira" },
        ]
    }
];

