// Department type and constants
export const DEPARTMENTS = [
  'Engineering',
  'Product Design',
  'Data Science',
  'Product Management',
  'Marketing'
] as const;

export type Department = typeof DEPARTMENTS[number];

export const DEPARTMENT_OPTIONS = DEPARTMENTS.map(dept => ({
  value: dept,
  label: dept
}));

// Available skills by category
export const AVAILABLE_SKILLS = [
  // Frontend
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Vue.js', category: 'Frontend' },
  { name: 'Angular', category: 'Frontend' },

  // Backend
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'Java', category: 'Backend' },
  { name: 'GraphQL', category: 'Backend' },
  { name: 'REST API', category: 'Backend' },

  // Cloud & DevOps
  { name: 'AWS', category: 'Cloud & DevOps' },
  { name: 'Azure', category: 'Cloud & DevOps' },
  { name: 'Docker', category: 'Cloud & DevOps' },
  { name: 'Kubernetes', category: 'Cloud & DevOps' },

  // Databases
  { name: 'MongoDB', category: 'Databases' },
  { name: 'PostgreSQL', category: 'Databases' },
  { name: 'Redis', category: 'Databases' },

  // Design
  { name: 'Figma', category: 'Design' },
  { name: 'Adobe XD', category: 'Design' },
  { name: 'Sketch', category: 'Design' },
  { name: 'UI/UX Design', category: 'Design' },

  // Management
  { name: 'Product Management', category: 'Management' },
  { name: 'Agile', category: 'Management' },
  { name: 'Scrum', category: 'Management' },

  // Data Science
  { name: 'Machine Learning', category: 'Data Science' },
  { name: 'Deep Learning', category: 'Data Science' },
  { name: 'TensorFlow', category: 'Data Science' },
  { name: 'Computer Vision', category: 'Data Science' },
  { name: 'NLP', category: 'Data Science' },
  { name: 'Data Analytics', category: 'Data Science' },

  // Other
  { name: 'System Design', category: 'Other' },
  { name: 'Microservices', category: 'Other' },
  { name: 'Design Systems', category: 'Other' },
  { name: 'Motion Design', category: 'Other' },
  { name: 'User Testing', category: 'Other' },
  { name: 'Digital Marketing', category: 'Other' },
  { name: 'Content Strategy', category: 'Other' }
];