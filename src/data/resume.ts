import type {
  EducationEntry,
  ExperienceEntry,
  ProjectEntry,
  SkillGroup,
  SocialLink,
  StatEntry,
} from "../types";

export const profile = {
  name: "Neeraj Kumar",
  role: "Frontend Developer",
  taglineRoles: [
    "Frontend Developer",
    "React.js Specialist",
    "TypeScript Engineer",
    "Secure UI Builder",
  ],
  location: "Bengaluru, Karnataka, India",
  email: "neeraj17399@gmail.com",
  phone: "+91 7979861143",
  summary:
    "Frontend Developer with 2.8 years of experience building secure, scalable React applications. Proficient in React.js, TypeScript, Node.js, and GraphQL. Hands-on experience with secure authentication (Keycloak/OAuth 2.0), AWS cloud services, and CI/CD using Docker and Jenkins. Passionate about building intuitive UI for cybersecurity and real-time data platforms.",
  resumeUrl: "/Neeraj-Kumar-Resume.pdf",
};

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/", icon: "linkedin" },
  { label: "Email", href: `mailto:${profile.email}`, icon: "mail" },
  { label: "Call", href: `tel:${profile.phone.replace(/\s/g, "")}`, icon: "phone" },
];

export const stats: StatEntry[] = [
  { label: "Years of experience", value: 2.8, suffix: "+" },
  { label: "Companies", value: 2 },
  { label: "Shipped engagements", value: 6 },
  { label: "Core stack tools", value: 15, suffix: "+" },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    items: ["JavaScript (ES6+)", "TypeScript", "Java", "HTML5", "CSS3", "DSA"],
  },
  {
    title: "Frameworks",
    items: ["Next.js", "Node.js", "Express.js", "Tailwind CSS", "Bootstrap"],
  },
  {
    title: "Libraries",
    items: ["React.js", "Redux", "Material-UI", "React Router", "Angular", "GraphQL", "Vue.js"],
  },
  {
    title: "Testing",
    items: ["Jest", "React Testing Library"],
  },
  {
    title: "Tools & Platforms",
    items: [
      "Git",
      "GitHub",
      "Docker",
      "Podman",
      "Jenkins",
      "Keycloak",
      "Figma",
      "Linux",
      "AWS IAM",
      "AWS EC2",
      "AWS S3",
      "AWS Lambda",
    ],
  },
  {
    title: "Soft Skills",
    items: ["Communication", "Time Management", "Problem-Solving", "Leadership", "Punctuality"],
  },
];

export const experience: ExperienceEntry[] = [
  {
    company: "Rayvector Technologies",
    role: "Software Developer",
    period: "July 2025 – Present",
    location: "Bengaluru",
    engagements: [
      {
        name: "Poleshift TRP",
        period: "Aug 2025 – Present",
        tags: ["Next.js", "TypeScript", "Redux", "Tailwind CSS", "Keycloak", "OAuth 2.0"],
        bullets: [
          "Developed the frontend from scratch using Next.js, TypeScript, Redux, and Tailwind CSS.",
          "Created scalable modules for merchant onboarding and operations management.",
          "Integrated secure authentication using Keycloak with OAuth 2.0 protocols; validated user inputs to prevent XSS and CSRF vulnerabilities.",
          "Collaborated with cross-functional teams (design/backend) under Agile methodology to deliver robust UI.",
        ],
      },
      {
        name: "Arise",
        period: "July 2025 – Nov 2025",
        tags: ["React.js", "Redux", "Tailwind CSS"],
        bullets: [
          "Built dynamic, reusable UI components using React.js and Redux for state management.",
          "Applied Tailwind CSS for responsive and clean interface design.",
          "Ensured maintainable, high-performance code following industry best practices.",
          "Worked closely with team members to meet feature and sprint delivery timelines.",
        ],
      },
      {
        name: "Neriva AOI",
        period: "Dec 2025 – Present",
        tags: ["Next.js", "Redux", "TypeScript", "Tailwind CSS"],
        bullets: [
          "Worked on the frontend using Next.js, Redux for state management, TypeScript, and Tailwind CSS.",
          "Developed and implemented the Home page, and two sections: Tourism in India and Facts of India.",
          "Ensured responsive, accessible UI matching design expectations.",
          "Collaborated with other teams to maintain consistent structure across components.",
        ],
      },
    ],
  },
  {
    company: "Keen & Able Computers Pvt Ltd",
    role: "Frontend Developer",
    period: "Oct 2023 – Feb 2025",
    location: "Noida",
    engagements: [
      {
        name: "Fino NACH",
        period: "Oct 2024 – Jan 2025",
        tags: ["Next.js", "TypeScript", "Redux", "Tailwind CSS", "Keycloak", "OAuth 2.0"],
        bullets: [
          "Developed the frontend from scratch using Next.js, TypeScript, Redux, and Tailwind CSS.",
          "Created scalable modules for merchant onboarding and operations management.",
          "Integrated secure authentication using Keycloak with OAuth 2.0 protocols; validated user inputs to prevent XSS and CSRF vulnerabilities.",
          "Collaborated with cross-functional teams (design/backend) under Agile methodology to deliver robust UI.",
        ],
      },
      {
        name: "Fino MTA",
        period: "April 2023 – Oct 2024",
        tags: ["React.js", "Redux", "Tailwind CSS"],
        bullets: [
          "Built dynamic, reusable UI components using React.js and Redux for state management.",
          "Applied Tailwind CSS for responsive and clean interface design.",
          "Ensured maintainable, high-performance code following industry best practices.",
          "Worked closely with team members to meet feature and sprint delivery timelines.",
        ],
      },
      {
        name: "NIC MyGov Portal",
        period: "Oct 2023 – April 2024",
        tags: ["Next.js", "Redux", "TypeScript", "Tailwind CSS"],
        bullets: [
          "Worked on the frontend using Next.js, Redux for state management, TypeScript, and Tailwind CSS.",
          "Developed and implemented the Home page, and two sections: Tourism in India and Facts of India.",
          "Ensured responsive, accessible UI matching design expectations.",
          "Collaborated with other teams to maintain consistent structure across components.",
        ],
      },
    ],
  },
];

// Flattened, filterable view of the same engagements for the Projects grid.
export const projects: ProjectEntry[] = experience.flatMap((exp) =>
  exp.engagements.map((eng) => ({
    id: `${exp.company}-${eng.name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    title: eng.name,
    company: exp.company,
    period: eng.period,
    summary: eng.bullets[0],
    bullets: eng.bullets,
    tags: eng.tags,
    featured: eng.tags.includes("Keycloak"),
  })),
);

export const education: EducationEntry[] = [
  {
    school: "M S Ramaiah University of Applied Sciences",
    credential: "Bachelor of Technology",
    period: "Aug 2018 – June 2022",
    location: "Bangalore, Karnataka, India",
  },
  {
    school: "Infant Jesus School",
    credential: "Intermediate",
    period: "April 2016 – April 2017",
    location: "Patna, Bihar, India",
  },
  {
    school: "Infant Jesus School",
    credential: "10th",
    period: "April 2014 – April 2015",
    location: "Patna, Bihar, India",
  },
];

export const allTags = Array.from(new Set(projects.flatMap((p) => p.tags))).sort();
