import type { PortfolioData } from '@/types'

export const portfolioData: PortfolioData = {
  name: 'AbdulQader Qassab',
  title: 'SDE @ Noon | Problem Solver & Technology Enthusiast',
  location: 'Dubai, United Arab Emirates',
  contact: {
    phone: '+971547001658',
    email: 'abduLqader_Q@hotmail.com',
    linkedin: 'www.linkedin.com/in/abdulqader-qassab',
    icpc_profile: 'icpc.global/ICPCID/ZEL30F6JS098',
  },
  summary:
    'Full-stack Software Engineer with 4+ years of experience building scalable, high-performance solutions. Specializes in TypeScript, Python, Node.js, GCP, and Azure, solving complex problems and delivering efficient systems.',
  skills: {
    top_skills: ['Problem Solving', 'React.js', 'Git'],
    languages: {
      English: 'Full Professional',
      Arabic: 'Native or Bilingual',
    },
  },
  certifications: [
    'JSNation 2024 - Certificate of Successful Completion',
    'React Summit 2024 - Certificate of Successful Completion',
    'C3 Dev Festival 2024 - Certificate of Successful Completion',
  ],
  awards: [
    'Bronze Medal at Aleppo CPC',
    'Silver Medal at Aleppo CPC',
    'Certificate of achievement at SCPC',
    'Certificate of achievement at ACPC',
    'SCIC Aleppo 2022',
  ],
  experience: [
    {
      company: 'noon',
      location: 'Dubai, United Arab Emirates',
      roles: [
        {
          title: 'Software Development Engineer 3',
          period: 'September 2025 - Present',
          achievements: [],
        },
        {
          title: 'Software Development Engineer 2',
          period: 'July 2024 - August 2025',
          achievements: [
            'Developed geospatial parking enrichment system using telemetry and OSM data.',
            'Improved service-layer performance and reduced DB load by 30–35%.',
            'Revamped Heatmap v2 for the Fleet Management App.',
          ],
        },
        {
          title: 'Software Development Engineer',
          period: 'January 2023 - June 2024',
          achievements: [
            'Improved resource allocation efficiency by 25%.',
            'Engineered high-performance payout engine for OPS team.',
            'Led successful launch of on-demand service for food delivery.',
          ],
        },
      ],
    },
    {
      company: 'Uplink | High Tech Passion',
      title: 'Co-Founder',
      location: 'Egypt',
      period: 'November 2022 - September 2025',
      achievements: [
        'Led teams to build LMS and booking management apps.',
        'Selected optimal technologies and executed implementation plans.',
        'Reduced IT costs and improved operational efficiency for businesses.',
      ],
    },
    {
      company: 'EBLA Computer Consultancy',
      title: 'Software Developer',
      location: 'Qatar',
      period: 'July 2022 - December 2022',
      achievements: [
        'Frontend developer for major government apps (RACA, Customs).',
        'Ensured accessibility and compliance with government standards.',
        'Used Angular with clean architecture principles.',
      ],
    },
    {
      company: 'Socienta',
      title: 'Software Developer',
      location: 'Dubai, UAE',
      period: 'September 2021 - August 2022',
      achievements: [
        'Integrated with Mollak system.',
        'Generated accounting and tax reports (AFS, VAT, reconciliation).',
        'Implemented PR/PO process and developed vendor portal end-to-end.',
      ],
    },
    {
      company: 'Ibdaa Syria',
      title: 'Software Developer',
      location: 'Bursa, Turkey',
      period: 'January 2021 - June 2021',
      achievements: [
        'Developed accounting software for the Gold industry.',
        'Designed React.js web portal.',
        'Gained industry-specific financial insights.',
      ],
    },
    {
      company: 'Nimas Technology',
      title: 'Software Developer',
      location: 'Beirut, Lebanon',
      period: 'September 2020 - February 2021',
      achievements: [
        'Implemented complex Virtual Scheduler.',
        'Built core system components for Workforce Management System.',
        'Improved request abstraction between frontend and backend.',
      ],
    },
    {
      company: 'mayar world',
      title: 'Software Developer',
      location: 'Turkey',
      period: 'March 2020 - November 2020',
      achievements: [
        'Developed company portfolio website.',
        'Used MERN stack for UI/UX.',
        'Managed deployment on VPS.',
      ],
    },
  ],
  education: {
    institution: 'Aleppo University',
    degree: "Bachelor's degree",
    field: 'Information Technology',
    period: '2017 - 2022',
  },
}
