// Portfolio Data - Update this file with your information
export const portfolioData = {
  // Personal Information
  personal: {
    name: "Lovish Sharma",
    title: "Full Stack Developer",
    subtitle: "Passionate about creating amazing digital experiences",
    email: "slovish11sharma@gmail.com",
    phone: "+91 97798 98119",
    location: "Bangalore, India",
    website: "https://yourwebsite.com",
    linkedIn: "https://www.linkedin.com/in/lovish1sharma/",
    github: "https://github.com/Lovish141",
    bio: "A full-stack engineer with expertise in frontend and backend development. Skilled in building scalable, user-friendly applications and optimizing system performance. Experienced in enhancing search functionality, developing interactive tools, and automating workflows to improve efficiency. Passionate about solving complex problems, continuous learning, and contributing to innovative software solutions in a collaborative environment.",
  },

  // Skills
  skills: {
    frontend: [
      { name: "React", level: 90, icon: "⚛️" },
      { name: "Next.js", level: 85, icon: "▲" },
      { name: "TypeScript", level: 80, icon: "📘" },
      { name: "JavaScript", level: 95, icon: "🟡" },
      { name: "HTML/CSS", level: 90, icon: "🎨" },
      { name: "Tailwind CSS", level: 85, icon: "💨" },
    ],
    backend: [
      { name: "Node.js", level: 85, icon: "🟢" },
      { name: "Python", level: 80, icon: "🐍" },
      { name: "Express", level: 85, icon: "🚀" },
      { name: "PostgreSQL", level: 75, icon: "🗄️" },
      { name: "MongoDB", level: 70, icon: "🍃" },
      { name: "REST APIs", level: 90, icon: "🔌" },
    ],
    tools: [
      { name: "Git", level: 90, icon: "📂" },
      { name: "Docker", level: 75, icon: "🐳" },
      { name: "AWS", level: 70, icon: "☁️" },
      { name: "Figma", level: 80, icon: "🎨" },
      { name: "VS Code", level: 95, icon: "💻" },
      { name: "Postman", level: 85, icon: "📮" },
    ],
  },

  // Projects
  projects: [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-featured e-commerce platform built with Next.js, Stripe, and PostgreSQL. Features include user authentication, product catalog, shopping cart, and admin dashboard.",
      image: "/images/project1.jpg",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Tailwind CSS"],
      liveUrl: "https://ecommerce-demo.com",
      githubUrl: "https://github.com/yourusername/ecommerce-platform",
      featured: true,
      category: "Full Stack",
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image: "/images/project2.jpg",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Material-UI"],
      liveUrl: "https://taskmanager-demo.com",
      githubUrl: "https://github.com/yourusername/task-manager",
      featured: true,
      category: "Full Stack",
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A responsive weather dashboard that displays current conditions and forecasts using external APIs with beautiful data visualizations.",
      image: "/images/project3.jpg",
      technologies: ["React", "Chart.js", "OpenWeather API", "CSS Modules"],
      liveUrl: "https://weather-dashboard-demo.com",
      githubUrl: "https://github.com/yourusername/weather-dashboard",
      featured: false,
      category: "Frontend",
    },
    {
      id: 4,
      title: "Blog Platform",
      description: "A modern blog platform with markdown support, comment system, and SEO optimization built with Next.js and headless CMS.",
      image: "/images/project4.jpg",
      technologies: ["Next.js", "MDX", "Contentful", "Vercel"],
      liveUrl: "https://blog-platform-demo.com",
      githubUrl: "https://github.com/yourusername/blog-platform",
      featured: false,
      category: "Full Stack",
    },
  ],
