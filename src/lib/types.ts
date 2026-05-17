export type Skill = {
  name: string;
  atWork: boolean;
};

export type Skills = {
  frontend: Skill[];
  backend: Skill[];
  databases: Skill[];
  tooling: Skill[];
};

export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured?: boolean;
  category: string;
  role: string;
  year: number;
};

export type Education = {
  id: number;
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  percentage?: string;
  relevant: string[];
};

export type Experience = {
  id: number;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies: string[];
};

export type SocialLink = {
  url: string;
  icon: string;
  label: string;
};

export type Now = {
  building: string;
  reading: string;
  listening: string;
  updatedAt: string;
};

export type Personal = {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedIn: string;
  github: string;
  bio: string[];
};

export type Contact = {
  title: string;
  subtitle: string;
  availability: string;
  calLink: string;
};

export type Credentials = {
  currentRole: string;
  currentCompany: string;
  impactMetric: string;
  impactLabel: string;
  locationCity: string;
  locationLocale: string;
  statusLabel: string;
  statusDetail: string;
};

export type PortfolioData = {
  personal: Personal;
  skills: Skills;
  projects: Project[];
  education: Education[];
  experience: Experience[];
  now: Now;
  contact: Contact;
  credentials: Credentials;
  social: {
    github: SocialLink;
    linkedin: SocialLink;
    twitter: SocialLink;
    email: SocialLink;
    phone: SocialLink;
  };
};
