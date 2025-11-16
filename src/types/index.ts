export interface Role {
  title: string
  period: string
  achievements: string[]
}

export interface Experience {
  company: string
  location: string
  roles?: Role[]
  title?: string
  period?: string
  achievements?: string[]
}

export interface Education {
  institution: string
  degree: string
  field: string
  period: string
}

export interface Contact {
  phone: string
  email: string
  linkedin: string
  icpc_profile: string
}

export interface Skills {
  top_skills: string[]
  languages: {
    [key: string]: string
  }
}

export interface PortfolioData {
  name: string
  title: string
  location: string
  contact: Contact
  summary: string
  skills: Skills
  certifications: string[]
  awards: string[]
  experience: Experience[]
  education: Education
}

export type SectionId = 'home' | 'about' | 'experience' | 'skills' | 'education' | 'achievements' | 'contact'
