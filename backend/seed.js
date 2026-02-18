import { pool } from './config/db.js'

const jobs = [
  {
    title: 'Senior Frontend Developer',
    company: 'Atlassian',
    description:
      'Join our design systems team to build the next generation of UI components used by millions of developers worldwide. You will work closely with product designers and backend engineers to deliver high-quality, accessible, and performant React interfaces.',
    location: 'Sydney, NSW',
    salary: '$160,000 – $200,000',
    job_type: 'fullTime',
    tech_stack: ['React', 'TypeScript', 'CSS-in-JS', 'GraphQL', 'Jest'],
    requirements: [
      '5+ years of frontend development experience',
      'Expert knowledge of React and TypeScript',
      'Strong understanding of web accessibility (WCAG 2.1)',
      'Experience with design systems or component libraries',
      'Excellent communication and collaboration skills',
    ],
    responsibility: [
      'Build and maintain reusable UI components in our design system',
      'Collaborate with designers to implement pixel-perfect interfaces',
      'Write comprehensive unit and integration tests',
      'Participate in code reviews and mentor junior developers',
      'Drive frontend performance improvements across the platform',
    ],
    benefits: [
      'Competitive salary + equity package',
      'Flexible hybrid working (2 days in office)',
      'Health and wellness allowance ($2,500/year)',
      'Learning and development budget ($3,000/year)',
      'Home office setup allowance',
    ],
  },
  {
    title: 'Full Stack Engineer',
    company: 'Canva',
    description:
      'We are looking for a Full Stack Engineer to join our Growth team, helping us scale Canva to the next 100 million users. You will work on high-impact features that directly affect user acquisition, activation, and retention across our web and mobile platforms.',
    location: 'Sydney, NSW',
    salary: '$140,000 – $180,000',
    job_type: 'fullTime',
    tech_stack: ['Node.js', 'React', 'TypeScript', 'PostgreSQL', 'AWS', 'Redis'],
    requirements: [
      '3+ years of full stack development experience',
      'Proficiency in React and Node.js',
      'Experience with PostgreSQL or similar relational databases',
      'Familiarity with cloud services (AWS or GCP)',
      'Strong problem-solving and analytical skills',
    ],
    responsibility: [
      'Design, build, and maintain scalable web features end-to-end',
      'Work with data to identify opportunities for growth experiments',
      'Own features from technical design through to production',
      'Collaborate across engineering, product, and design teams',
      'Contribute to improving engineering standards and tooling',
    ],
    benefits: [
      'Above-market salary with equity',
      'Free Canva Pro for life',
      'Generous parental leave policy',
      'Monthly team events and activities',
      'State-of-the-art Sydney office with daily catered lunch',
    ],
  },
  {
    title: 'Backend Engineer – Platform',
    company: 'REA Group',
    description:
      'REA Group is looking for a Backend Engineer to join our Platform team, building the infrastructure and APIs that power realestate.com.au — Australia\'s largest property platform. You will design and maintain reliable, scalable services handling millions of daily requests.',
    location: 'Melbourne, VIC',
    salary: '$130,000 – $165,000',
    job_type: 'fullTime',
    tech_stack: ['Java', 'Kotlin', 'AWS', 'Kafka', 'PostgreSQL', 'Docker', 'Kubernetes'],
    requirements: [
      '4+ years of backend engineering experience',
      'Strong Java or Kotlin skills',
      'Experience building and maintaining REST or GraphQL APIs',
      'Hands-on experience with AWS services',
      'Understanding of distributed systems and event-driven architecture',
    ],
    responsibility: [
      'Design and build highly available backend services and APIs',
      'Own the reliability and performance of platform infrastructure',
      'Work with Kafka for real-time data pipelines',
      'Partner with security teams to ensure safe data handling',
      'Contribute to on-call rotations and incident response',
    ],
    benefits: [
      'Flexible working arrangements',
      'Employee share plan',
      'Paid volunteer days',
      'Subsidised gym membership',
      'Generous parental leave (18 weeks primary, 4 weeks secondary)',
    ],
  },
  {
    title: 'DevOps Engineer',
    company: 'Xero',
    description:
      'Xero is seeking a DevOps Engineer to join our Cloud Platform team, helping us deliver a world-class CI/CD experience for over 400 engineering teams globally. You will improve deployment pipelines, infrastructure reliability, and developer productivity.',
    location: 'Melbourne, VIC',
    salary: '$135,000 – $170,000',
    job_type: 'fullTime',
    tech_stack: ['AWS', 'Terraform', 'Kubernetes', 'GitHub Actions', 'Datadog', 'Python', 'Bash'],
    requirements: [
      '3+ years of DevOps or platform engineering experience',
      'Strong AWS knowledge (EC2, EKS, RDS, S3, IAM)',
      'Experience with Terraform or similar IaC tools',
      'Proficiency with Kubernetes and container orchestration',
      'Solid scripting skills in Python or Bash',
    ],
    responsibility: [
      'Build and maintain CI/CD pipelines for 400+ engineering teams',
      'Manage and improve Kubernetes infrastructure at scale',
      'Drive infrastructure-as-code best practices across the org',
      'Monitor platform health and respond to incidents',
      'Collaborate with security on hardening cloud infrastructure',
    ],
    benefits: [
      'Remote-first culture with flexible hours',
      'Xero shares and bonus scheme',
      '$2,000 technology allowance',
      'Paid learning days and conference budget',
      'Wellbeing leave (5 days/year on top of annual leave)',
    ],
  },
  {
    title: 'React Developer',
    company: 'Culture Amp',
    description:
      'Culture Amp is hiring a React Developer to join our Employee Experience product team. You will build intuitive, data-rich interfaces that help HR teams understand and improve their organisations. This is a hybrid role with strong emphasis on collaboration and impact.',
    location: 'Melbourne, VIC',
    salary: '$110,000 – $145,000',
    job_type: 'fullTime',
    tech_stack: ['React', 'TypeScript', 'GraphQL', 'Ruby on Rails', 'Jest', 'Storybook'],
    requirements: [
      '2+ years of React development experience',
      'Solid TypeScript skills',
      'Experience consuming REST or GraphQL APIs',
      'Attention to detail and strong UI sensibility',
      'Comfortable working in cross-functional agile teams',
    ],
    responsibility: [
      'Build product features in React with TypeScript',
      'Work with our design team to implement accessible, responsive UI',
      'Write and maintain unit and component tests',
      'Participate in sprint planning, retros, and design reviews',
      'Contribute to our internal component library',
    ],
    benefits: [
      'Hybrid working — 3 days remote, 2 in Melbourne office',
      'Equity in a late-stage global SaaS company',
      'Professional development budget ($1,500/year)',
      'Employee Assistance Program',
      'Extra leave between Christmas and New Year',
    ],
  },
]

async function seed() {
  try {
    for (const job of jobs) {
      const dup = await pool.query('SELECT id FROM jobs WHERE title = $1 AND company = $2', [
        job.title,
        job.company,
      ])
      if (dup.rows.length > 0) continue

      await pool.query(
        `INSERT INTO jobs
          (title, company, description, location, salary, job_type, tech_stack, requirements, responsibility, benefits)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
        [
          job.title,
          job.company,
          job.description,
          job.location,
          job.salary,
          job.job_type,
          job.tech_stack,
          job.requirements,
          job.responsibility,
          job.benefits,
        ]
      )
    }
  } catch (err) {
    console.error('Seed failed:', err.message)
  } finally {
    await pool.end()
  }
}

seed()
