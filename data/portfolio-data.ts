import {
  FaReact, FaNodeJs, FaJava, FaPython, FaGitAlt, FaGithub,
  FaHtml5, FaCss3Alt, FaPhp, FaAndroid, FaGoogle, FaLinkedin,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaGraduationCap,
  FaLaptopCode, FaCloud, FaBrain, FaCode, FaServer,
  FaMobileAlt, FaDatabase, FaTools
} from 'react-icons/fa';
import {
  SiNextdotjs, SiTailwindcss, SiTypescript, SiJavascript,
  SiMongodb, SiExpress, SiMysql, SiPostgresql,
  SiKotlin, SiSpringboot, SiPostman,
  SiAndroidstudio, SiGooglecloud, SiStripe, SiJsonwebtokens,
  SiNodedotjs
} from 'react-icons/si';
import { IconType } from 'react-icons';

// ─── Personal Info ─────────────────────────────────────────────
export const personalInfo = {
  name: 'Sandun Dimantha',
  title: 'Full Stack Developer',
  subtitle: 'IT Undergraduate at SLIIT',
  location: 'Colombo, Sri Lanka',
  university: 'Sri Lanka Institute of Information Technology (SLIIT)',
  degree: 'BSc (Hons) Information Technology',
  year: '3rd Year Undergraduate',
  email: 'sandundimantha2002@gmail.com',
  phone: '+94 70 441 5497',
  github: 'https://github.com/sandundimantha',
  githubUsername: 'sandundimantha',
  linkedin: 'https://www.linkedin.com/in/sandun-dimantha-215559320',
  about: `I am a passionate Full Stack Developer and third-year Information Technology undergraduate at SLIIT. I have experience building MERN stack applications, Android applications, management systems, and cloud-based solutions. I continuously improve my skills through hands-on projects, certifications, and modern software engineering practices. My goal is to become a professional Software Engineer specializing in Full Stack Development, Cloud Computing, and AI-powered applications.`,
  typingTexts: [
    'MERN Stack Developer',
    'Cloud Enthusiast',
    'AI/ML Learner',
    'Software Engineer',
  ],
  stats: [
    { label: 'Projects Completed', value: 10, suffix: '+' },
    { label: 'Certificates Earned', value: 8, suffix: '+' },
    { label: 'Technologies Learned', value: 20, suffix: '+' },
    { label: 'Years of Learning', value: 3, suffix: '+' },
  ],
};

// ─── Career Goals ──────────────────────────────────────────────
export const careerGoals = [
  {
    icon: FaLaptopCode,
    title: 'Software Engineering Internship',
    description: 'Seeking hands-on industry experience at a leading tech company to apply and grow my skills.',
  },
  {
    icon: FaCloud,
    title: 'Cloud Computing',
    description: 'Building expertise in cloud architecture, DevOps, and scalable infrastructure on Google Cloud.',
  },
  {
    icon: FaBrain,
    title: 'AI & Machine Learning',
    description: 'Exploring intelligent systems, natural language processing, and data-driven applications.',
  },
  {
    icon: FaCode,
    title: 'Full Stack Development',
    description: 'Mastering end-to-end web development with modern frameworks and best practices.',
  },
];

// ─── Tech Stack ────────────────────────────────────────────────
export interface TechItem {
  name: string;
  icon: IconType;
  color: string;
}

