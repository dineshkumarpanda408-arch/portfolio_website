export interface Project {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
  featured: boolean;
  achievements: string[];
  metrics?: string;
}

export interface MobileAppShowcase {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  screenImage: string;
  features: string[];
  githubUrl?: string;
  appStoreUrl?: string;
}

export interface WebDevShowcase {
  id: string;
  title: string;
  url: string;
  description: string;
  techStack: string[];
  image: string;
  githubUrl: string;
  liveUrl?: string;
}

export interface AnimationShowcaseItem {
  id: string;
  title: string;
  category: 'Blender 3D Animation' | '3D WebGL' | 'UI Micro-Interaction' | 'Vector Motion' | 'Shader Effect';
  description: string;
  previewType: 'interactive-tilt' | 'magnetic-button' | 'cursor-glow' | 'floating-cube';
}

export interface Skill {
  id: string;
  name: string;
  category: 'Language' | 'Frontend' | 'Backend' | 'AI/ML' | 'Database' | 'Tools';
  proficiency: number;
  color: string;
  experience: string;
  projectsUsedIn: string[];
  description: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  details: string;
}

export interface Achievement {
  id: string;
  title: string;
  category: 'Hackathon' | 'Certification' | 'Award' | 'Academics' | 'Leadership';
  issuer: string;
  date: string;
  description: string;
  badge: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  conference: string;
  date: string;
  abstract: string;
  topics: string[];
  pdfUrl?: string;
  citations?: number;
  status: string;
}

export interface PortfolioConfig {
  profile: {
    name: string;
    titles: string[];
    typewriterPhrases: string[];
    bio: string;
    summary: string;
    location: string;
    email: string;
    phone: string;
    photoUrl: string;
    resumeUrl: string;
    socials: {
      github: string;
      linkedin: string;
      email: string;
    };
  };
  education: EducationItem[];
  projects: Project[];
  mobileApps: MobileAppShowcase[];
  webDevShowcases: WebDevShowcase[];
  animationItems: AnimationShowcaseItem[];
  skills: Skill[];
  achievements: Achievement[];
  research: ResearchPaper[];
  contact: {
    email: string;
    phone: string;
    location: string;
    socials: {
      github: string;
      linkedin: string;
      email: string;
    };
  };
  aiAssistant: {
    name: string;
    greetings: string[];
    faq: { question: string; answer: string }[];
  };
}

