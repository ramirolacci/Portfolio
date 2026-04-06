export const GITHUB_REPO = "https://github.com/ramirolacci";
export const LINKEDIN_PROFILE = "https://www.linkedin.com/in/ramiro-lacci-20386026a/";
export const WHATSAPP_LINK = "https://wa.link/a1bh6y";
export const EMAIL = "ramiroalejandolacci19@gmail.com";

export const PROJECTS = [
    {
        id: 1,
        title: "Kiruki Make It Happen",
        image: "/images/project1.png",
        demo: "https://kiruki-makeit.netlify.app/",
        repo: "https://github.com/ramirolacci/Kiruki-Make-It-Happen",
        translationKey: "project1_desc",
    },
    {
        id: 2,
        title: "Bexc 2.0 Gym",
        image: "/images/project2.png",
        demo: "https://bexc.netlify.app/#home",
        repo: "https://github.com/ramirolacci/Bexc2.0-Gym",
        translationKey: "project2_desc",
    },
    {
        id: 3,
        title: "Rüne Rental Car",
        image: "/images/project3.png",
        demo: "https://rune-rental-car.netlify.app/",
        repo: "https://github.com/ramirolacci/Rune-Rental-Car",
        translationKey: "project3_desc",
    },
    {
        id: 4,
        title: "Mi Gusto",
        image: "/images/project4.png",
        demo: "https://mi-gusto.netlify.app/productos",
        repo: "https://github.com/ramirolacci/MiGustoWeb",
        translationKey: "project4_desc",
    },
    {
        id: 5,
        title: "Mi Gusto Flamin' Hot",
        image: "/images/project5.png",
        demo: "https://www.migusto.com.ar/crunchy/",
        repo: "https://github.com/ramirolacci/Mi-Gusto-x-Doritos-Flamin-Hot",
        translationKey: "project5_desc",
        extra: true,
    },
    {
        id: 6,
        title: "BortexIA",
        image: "/images/project1.png",
        demo: "#",
        repo: "https://github.com/ramirolacci/BortexIA",
        translationKey: "project6_desc",
        extra: true,
    }
];

export const SKILLS = [
    {
        category: "Languages",
        translationKey: "languages_heading",
        icon: "bx-code-alt",
        items: [
            { name: "HTML5", icon: "bxl-html5", badge: "html5" },
            { name: "CSS3", icon: "bxl-css3", badge: "css3" },
            { name: "JavaScript", icon: "bxl-javascript", badge: "js" },
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
            { name: "Bootstrap", icon: "bxl-bootstrap", badge: "bootstrap" },
            { name: "Node.js", icon: "bxl-nodejs", badge: "node" },
            { name: "React", icon: "bxl-react", badge: "react" },
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
        ]
    },
    {
        category: "IDE",
        translationKey: "ide_heading",
        icon: "bx-laptop",
        items: [
            { name: "Visual Studio Code", icon: "bxl-visual-studio", badge: "vscode" },
            { name: "Cursor", icon: "bx-code-curly", badge: "cursor" },
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
