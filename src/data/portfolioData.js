
export const portfolioData = {
  // Personal Information
  personal: {
    name: "Lovish Sharma",
    title: "Full Stack Developer",
    subtitle: "Passionate about creating amazing digital experiences",
    email: "slovish11sharma@gmail.com",
    phone: "+91 97798 98119",
    location: "Bangalore, India",
    website: "https://lovish.dev/",
    linkedIn: "https://www.linkedin.com/in/lovish1sharma/",
    github: "https://github.com/Lovish141",
    bio: "A full-stack engineer with expertise in frontend and backend development. Skilled in building scalable, user-friendly applications and optimizing system performance. Experienced in enhancing search functionality, developing interactive tools, and automating workflows to improve efficiency. Passionate about solving complex problems, continuous learning, and contributing to innovative software solutions in a collaborative environment.",
  },

  // Skills
  skills: {
    frontend: [
      { name: "HTML", icon: "🌐" },
      { name: "CSS", icon: "🎨" },
      { name: "JavaScript", icon: "�" },
      { name: "React.js", icon: "⚛️" },
      { name: "Next.js", icon: "▲" },
      { name: "Vue.js", icon: "�" },
    ],
    backend: [
      { name: "SQL", icon: "�️" },
      { name: "MongoDB", icon: "🍃" },
      { name: ".NET Framework", icon: "�" },
      { name: "Node.js", icon: "�" },
      { name: "Express.js", icon: "�" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "Prisma", icon: "�" },
    ],
    languages: [
      { name: "Java", icon: "☕" },
    ],
    frameworks: [
      { name: "Bootstrap", icon: "🅱️" },
      { name: "Tailwind CSS", icon: "💨" },
      { name: "Material UI", icon: "🔵" },
      { name: "Git", icon: "�" },
      { name: "GitHub", icon: "�" },
    ],
  },

  // Projects
  projects: [{
  id: 1,
  title: "SoundSwap",
  description: "A playlist converter that allows users to transform their Spotify playlists into YouTube Music playlists seamlessly. Handles authentication, API integration, and smooth track mapping between platforms.",
  image: "/assets/images/soundswap.png",
  technologies: ["React.js", "Node.js","MongoDb","Express","OAuth", "Spotify API", "Google  API","Tailwind CSS"],
  liveUrl: "https://sound-swap-frontend.vercel.app",
  githubUrl: "https://github.com/Lovish141/SoundSwap",
  featured: true,
  category: "Full Stack",
},
{
  id: 2,
  title: "ZippyUrl",
  description: "A lightweight and efficient URL shortener application.",
  image: "/assets/images/zippyurl.png",
  technologies: ["Next.js","Prisma","PostgreSQL","ShadCN UI","Tailwind CSS"],
  liveUrl: "https://zippyurl.vercel.app/",
  githubUrl: "https://github.com/Lovish141/tinyurl",
  featured: true,
  category: "Full Stack",
},
{
  id: 3,
  title: "Daunku",
  description: "A modern and visually appealing furniture website designed to showcase collections and engage customers. Built using a responsive frontend stack without backend integration.",
  image: "/assets/images/daunku.png",
  technologies: ["React.js", "Tailwind CSS", "Framer Motion"],
  liveUrl: "https://daunku.com",
  githubUrl: "https://github.com/yourusername/daunku",
  featured: false,
  category: "Frontend",
}

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
