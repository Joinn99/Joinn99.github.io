

export interface Link {
  github?: string;
  googleScholar?: string;
  openReview?: string;
  email?: string;
  linkedin?: string;
  orcid?: string;
}

export interface Intro {
  name: string;
  position: string;
  description: string;
  avatar?: string;
  links: Link;
}

export interface Photo {
  url: string;
  location: string;
  coordinates?: string;
  time?: string;
}

export interface Education {
  school: string;
  location: string;
  time: string;
  degree: string;
  advisor?: string;
  advisorUrl?: string;
  area?: string;
  image: string;
}

export interface Experience {
  company: string;
  location: string;
  time: string;
  position: string;
  image: string;
  description?: string;
}

export interface Project {
  title: string;
  subtitle?: string;
  time: string;
  location: string;
  collaborators: string;
  description: string;
  image: string;
  link?: string;
}

export interface Award {
  name: string;
  time: string;
  location: string;
}

export interface News {
  time: string;
  news: string;
}

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  link?: string;
  code?: string;
  data?: string;
}

export interface Service {
  occupation: string;
  venue: string;
  time: string;
}

export interface AppData {
  intro: Intro;
  photos: Photo[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  awards: Award[];
  publications: Publication[];
  service: Service[];
  news: News[];
  sectionTitles: {
    photos: string;
    education: string;
    experience: string;
    projects: string;
    awards: string;
    publications: string;
    service: string;
    news: string;
  };
}

export type Language = 'en' | 'zh';
export type Theme = 'light' | 'dark' | 'system';