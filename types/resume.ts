export type Template = "modern" | "classic" | "minimal" | "creative"

export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  summary: string
  title?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
}

export interface Education {
  id: string
  school: string
  degree: string
  field: string
  year: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
}

export interface Language {
  id: string
  name: string
  proficiency: "Basic" | "Intermediate" | "Advanced" | "Fluent"
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string
  link?: string
}

export interface ResumeData {
  personalInfo: PersonalInfo
  experience: Experience[]
  education: Education[]
  certifications: Certification[]
  languages: Language[]
  projects: Project[]
  skills: string[]
}