export const techStack: TechItem[] = [
  { name: 'React', icon: FaReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
  { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'Java', icon: FaJava, color: '#ED8B00' },
  { name: 'Spring Boot', icon: SiSpringboot, color: '#6DB33F' },
  { name: 'Python', icon: FaPython, color: '#3776AB' },
  { name: 'Google Cloud', icon: SiGooglecloud, color: '#4285F4' },
  { name: 'Kotlin', icon: SiKotlin, color: '#7F52FF' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
];

// ─── Skills ────────────────────────────────────────────────────
export interface Skill {
  name: string;
  level: number; // 0-100
  icon: IconType;
}

export interface SkillCategory {
  title: string;
  icon: IconType;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: FaReact,
    skills: [
      { name: 'React', level: 90, icon: FaReact },
      { name: 'Next.js', level: 80, icon: SiNextdotjs },
      { name: 'Tailwind CSS', level: 85, icon: SiTailwindcss },
      { name: 'HTML', level: 95, icon: FaHtml5 },
      { name: 'CSS', level: 90, icon: FaCss3Alt },
      { name: 'JavaScript', level: 90, icon: SiJavascript },
      { name: 'TypeScript', level: 75, icon: SiTypescript },
    ],
  },
  {
    title: 'Backend',
    icon: FaServer,
    skills: [
      { name: 'Node.js', level: 88, icon: FaNodeJs },
      { name: 'Express.js', level: 85, icon: SiExpress },
      { name: 'Java', level: 80, icon: FaJava },
      { name: 'Spring Boot', level: 70, icon: SiSpringboot },
      { name: 'PHP', level: 65, icon: FaPhp },
    ],
  },
  {
    title: 'Mobile',
    icon: FaMobileAlt,
    skills: [
      { name: 'Android', level: 75, icon: FaAndroid },
      { name: 'Kotlin', level: 72, icon: SiKotlin },
    ],
  },
  {
    title: 'Database',
    icon: FaDatabase,
    skills: [
      { name: 'MongoDB', level: 88, icon: SiMongodb },
      { name: 'MySQL', level: 80, icon: SiMysql },
      { name: 'PostgreSQL', level: 70, icon: SiPostgresql },
    ],
  },
  {
    title: 'Cloud',
    icon: FaCloud,
    skills: [
      { name: 'Google Cloud', level: 75, icon: SiGooglecloud },
    ],
  },
  {
    title: 'Tools',
    icon: FaTools,
    skills: [
      { name: 'Git', level: 90, icon: FaGitAlt },
      { name: 'GitHub', level: 90, icon: FaGithub },
      { name: 'VS Code', level: 92, icon: FaCode },
      { name: 'Postman', level: 85, icon: SiPostman },
      { name: 'Android Studio', level: 75, icon: SiAndroidstudio },
    ],
  },
];

// ─── Experience ────────────────────────────────────────────────
export const experiences = [
  {
    type: 'Freelance Projects',
    icon: FaLaptopCode,
    period: '2024 – Present',
    description: 'Developed custom web applications for clients including tourism platforms, food ordering systems, and e-commerce stores using the MERN stack.',
    highlights: ['MERN Stack', 'Client Projects', 'Full Stack'],
  },
  {
    type: 'Academic Projects',
    icon: FaGraduationCap,
    period: '2024 – Present',
    description: 'Completed multiple team and individual projects at SLIIT covering web development, mobile applications, and cloud computing.',
    highlights: ['Team Collaboration', 'Agile', 'Code Reviews'],
  },
  {
    type: 'Open Source Contributions',
    icon: FaGithub,
    period: '2024 – Present',
    description: 'Active on GitHub with public repositories, contributing to open-source projects and maintaining personal project codebases.',
    highlights: ['GitHub', 'Open Source', 'Version Control'],
  },
];

// ─── Projects ──────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  challenges: string;
  technologies: string[];
  techIcons: IconType[];
  github?: string;
  liveDemo?: string;
  featured: boolean;
  tags: string[];
  image: string;
}

