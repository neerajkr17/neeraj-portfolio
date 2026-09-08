export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail" | "phone";
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Engagement {
  name: string;
  period: string;
  bullets: string[];
  tags: string[];
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  engagements: Engagement[];
}

export interface ProjectEntry {
  id: string;
  title: string;
  company: string;
  period: string;
  summary: string;
  bullets: string[];
  tags: string[];
  featured?: boolean;
}

export interface EducationEntry {
  school: string;
  credential: string;
  period: string;
  location: string;
}

export interface StatEntry {
  label: string;
  value: number;
  suffix?: string;
}