export const portfolioConfig: PortfolioConfig = {
  profile: {
    name: "DINESH KUMAR PANDA",
    titles: [
      "Full-Stack MERN Developer",
      "AI Tools & Mobile Engineer",
      "CS Student @ NIST University",
      "C++ / Java / Python / Dart",
      "DSA & Database Systems"
    ],
    typewriterPhrases: [
      "Full-Stack MERN Developer",
      "AI & Mobile App Developer",
      "B.Tech CS @ NIST University",
      "DSA & DBMS Enthusiast"
    ],
    bio: "Computer Science student (B.Tech, NIST University) building full-stack MERN applications, AI-integrated tools, and Flutter mobile apps.",
    summary: "Computer Science student (B.Tech, NIST University) with hands-on experience building full-stack MERN applications and AI-integrated tools. Proficient in C, C++, Java, Python, Dart/Flutter, JavaScript, DSA, and DBMS. Recent work includes a production-deployed role-based complaint management system and multiple AI-powered applications.",
    location: "Berhampur, Odisha, India",
    email: "dineshkumarpanda408@gmail.com",
    phone: "+91 7978429299",
    photoUrl: "/dinesh-profile.jpg",
    resumeUrl: "#download-resume",
    socials: {
      github: "https://github.com/dineshkumarpanda408-arch",
      linkedin: "https://linkedin.com/in/dinesh-kumar-panda-a4a22b334",
      email: "mailto:dineshkumarpanda408@gmail.com"
    }
  },

  education: [
    {
      id: "edu-btech",
      degree: "B.Tech in Computer Science and Engineering",
      institution: "NIST University",
      location: "Berhampur, Odisha",
      period: "2024 – 2028",
      details: "Focusing on Full-Stack MERN Development, Data Structures & Algorithms, AI API Integrations, and Database Management Systems."
    },
    {
      id: "edu-chse",
      degree: "Higher Secondary Education (Science)",
      institution: "Khallikote Higher Secondary School",
      location: "Berhampur, Odisha",
      period: "2022 – 2024",
      details: "Specialized in Physics, Chemistry, Mathematics, and Computer Science foundation."
    },
    {
      id: "edu-10th",
      degree: "Secondary School (10th Grade)",
      institution: "Maa Saraswati Vidya Mandir",
      location: "Berhampur, Odisha",
      period: "2022",
      details: "Completed secondary education with top honors."
    }
  ],

  projects: [
    {
      id: "smart-campus",
      title: "Smart Campus Complaint Management System",
      shortDesc: "Production-deployed role-based complaint management platform for NIST University.",
      fullDesc: "Built a full-stack, production-deployed complaint management platform for NIST University with role-based access across student, faculty, staff, department head, and admin roles. Implemented complaint tracking with SLA-based auto-escalation and real-time notifications to keep resolution times accountable. Resolved production issues including authentication context state and route security gaps.",
      techStack: ["MERN", "Express", "TypeScript", "Sequelize", "MySQL", "React", "Vite", "Render"],
      githubUrl: "https://github.com/dineshkumarpanda408-arch/smart-campus-complaint-main-from-laptop",
      liveUrl: "https://smart-campus-complaint.onrender.com",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
      featured: true,
      metrics: "Live Deployed on Render for NIST University",
      achievements: [
        "Production deployed for NIST University across 5 user roles",
        "SLA-based auto-escalation & real-time notification engine",
        "Resolved Auth Context race conditions & route-level security gaps"
      ]
    },
    {
      id: "finshe-backend",
      title: "FinShe Financial & Safety Backend API",
      shortDesc: "High-performance Node.js REST API serving financial empowerment & safety tracking.",
      fullDesc: "Engineered a secure Node.js & Express backend REST API for FinShe financial management and safety platform. Features JWT authentication, secure MongoDB data modeling, transaction auditing, and real-time distress alert notification pipelines.",
      techStack: ["Node.js", "Express", "MongoDB", "JWT", "REST API"],
      githubUrl: "https://github.com/dineshkumarpanda408-arch/finshe-backend",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800",
      featured: true,
      metrics: "Secure RESTful Microservice",
      achievements: [
        "JWT role-based token authentication & encrypted password hashing",
        "Transaction logging & real-time distress alert notification pipelines",
        "High-throughput MongoDB schema optimization"
      ]
    },
    {
      id: "transitops-platform",
      title: "TransitOps Smart Transport Operations Platform",
      shortDesc: "Intelligent transport operations management & fleet tracking platform.",
      fullDesc: "Collaborative smart transit management platform optimizing public bus route dispatches, fleet vehicle tracking, driver shift management, and operational telemetry analytics for transit hubs.",
      techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      githubUrl: "https://github.com/AshXtreme/TransitOps-Smart-Transport-Operations-Platform",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800",
      featured: true,
      metrics: "Fleet Route & Dispatch Analytics",
      achievements: [
        "Interactive route planning & vehicle telemetry monitoring",
        "Driver schedule optimization & real-time alert triage",
        "Modular React frontend & Express API architecture"
      ]
    },
    {
      id: "nist-campus-admin",
      title: "NIST Smart Campus Admin Dashboard",
      shortDesc: "Modern React.js admin portal enabling university department heads to triage complaints.",
      fullDesc: "Developed an interactive React.js administration web portal allowing NIST University department heads and campus admins to monitor live complaint volumes, track SLA escalation timers, manage technician assignments, and export analytical reports.",
      techStack: ["React.js", "JavaScript", "Tailwind CSS", "Axios", "Recharts"],
      githubUrl: "https://github.com/ruvantex/nist-smart-campus-admin-reactjs",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      featured: false,
      metrics: "Role-Based Admin Triage Dashboard",
      achievements: [
        "Real-time SLA resolution countdowns & complaint status charts",
        "Department-level ticket assignment & audit history logging"
      ]
    },
    {
      id: "nist-campus-back",
      title: "NIST Smart Campus Backend Engine",
      shortDesc: "Scalable Node.js & Express microservice powering campus complaint workflows.",
      fullDesc: "Built the core backend service handling authentication middleware, Sequelize MySQL ORM models, SLA auto-escalation cron triggers, and complaint ticket state transitions for NIST University.",
      techStack: ["Node.js", "Express", "Sequelize", "MySQL", "Postman"],
      githubUrl: "https://github.com/ruvantex/nist-smart-campus-back-nodejs",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
      featured: false,
      metrics: "Node.js & Sequelize Backend",
      achievements: [
        "Automated SLA ticket escalation background scheduler",
        "Clean Postman API documentation & route security middleware"
      ]
    },
    {
      id: "bmi-calculator",
      title: "BMI & Health Metrics Calculator",
      shortDesc: "Interactive health metrics calculator tracking body mass index & body composition.",
      fullDesc: "Built a sleek mobile and web health metrics app computing Body Mass Index (BMI), body fat estimates, and healthy target ranges with dynamic visual gauge indicators.",
      techStack: ["Flutter", "Dart", "JavaScript", "CSS3"],
      githubUrl: "https://github.com/dineshkumarpanda408-arch/BMI",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800",
      featured: false,
      metrics: "Cross-Platform Health App",
      achievements: [
        "Interactive gauge visualization & metric/imperial unit conversion",
        "Personalized body composition classification breakdown"
      ]
    },
    {
      id: "3d-portfolio",
      title: "3D Interactive Portfolio Website",
      shortDesc: "Interactive 3D WebGL floating island portfolio featuring Blender 3D animations & AI assistant.",
      fullDesc: "Designed and built an interactive 3D WebGL developer portfolio using React, Vite, Three.js, React Three Fiber, Framer Motion, and Tailwind CSS. Features 3D floating island ecosystems, particle shaders, sound FX, and command palette navigation.",
      techStack: ["React", "Vite", "Three.js", "R3F", "Framer Motion", "Tailwind CSS"],
      githubUrl: "https://github.com/dineshkumarpanda408-arch/portfolio_website",
      liveUrl: "https://portfolio-website-o9ll.onrender.com",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
      featured: false,
      metrics: "Production Deployed on Render",
      achievements: [
        "Interactive 3D Floating Island camera navigation",
        "Custom particle GLSL shaders & Blender 3D animations",
        "Integrated AI Drone Assistant & command palette"
      ]
    }
  ],

  mobileApps: [
    {
      id: "app-bmi",
      title: "BMI & Health Metrics Calculator",
      subtitle: "Flutter & Mobile Health Application",
      description: "Computes Body Mass Index, body composition estimates, and healthy target ranges with interactive visual gauge indicators.",
      techStack: ["Flutter", "Dart", "JavaScript", "CSS3"],
      screenImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=600",
      features: ["Metric & Imperial Unit Conversion", "Body Fat Composition Breakdown", "Interactive Gauge Visuals", "Health Recommendations"],
      githubUrl: "https://github.com/dineshkumarpanda408-arch/BMI"
    }
  ],

  webDevShowcases: [
    {
      id: "web-smart-campus",
      title: "Smart Campus Complaint Platform",
      url: "smart-campus-complaint.onrender.com",
      description: "MERN Stack complaint resolution platform with 5 user roles, SLA auto-escalation, and live Render deployment.",
      techStack: ["React", "Express", "TypeScript", "Sequelize", "MySQL", "Render"],
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
      githubUrl: "https://github.com/dineshkumarpanda408-arch/smart-campus-complaint-main-from-laptop",
      liveUrl: "https://smart-campus-complaint.onrender.com"
    },
    {
      id: "web-finshe",
      title: "FinShe Financial & Safety API",
      url: "github.com/dineshkumarpanda408-arch/finshe-backend",
      description: "High-performance Node.js & Express REST API for FinShe financial management and safety platform.",
      techStack: ["Node.js", "Express", "MongoDB", "JWT"],
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800",
      githubUrl: "https://github.com/dineshkumarpanda408-arch/finshe-backend"
    },
    {
      id: "web-transitops",
      title: "TransitOps Smart Transport Operations",
      url: "github.com/AshXtreme/TransitOps-Smart-Transport-Operations-Platform",
      description: "Intelligent transportation operations management & public bus fleet tracking platform.",
      techStack: ["React", "Node.js", "Express", "MongoDB"],
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800",
      githubUrl: "https://github.com/AshXtreme/TransitOps-Smart-Transport-Operations-Platform"
    },
    {
      id: "web-3d-portfolio",
      title: "3D Floating Island Portfolio",
      url: "portfolio-website-o9ll.onrender.com",
      description: "Interactive 3D WebGL developer portfolio featuring Blender 3D animations and AI assistant.",
      techStack: ["React", "Vite", "Three.js", "R3F", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
      githubUrl: "https://github.com/dineshkumarpanda408-arch/portfolio_website",
      liveUrl: "https://portfolio-website-o9ll.onrender.com"
    }
  ],

  animationItems: [
    {
      id: "anim-blender-3d",
      title: "Blender 3D Asset Modeling & Animation",
      category: "Blender 3D Animation",
      description: "Custom Blender 3D modeling, rigging, keyframe animation, and lighting setups exported for WebGL interactive rendering.",
      previewType: "floating-cube"
    },
    {
      id: "anim-3d-keyboard",
      title: "Commercial Blender 3D Keyboard Hero",
      category: "3D WebGL",
      description: "Interactive R3F 3D mechanical keyboard modeled in Blender with scroll-driven key depress, illuminated switches, and camera retreat.",
      previewType: "interactive-tilt"
    },
    {
      id: "anim-magnetic-btn",
      title: "Magnetic Liquid Button Micro-Interactions",
      category: "UI Micro-Interaction",
      description: "Physics-based magnetic button hover effect pulling cursor vectors smoothly towards targets.",
      previewType: "magnetic-button"
    },
    {
      id: "anim-cursor-glow",
      title: "Spotlight Cursor Radial Glow Shaders",
      category: "Shader Effect",
      description: "Custom GLSL/CSS radial mouse light follow shader revealing dark glass card textures.",
      previewType: "cursor-glow"
    }
  ],

  skills: [
    {
      id: "cpp-java-python",
      name: "C / C++ / Java / Python",
      category: "Language",
      proficiency: 95,
      color: "#3776AB",
      experience: "Core Languages",
      projectsUsedIn: ["DSA Implementations", "AI Tooling", "Problem Solving"],
      description: "Proficient in core programming languages, Object-Oriented Programming (OOP), and algorithmic problem solving."
    },
    {
      id: "javascript-dart",
      name: "JavaScript & Dart",
      category: "Language",
      proficiency: 94,
      color: "#F7DF1E",
      experience: "Web & Mobile",
      projectsUsedIn: ["Smart Campus MERN", "AI Scholarship App"],
      description: "Modern ES6+ JavaScript, TypeScript, and Dart for cross-platform app engineering."
    },
    {
      id: "react-vite-tailwind",
      name: "React, Vite & Tailwind CSS",
      category: "Frontend",
      proficiency: 95,
      color: "#61DAFB",
      experience: "Frontend Stack",
      projectsUsedIn: ["Smart Campus Complaint", "3D Floating Portfolio"],
      description: "Modern frontend web development with React custom hooks, Vite build optimization, and Tailwind CSS."
    },
    {
      id: "node-express",
      name: "Node.js & Express",
      category: "Backend",
      proficiency: 92,
      color: "#339933",
      experience: "Backend MERN",
      projectsUsedIn: ["Smart Campus Complaint System"],
      description: "RESTful API design, middleware security, role-based auth, Sequelize ORM, and Postman testing."
    },
    {
      id: "flutter",
      name: "Flutter & Mobile Dev",
      category: "Tools",
      proficiency: 90,
      color: "#02569B",
      experience: "Mobile Apps",
      projectsUsedIn: ["AI Scholarship Suggestion App"],
      description: "Building cross-platform iOS & Android mobile applications with Flutter state management and API integration."
    },
    {
      id: "mysql-mongodb",
      name: "MySQL & MongoDB (DBMS)",
      category: "Database",
      proficiency: 92,
      color: "#4479A1",
      experience: "Database Systems",
      projectsUsedIn: ["Smart Campus MySQL", "Waste Management System"],
      description: "Relational database design (MySQL), NoSQL schema modeling (MongoDB), indexing, and query optimization."
    },
    {
      id: "dsa",
      name: "Data Structures & Algorithms",
      category: "Tools",
      proficiency: 94,
      color: "#9D4EDD",
      experience: "Core CS",
      projectsUsedIn: ["SLA Escalations", "Eligibility Matching"],
      description: "Arrays, Linked Lists, Trees, Graphs, Sorting, Searching, Dynamic Programming, and complexity analysis."
    },
    {
      id: "ai-api",
      name: "AI API Integration",
      category: "AI/ML",
      proficiency: 93,
      color: "#00F2FE",
      experience: "AI Application Dev",
      projectsUsedIn: ["AI Scholarship App", "AI Book Summarizer"],
      description: "Integrating Gemini / OpenAI APIs for document summarization, eligibility recommendation, and automated quiz generation."
    }
  ],

  achievements: [
    {
      id: "nist-campus-deployment",
      title: "Production Deployment @ NIST University",
      category: "Academics",
      issuer: "NIST University, Berhampur",
      date: "2025",
      description: "Successfully built & deployed a role-based complaint management system serving students, faculty, staff, and admins.",
      badge: "🚀 Production Deployment"
    },
    {
      id: "btech-cs-nist",
      title: "B.Tech Computer Science & Engineering",
      category: "Academics",
      issuer: "NIST University, Berhampur",
      date: "2024 – 2028",
      description: "Pursuing Bachelor of Technology in CS with focus on MERN Stack, DSA, DBMS, and AI Application Development.",
      badge: "🎓 B.Tech Candidate"
    },
    {
      id: "khallikote-science",
      title: "Higher Secondary Science Distinction",
      category: "Academics",
      issuer: "Khallikote Higher Secondary School, Berhampur",
      date: "2022 – 2024",
      description: "Completed +2 Science curriculum in Physics, Chemistry, Mathematics, and Computer Science.",
      badge: "📜 Higher Secondary"
    }
  ],

  research: [],

  contact: {
    email: "dineshkumarpanda408@gmail.com",
    phone: "+91 7978429299",
    location: "Berhampur, Odisha, India",
    socials: {
      github: "https://github.com/dineshkumarpanda408-arch",
      linkedin: "https://linkedin.com/in/dinesh-kumar-panda-a4a22b334",
      email: "mailto:dineshkumarpanda408@gmail.com"
    }
  },

  aiAssistant: {
    name: "Echo-3D",
    greetings: [
      "Welcome to Dinesh's Resume Portfolio! I'm Echo, your AI assistant.",
      "Dinesh is a CS Student @ NIST University proficient in MERN & AI tools!",
      "Ask me anything about Dinesh's projects or resume details!"
    ],
    faq: [
      {
        question: "What is Dinesh's educational background?",
        answer: "Dinesh is pursuing B.Tech in CS at NIST University (2024-2028), completed +2 Science at Khallikote Higher Secondary School (2022-2024)."
      },
      {
        question: "What are Dinesh's main projects?",
        answer: "Smart Campus Complaint Management System (MERN, deployed on Render for NIST University), AI Scholarship Suggestion App (Flutter, AI API), and AI Book Summarizer."
      },
      {
        question: "How can I contact Dinesh?",
        answer: "Email: dineshkumarpanda408@gmail.com | Phone: +91 7978429299 | Location: Berhampur, Odisha, India."
      }
    ]
  }
};