export const projects: Project[] = [
  {
    id: 'serendibgo',
    title: 'SerendibGo Tourism Management System',
    description: 'A complete tourism booking platform for hotels, vehicles, guides, and travel packages.',
    longDescription: 'Developed a comprehensive tourism management system that enables tourists to book hotels, hire vehicles, find local guides, and purchase travel packages — all in one platform. Features include secure payment processing via Stripe, JWT-based authentication, automated email notifications, and a full admin dashboard.',
    problem: 'Sri Lanka\'s tourism industry lacked a unified digital platform for booking multiple travel services. Tourists had to use separate websites for hotels, vehicles, and guides, leading to a fragmented experience.',
    solution: 'Built a full-stack MERN application with an integrated booking engine covering hotels, vehicles, guides, and packages. Implemented Stripe for secure payments, JWT for auth, and Nodemailer for automated confirmations.',
    challenges: 'Integrating multiple booking modules with different data models into a unified system was complex. Managing real-time availability across services and ensuring secure payment flow with Stripe required careful architecture and error handling.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe API', 'JWT', 'Nodemailer'],
    techIcons: [FaReact, SiNodedotjs, SiExpress, SiMongodb, SiStripe, SiJsonwebtokens],
    github: 'https://github.com/sandundimantha',
    liveDemo: 'https://serendib-go-travel.vercel.app',
    featured: true,
    tags: ['MERN', 'Web'],
    image: '/projects/serendibgo.png',
  },
  {
    id: 'food-ordering',
    title: 'Food Ordering System',
    description: 'Full-stack food ordering application with responsive design and order management.',
    longDescription: 'A modern food ordering application that allows customers to browse menus, add items to cart, place orders, and track delivery status. Includes a restaurant admin panel for managing menus, orders, and customer data.',
    problem: 'Local restaurants needed a digital ordering solution that was easy to use for both customers and restaurant staff, without relying on expensive third-party delivery platforms.',
    solution: 'Created a full-stack application with React frontend for seamless ordering UX and Node.js/Express backend with MongoDB for data persistence. Implemented real-time order status updates and a responsive design for mobile users.',
    challenges: 'Building a responsive cart system that persists across sessions and implementing real-time order tracking without WebSockets (using polling) were significant challenges that required creative solutions.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    techIcons: [FaReact, SiNodedotjs, SiExpress, SiMongodb],
    github: 'https://github.com/sandundimantha',
    featured: true,
    tags: ['MERN', 'Web'],
    image: '/projects/food-ordering.png',
  },
  {
    id: 'park-pal',
    title: 'Park Pal Swift',
    description: 'Parking management system with slot booking and admin dashboard.',
    longDescription: 'A smart parking management system that enables users to find and book available parking slots in real-time. Features an admin dashboard for managing parking zones, monitoring occupancy, and generating reports.',
    problem: 'Urban parking management was inefficient, with drivers wasting time searching for available spots and parking lot operators lacking digital tools to manage their spaces.',
    solution: 'Built an interactive web application with real-time slot availability visualization, automated booking confirmation, and an admin dashboard for parking lot management and analytics.',
    challenges: 'Designing an intuitive UI that represents parking slot layouts visually and implementing real-time availability updates without complex backend infrastructure were key challenges.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    techIcons: [FaHtml5, FaCss3Alt, SiJavascript],
    github: 'https://github.com/sandundimantha',
    featured: true,
    tags: ['Web'],
    image: '/projects/park-pal.png',
  },
  {
    id: 'exam-system',
    title: 'Online Examination System',
    description: 'Android application providing MCQ exams and automated evaluation.',
    longDescription: 'An Android-based examination platform that allows students to take MCQ tests, receive instant results, and track their progress over time. Teachers can create question banks and manage exams through the app.',
    problem: 'Conducting and evaluating examinations manually was time-consuming for educators and lacked instant feedback for students.',
    solution: 'Developed a native Android app using Kotlin with local database storage for question banks, timed exam sessions, and automated scoring with detailed result analytics.',
    challenges: 'Implementing a reliable timer system for exams and ensuring offline functionality for areas with poor connectivity required thoughtful state management in Kotlin.',
    technologies: ['Kotlin', 'Android'],
    techIcons: [SiKotlin, FaAndroid],
    github: 'https://github.com/sandundimantha',
    featured: false,
    tags: ['Android'],
    image: '/projects/exam-system.png',
  },
  {
    id: 'wellness-app',
    title: 'Wellness App',
    description: 'Health and wellness tracking application.',
    longDescription: 'A comprehensive health tracking Android application that helps users monitor their daily wellness metrics including water intake, exercise, sleep patterns, and mental health check-ins.',
    problem: 'Many people struggle to maintain consistent health habits without a simple, unified tracking tool on their mobile device.',
    solution: 'Built a Kotlin-based Android app with intuitive dashboards for tracking multiple health metrics, daily reminders, and progress visualization with charts.',
    challenges: 'Designing an engaging UI that encourages daily usage and implementing local data persistence with efficient charting libraries were the main technical challenges.',
    technologies: ['Kotlin', 'Android'],
    techIcons: [SiKotlin, FaAndroid],
    github: 'https://github.com/sandundimantha',
    featured: false,
    tags: ['Android'],
    image: '/projects/wellness-app.png',
  },
  {
    id: 'spare-parts',
    title: 'Online Computer Spare Parts Store',
    description: 'Online platform for computer hardware sales and inventory management.',
    longDescription: 'An e-commerce platform specializing in computer spare parts, featuring product catalog, search functionality, shopping cart, and inventory management for store administrators.',
    problem: 'Local computer hardware retailers needed an online presence to reach more customers and manage inventory digitally.',
    solution: 'Developed a full e-commerce web application with product categorization, search and filter capabilities, shopping cart, and an admin panel for inventory and order management.',
    challenges: 'Building a robust product search with multiple filters and implementing a secure checkout flow while maintaining good performance with large product catalogs.',
    technologies: ['E-Commerce', 'Web Development'],
    techIcons: [FaCode, FaServer],
    github: 'https://github.com/sandundimantha',
    featured: false,
    tags: ['Web'],
    image: '/projects/spare-parts.png',
  },
];

