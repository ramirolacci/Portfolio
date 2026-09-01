export interface Project {
  id: number | string;
  title: string;
  image: string;
  demo: string;
  repo: string;
  translationKey: string;
  category: 'featured' | 'frontend' | 'fullstack' | 'interactive';
  technologies: string[];
  roleKey?: string;
  highlightsKey?: string;
  featured?: boolean;
}

export interface SkillItem {
  name: string;
  icon: string;
  badge: string;
}

export interface SkillCategory {
  category: string;
  translationKey: string;
  icon: string;
  items: SkillItem[];
}