// Education
education: [
  {
    id: 1,
    institution: "Chandigarh University",
    degree: "Bachelor of Engineering in Computer Science",
    location: "Mohali, Punjab",
    startDate: "2020",
    endDate: "2024",
    gpa: "8.35/10.0",
    relevant: ["Data Structures", "Algorithms", "Web Development", "Database Systems"],
  },
  {
    id: 2,
    institution: "R.S. Model Senior Secondary School",
    degree: "Intermediate (PSEB)",
    location: "Ludhiana, Punjab",
    startDate: "2018",
    endDate: "2020",
    percentage: "96.66%",
    relevant: [],
  },
  {
    id: 3,
    institution: "Harsh Vidya Mandir School",
    degree: "Matriculation (PSEB)",
    location: "Ludhiana, Punjab",
    startDate: "2017",
    endDate: "2018",
    percentage: "90.15%",
    relevant: [],
  },
],

// Experience
experience: [
  {
    id: 1,
    company: "Microchip Technology India Pvt. Ltd.",
    position: "Software Engineer - I",
    location: "Bangalore, India",
    startDate: "2024-07",
    endDate: "Present",
    description: [
      "Enhanced site search functionality, improving relevancy by 12%, leading to better user experience and engagement.",
      "Developed a product advisor tool to assist customers in making informed purchasing decisions.",
      "Worked on various admin applications to efficiently manage and maintain product data across multiple categories."
    ],
    technologies: [".NET", "JavaScript", "PowerShell", "SQL", "Lucidworks Fusion"],
  },
  {
    id: 2,
    company: "Microchip Technology India Pvt. Ltd.",
    position: "Software Engineer Intern",
    location: "Bangalore, India",
    startDate: "2024-01",
    endDate: "2024-07",
    description: [
      "Created PowerShell scripts to automate data insertions, reducing manual effort and improving efficiency.",
      "Developed a search analytics dashboard to track and visualize search trends.",
      "Fixed multiple bugs across the website, improving stability and performance."
    ],
    technologies: [".NET", "JavaScript", "PowerShell", "SQL"],
  },
],

// Certifications
certifications: [
  {
    id: 1,
    name: "Developing Responsive Web Pages Using HTML5 and CSS3",
    issuer: "Coursera",
    date: "",
    credentialId: "",
  },
  {
    id: 2,
    name: "Front-End Web UI Frameworks and Tools: Bootstrap 4",
    issuer: "Coursera",
    date: "",
    credentialId: "",
  },
  {
    id: 3,
    name: "React Training",
    issuer: "Internshala Trainings",
    date: "",
    credentialId: "",
  },
  {
    id: 4,
    name: "React Native",
    issuer: "Udemy",
    date: "",
    credentialId: "",
  },
],


  // Testimonials
  testimonials: [
    // {
    //   id: 1,
    //   name: "John Smith",
    //   position: "Project Manager",
    //   company: "Tech Solutions Inc.",
    //   content: "Working with [Your Name] was fantastic. They delivered high-quality code on time and was always willing to go the extra mile to ensure project success.",
    //   avatar: "/images/testimonial1.jpg",
    // },
    // {
    //   id: 2,
    //   name: "Sarah Johnson",
    //   position: "Lead Designer",
    //   company: "StartupXYZ",
    //   content: "An excellent developer who pays attention to detail and brings creative solutions to complex problems. Highly recommended!",
    //   avatar: "/images/testimonial2.jpg",
    // },
  ],

  // Contact
  contact: {
    title: "Let's Work Together",
    subtitle: "I'm always interested in new opportunities and exciting projects.",
    availability: "Available for freelance work",
  },

  // Social Links
  social: {
    github: {
      url: "https://github.com/Lovish141",
      icon: "github",
      label: "GitHub"
    },
    linkedin: {
      url: "https://www.linkedin.com/in/lovish1sharma/",
      icon: "linkedin",
      label: "LinkedIn"
    },
    twitter: {
      url: "https://x.com/LovishS08693875",
      icon: "twitter",
      label: "Twitter"
    },
    email: {
      url: "mailto:slovish11sharma@gmail.com",
      icon: "email",
      label: "Email"
    },
    phone: {
      url: "tel:+919779898119",
      icon: "phone",
      label: "Phone"
    },
  },
};