// ─── Certificates ──────────────────────────────────────────────
export interface Certificate {
  title: string;
  issuer: string;
  category: 'Cloud' | 'AI' | 'Programming' | 'Project Management';
  image?: string;
  file?: string;
}

export const certificates: Certificate[] = [
  {
    title: 'AI/ML Engineer Stage 1',
    issuer: 'SLIIT Centre for Open and Distance Education (CODE)',
    category: 'AI',
    image: '/certificates/aiml_stage1.png',
    file: '/certificates/K.A. Sandun Dimantha Kuruppu - 2026-01-12.pdf',
  },
  {
    title: 'AI/ML Engineer Stage 2',
    issuer: 'SLIIT Centre for Open and Distance Education (CODE)',
    category: 'AI',
    image: '/certificates/aiml_stage2.png',
    file: '/certificates/K.A. Sandun Dimantha Kuruppu - 2026-01-13.pdf',
  },
  {
    title: 'Google Cloud Digital Leader',
    issuer: 'Google Cloud',
    category: 'Cloud',
    image: '/certificates/LBJD9ZJMPZHE.png',
    file: '/certificates/LBJD9ZJMPZHE.pdf',
  },
  {
    title: 'Digital Transformation with Google Cloud',
    issuer: 'Google Cloud / Coursera',
    category: 'Cloud',
  },
  {
    title: 'Security Principles in Cloud Computing',
    issuer: 'Google Cloud / Coursera',
    category: 'Cloud',
  },
  {
    title: 'MongoDB Data Modeling Path',
    issuer: 'MongoDB University',
    category: 'Programming',
    image: '/certificates/it23827080-kuruppu-k-a-s-d-0a04898c-f3fc-4222-931b-e6c26f6509ac-certificate.png',
    file: '/certificates/it23827080-kuruppu-k-a-s-d-0a04898c-f3fc-4222-931b-e6c26f6509ac-certificate.pdf',
  },
  {
    title: 'MongoDB Node.js Developer Path',
    issuer: 'MongoDB University',
    category: 'Programming',
    image: '/certificates/it23827080-kuruppu-k-a-s-d-92b2586a-ebcb-4120-93ee-548e7caa69e3-certificate.png',
    file: '/certificates/it23827080-kuruppu-k-a-s-d-92b2586a-ebcb-4120-93ee-548e7caa69e3-certificate.pdf',
  },
  {
    title: 'MongoDB PHP Developer Path',
    issuer: 'MongoDB University',
    category: 'Programming',
    image: '/certificates/it23827080-kuruppu-k-a-s-d-911d0fd2-4e80-45d7-819e-f78fc146f9e4-certificate.png',
    file: '/certificates/it23827080-kuruppu-k-a-s-d-911d0fd2-4e80-45d7-819e-f78fc146f9e4-certificate.pdf',
  },
  {
    title: 'MongoDB Python Developer Path',
    issuer: 'MongoDB University',
    category: 'Programming',
    image: '/certificates/it23827080-kuruppu-k-a-s-d.png',
    file: '/certificates/it23827080-kuruppu-k-a-s-d.pdf',
  },
  {
    title: 'Connecting to MongoDB in C#',
    issuer: 'MongoDB University',
    category: 'Programming',
    image: '/certificates/it23827080-kuruppu-k-a-s-d-d5f670d0-35d1-4d38-8dd5-278f441a8832-certificate.png',
    file: '/certificates/it23827080-kuruppu-k-a-s-d-d5f670d0-35d1-4d38-8dd5-278f441a8832-certificate.pdf',
  },
  {
    title: 'Python for Beginners',
    issuer: 'University of Moratuwa',
    category: 'Programming',
    image: '/certificates/Python_for_Beginners_E-Certificate.png',
    file: '/certificates/Python_for_Beginners_E-Certificate.pdf',
  },
  {
    title: 'Project Scope & Schedule Management',
    issuer: 'Coursera',
    category: 'Project Management',
    image: '/certificates/Project_Scope_and_Schedule_Management_E-Certificate.png',
    file: '/certificates/Project_Scope_and_Schedule_Management_E-Certificate.pdf',
  },
  {
    title: 'Foundations of Project Management',
    issuer: 'Google / Coursera',
    category: 'Project Management',
    image: '/certificates/Foundations_of_Project_Management_E-Certificate.png',
    file: '/certificates/Foundations_of_Project_Management_E-Certificate.pdf',
  },
];

