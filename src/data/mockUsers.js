// ============================================================
// AfriHire — Mock Users Data
// Sample candidate and company accounts for demo
// ============================================================

export const mockUsers = {
  candidates: [
    {
      id: 'candidate-001',
      email: 'amara.okafor@email.com',
      password: 'demo123',
      role: 'candidate',
      firstName: 'Amara',
      lastName: 'Okafor',
      avatar: '👩🏾‍💻',
      bio: 'Passionate frontend developer from Lagos with 4 years of experience building enterprise React applications. Open to remote opportunities with global teams.',
      title: 'Frontend Developer',
      location: 'Lagos, Nigeria',
      skills: ['React', 'TypeScript', 'Redux', 'CSS', 'Node.js', 'Git'],
      experience: [
        {
          company: 'TechHub Nigeria',
          role: 'Senior Frontend Developer',
          duration: '2024 - Present',
          description: 'Leading frontend team for fintech dashboard products'
        },
        {
          company: 'DigiLabs',
          role: 'Frontend Developer',
          duration: '2022 - 2024',
          description: 'Built React applications for e-commerce clients'
        }
      ],
      links: {
        github: 'https://github.com/amaraokafor',
        linkedin: 'https://linkedin.com/in/amaraokafor',
        portfolio: 'https://amaraokafor.dev'
      },
      savedJobs: ['job-001', 'job-013'],
      createdAt: '2026-03-01T10:00:00Z',
    },
    {
      id: 'candidate-002',
      email: 'kwame.mensah@email.com',
      password: 'demo123',
      role: 'candidate',
      firstName: 'Kwame',
      lastName: 'Mensah',
      avatar: '👨🏾‍💻',
      bio: 'Full-stack developer from Accra specializing in Python and cloud technologies. Experienced in building scalable fintech solutions.',
      title: 'Full Stack Developer',
      location: 'Accra, Ghana',
      skills: ['Python', 'Django', 'React', 'PostgreSQL', 'AWS', 'Docker'],
      experience: [
        {
          company: 'FinServe Ghana',
          role: 'Backend Developer',
          duration: '2023 - Present',
          description: 'Building payment processing microservices'
        }
      ],
      links: {
        github: 'https://github.com/kwamemensah',
        linkedin: 'https://linkedin.com/in/kwamemensah',
        portfolio: ''
      },
      savedJobs: ['job-002', 'job-005'],
      createdAt: '2026-03-05T08:00:00Z',
    },
  ],
  companies: [
    {
      id: 'company-demo',
      email: 'hr@techcorp.com',
      password: 'demo123',
      role: 'company',
      companyName: 'TechCorp Africa',
      avatar: '🏢',
      description: 'A leading technology company building innovative solutions for African markets. We believe in remote-first work and diverse teams.',
      industry: 'Technology',
      website: 'https://techcorpafrica.com',
      location: 'Lagos, Nigeria',
      size: '50-200 employees',
      founded: '2020',
      createdAt: '2026-02-15T10:00:00Z',
    },
  ],
};

// Demo credentials for quick login
export const demoCredentials = {
  candidate: { email: 'amara.okafor@email.com', password: 'demo123' },
  company: { email: 'hr@techcorp.com', password: 'demo123' },
};
