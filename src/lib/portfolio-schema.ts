import { z } from 'zod';

export const SkillSchema = z.object({
  name: z.string().min(1).max(80),
  atWork: z.boolean(),
});

export const SkillsSchema = z.object({
  frontend: z.array(SkillSchema).max(40),
  backend: z.array(SkillSchema).max(40),
  databases: z.array(SkillSchema).max(40),
  tooling: z.array(SkillSchema).max(40),
});

export const ProjectSchema = z.object({
  id: z.number().int(),
  title: z.string().min(1).max(120),
  description: z.string().max(800),
  image: z.string().max(300),
  technologies: z.array(z.string().min(1).max(60)).max(30),
  liveUrl: z.string().max(300),
  githubUrl: z.string().max(300),
  featured: z.boolean().optional(),
  category: z.string().min(1).max(60),
  role: z.string().min(1).max(60),
  year: z.number().int().min(2000).max(2100),
});

export const EducationSchema = z.object({
  id: z.number().int(),
  institution: z.string().min(1).max(200),
  degree: z.string().min(1).max(200),
  location: z.string().min(1).max(120),
  startDate: z.string().max(20),
  endDate: z.string().max(20),
  gpa: z.string().max(20).optional(),
  percentage: z.string().max(20).optional(),
  relevant: z.array(z.string().max(80)).max(20),
});

export const ExperienceSchema = z.object({
  id: z.number().int(),
  company: z.string().min(1).max(200),
  position: z.string().min(1).max(120),
  location: z.string().min(1).max(120),
  startDate: z.string().max(20),
  endDate: z.string().max(20),
  description: z.array(z.string().min(1).max(800)).min(1).max(20),
  technologies: z.array(z.string().min(1).max(60)).max(30),
});

export const SocialLinkSchema = z.object({
  url: z.string().min(1).max(400),
  icon: z.string().min(1).max(40),
  label: z.string().min(1).max(60),
});

export const NowSchema = z.object({
  building: z.string().max(300),
  reading: z.string().max(300),
  listening: z.string().max(300),
  updatedAt: z.string().max(20),
});

export const PersonalSchema = z.object({
  name: z.string().min(1).max(120),
  title: z.string().min(1).max(120),
  subtitle: z.string().max(400),
  email: z.string().email().max(200),
  phone: z.string().max(40),
  location: z.string().min(1).max(120),
  website: z.string().max(300),
  linkedIn: z.string().max(300),
  github: z.string().max(300),
  bio: z.array(z.string().min(1).max(2000)).min(1).max(6),
});

export const ContactSchema = z.object({
  title: z.string().min(1).max(120),
  subtitle: z.string().max(400),
  availability: z.string().max(120),
  calLink: z.string().max(400),
});

export const SocialSchema = z.object({
  github: SocialLinkSchema,
  linkedin: SocialLinkSchema,
  twitter: SocialLinkSchema,
  email: SocialLinkSchema,
  phone: SocialLinkSchema,
});

export const PortfolioSchema = z.object({
  personal: PersonalSchema,
  skills: SkillsSchema,
  projects: z.array(ProjectSchema).max(50),
  education: z.array(EducationSchema).max(20),
  experience: z.array(ExperienceSchema).max(30),
  now: NowSchema,
  contact: ContactSchema,
  social: SocialSchema,
});

export const SECTIONS = [
  'personal',
  'skills',
  'projects',
  'education',
  'experience',
  'now',
  'contact',
  'social',
] as const;

export type Section = (typeof SECTIONS)[number];

export const sectionSchemas: Record<Section, z.ZodTypeAny> = {
  personal: PersonalSchema,
  skills: SkillsSchema,
  projects: z.array(ProjectSchema).max(50),
  education: z.array(EducationSchema).max(20),
  experience: z.array(ExperienceSchema).max(30),
  now: NowSchema,
  contact: ContactSchema,
  social: SocialSchema,
};