export const certificateCategories = ['All', 'Cloud', 'AI', 'Programming', 'Project Management'] as const;

// ─── Achievement Badges ────────────────────────────────────────
export const achievementBadges = [
  { title: 'Google Cloud Learner', icon: SiGooglecloud, color: '#4285F4' },
  { title: 'AI/ML Engineer', icon: FaBrain, color: '#8B5CF6' },
  { title: 'Python Certified', icon: FaPython, color: '#3776AB' },
  { title: 'Project Management', icon: FaGraduationCap, color: '#06B6D4' },
];

// ─── Education Timeline ────────────────────────────────────────
export const educationTimeline = [
  {
    year: '2024',
    title: 'Started BSc (Hons) IT at SLIIT',
    description: 'Began undergraduate studies in Information Technology at Sri Lanka Institute of Information Technology.',
    icon: FaGraduationCap,
  },
  {
    year: '2025',
    title: 'Completed Major MERN Projects',
    description: 'Built multiple full-stack web applications using the MERN stack, gaining hands-on development experience.',
    icon: FaCode,
  },
  {
    year: '2025',
    title: 'Built SerendibGo Tourism Platform',
    description: 'Developed a comprehensive tourism management system as a flagship project, deployed on Vercel.',
    icon: FaLaptopCode,
  },
  {
    year: '2026',
    title: 'Completed AI/ML Certifications',
    description: 'Earned Google Cloud Digital Leader, AI/ML Engineer certifications and expanded cloud computing knowledge.',
    icon: FaBrain,
  },
  {
    year: '2026',
    title: 'Preparing for Software Engineering Internship',
    description: 'Actively seeking internship opportunities in software engineering to gain industry experience.',
    icon: FaGoogle,
  },
];

// ─── Navigation Links ─────────────────────────────────────────
export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#featured-projects' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'GitHub', href: '#github' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

// ─── Social Links ──────────────────────────────────────────────
export const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/sandundimantha', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/sandun-dimantha-215559320', label: 'LinkedIn' },
  { icon: FaEnvelope, href: 'mailto:sandundimantha2002@gmail.com', label: 'Email' },
];

// ─── Contact Info Cards ────────────────────────────────────────
export const contactInfo = [
  { icon: FaEnvelope, label: 'Email', value: 'sandundimantha2002@gmail.com', href: 'mailto:sandundimantha2002@gmail.com' },
  { icon: FaPhone, label: 'Phone', value: '+94 70 441 5497', href: 'tel:+94704415497' },
  { icon: FaGithub, label: 'GitHub', value: 'sandundimantha', href: 'https://github.com/sandundimantha' },
  { icon: FaLinkedin, label: 'LinkedIn', value: 'Sandun Dimantha', href: 'https://www.linkedin.com/in/sandun-dimantha-215559320' },
  { icon: FaMapMarkerAlt, label: 'Location', value: 'Colombo, Sri Lanka', href: '#' },
];

// ─── Command Palette Items ─────────────────────────────────────
export const commandPaletteItems = [
  { label: 'About Me', href: '#about', section: 'Sections' },
  { label: 'Career Goals', href: '#career-goals', section: 'Sections' },
  { label: 'Tech Stack', href: '#tech-stack', section: 'Sections' },
  { label: 'Skills', href: '#skills', section: 'Sections' },
  { label: 'Experience', href: '#experience', section: 'Sections' },
  { label: 'Featured Projects', href: '#featured-projects', section: 'Sections' },
  { label: 'All Projects', href: '#all-projects', section: 'Sections' },
  { label: 'Certificates', href: '#certificates', section: 'Sections' },
  { label: 'GitHub', href: '#github', section: 'Sections' },
  { label: 'Education', href: '#education', section: 'Sections' },
  { label: 'Contact', href: '#contact', section: 'Sections' },
  ...projects.map(p => ({ label: p.title, href: `#project-${p.id}`, section: 'Projects' })),
  ...certificates.map(c => ({ label: c.title, href: '#certificates', section: 'Certificates' })),
];

// ─── Floating Badges (Hero) ───────────────────────────────────
export const floatingBadges = [
  { name: 'React', icon: FaReact, color: '#61DAFB' },
  { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'Java', icon: FaJava, color: '#ED8B00' },
  { name: 'Python', icon: FaPython, color: '#3776AB' },
  { name: 'Google Cloud', icon: SiGooglecloud, color: '#4285F4' },
];

// ─── Project Tags ──────────────────────────────────────────────
export const projectTags = ['All', 'MERN', 'Web', 'Android'] as const;
