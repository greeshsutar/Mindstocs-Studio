export interface TechCategory {
  name: string;
  technologies: string[];
}

export const techStack: TechCategory[] = [
  {
    name: 'Frontend',
    technologies: ['React', 'Next.js', 'TypeScript'],
  },
  {
    name: 'Backend',
    technologies: ['Node.js', 'Python', 'REST APIs'],
  },
  {
    name: 'Database',
    technologies: ['PostgreSQL', 'MongoDB'],
  },
  {
    name: 'Cloud & Deployment',
    technologies: ['AWS', 'Vercel'],
  },
];
