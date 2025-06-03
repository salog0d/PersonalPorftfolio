import React, { useState, useEffect, useRef } from 'react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [terminalText, setTerminalText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const canvasRef = useRef(null);

  // Matrix Rain Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    updateCanvasSize();

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = window.innerWidth < 768 ? 12 : 16;
    const columns = canvas.width / fontSize;

    const rainDrops = [];

    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Terminal typing effect
  useEffect(() => {
    const messages = [
      'root@david-system:~$ whoami',
      'David Salomon Nava - Full Stack Developer',
      'root@david-system:~$ ls skills/',
      'Python  Django  React  AI/ML',
      'root@david-system:~$ cat mission.txt',
      'Building secure, scalable solutions...',
      'root@david-system:~$ ./initialize_portfolio.sh',
      'Portfolio initialized successfully.'
    ];

    let messageIndex = 0;
    let charIndex = 0;

    const typeWriter = () => {
      if (messageIndex < messages.length) {
        if (charIndex < messages[messageIndex].length) {
          setTerminalText(prev => prev + messages[messageIndex].charAt(charIndex));
          charIndex++;
          setTimeout(typeWriter, 50);
        } else {
          setTerminalText(prev => prev + '\n');
          messageIndex++;
          charIndex = 0;
          setTimeout(typeWriter, 1000);
        }
      }
    };

    const timer = setTimeout(typeWriter, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Cursor blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      name: "EcoScan",
      description: "Sistema de IA para reconocimiento de materiales reciclables con computer vision avanzada",
      tech: ["Python", "TensorFlow", "Computer Vision", "Flask"],
      problem: "Identificación manual ineficiente de materiales reciclables",
      solution: "Red neuronal convolucional para clasificación automática en tiempo real",
      github: "https://github.com/salog0d/EcoScan",
      category: "AI/ML",
      status: "ACTIVE",
      security: "HIGH"
    },
    {
      name: "SupplyCare Backend",
      description: "Arquitectura de microservicios para gestión hospitalaria con encriptación end-to-end",
      tech: ["Django", "PostgreSQL", "Docker", "Redis", "JWT"],
      problem: "Sistemas hospitalarios vulnerables con datos médicos expuestos",
      solution: "API REST segura con autenticación multi-factor y auditoría completa",
      github: "https://github.com/salog0d/SupplyCareBackend",
      category: "Backend Security",
      status: "ACTIVE",
      security: "CRITICAL"
    },
    {
      name: "EmployeeOfTheMonth",
      description: "Employee Of The Month es un videojuego educativo que simula la operación de un almacén y enseña buenas prácticas de gestión logística. Los jugadores gestionan operaciones de almacén y compiten por ser reconocidos como el empleado del mes basándose en su eficiencia, cumplimiento de protocolos y toma de decisiones.",
      tech: ["Django", "PostgreSQL", "Unity", "C#"],
      problem: "Falta de formación práctica en gestión logística",
      solution: "Simulación interactiva con métricas de rendimiento y análisis de decisiones",
      github: "https://github.com/salog0d/EmployeeOfTheMonth",
      category: "Full Stack & Game Development",
      status: "MAINTENANCE",
      security: "MEDIUM"
    },
    {
      name: "AM-T Sports Analytics",
      description: "Plataforma de análisis deportivo con métricas avanzadas y visualización 3D",
      tech: ["Django", "React", "D3.js", "WebGL"],
      problem: "Análisis deportivo limitado a métricas básicas",
      solution: "Dashboard interactivo con visualizaciones 3D y análisis predictivo",
      github: "https://github.com/salog0d/AM-TBackend",
      category: "Data Analytics",
      status: "ACTIVE",
      security: "MEDIUM"
    },
    {
      name: "PaymentManager",
      description: "Sistema de gestión de pagos y domiciliaciones bancarias desarrollado en Django REST Framework, diseñado para procesar y administrar cobros automáticos entre diferentes instituciones bancarias mexicanas.",
      tech: ["Django", "Pandas", "PostgreSQL", "Machine Learning"],
      problem: "Gestion de cobranza ineficiente y propensa a errores manuales",
      solution: "Automatización de procesos de cobranza con integración bancaria segura y análisis predictivo",
      github: "https://github.com/salog0d/PaymentManagerBackend",
      category: "Data Analytics",
      status: "DEVELOPMENT",
      security: "CRITICAL"
    }
  ];

  const skills = {
    "Backend Security": ["Python", "Django", "FastAPI", "JWT", "OAuth2"],
    "Frontend Systems": ["React", "Javascript", "CSS", "HTML", "Tailwind CSS"],
    "Database & Storage": ["PostgreSQL", "SQL", "MongoDB", "Database Optimization"],
    "DevOps": ["Agile Methodologies", "AWS", "Git", "Github"],
    "AI & Analytics": ["Pytorch", "Pandas", "Computer Vision", "Numpy"],
  };

  const experience = [
    {
      role: "Software Engineer Intern",
      company: "DCI INTEGRACIÓN",
      location: "Monterrey, Mexico",
      period: "Feb 2024 - Present",
      classification: "CLASSIFIED",
      achievements: [
        "[ENCRYPTED] Desarrollo de sistemas críticos con arquitectura MVC",
        "[VERIFIED] Implementación de servicios RESTful con autenticación robusta",
        "[ACTIVE] Integración de librerías de análisis y visualización de datos",
        "[SECURED] Dashboards KPI con protocolos de seguridad implementados"
      ]
    },
    {
      role: "App Developer Intern",
      company: "CAPDESIS",
      location: "Mexico City, Mexico",
      period: "Nov 2024 - Mar 2025",
      classification: "PUBLIC",
      achievements: [
        "[DEPLOYED] Aplicaciones completadas dentro de cronogramas críticos",
        "[OPTIMIZED] Análisis y mejora de rendimiento en sistemas existentes",
        "[TESTED] Validación exhaustiva de aplicaciones antes de producción",
        "[AGILE] Metodologías de desarrollo evolutivo implementadas"
      ]
    },
    {
      role: "Full Stack Security Developer",
      company: "FANTAZY LABZ",
      location: "Monterrey, Mexico",
      period: "Jul 2023 - Present",
      classification: "CONFIDENTIAL",
      achievements: [
        "[ARCHITECTURE] Sistemas full-stack con enfoque en seguridad",
        "[ANALYSIS] Herramientas de análisis de seguridad con Python",
        "[ALGORITHMS] Optimización usando estructuras de datos avanzadas",
        "[SEO] Gestión de contenido con prácticas de seguridad web"
      ]
    }
  ];

 // Versión alternativa más simple para el componente
const certifications = [
  { name: "Full Stack Python Developer", level: "ADVANCED", year: "2025" },
  { name: "Data Structures & Algorithms", level: "INTERMEDIATE", year: "2025" },
  { name: "Flutter Development", level: "INTERMEDIATE", year: "2024" },
  { name: "Git y GitHub Professional", level: "ADVANCED", year: "2024" },
  { name: "Linux Terminal & Command Line", level: "ADVANCED", year: "2024" },
  { name: "Artificial Intelligence Fundamentals", level: "INTERMEDIATE", year: "2024" },
  { name: "Agile Explorer", level: "INTERMEDIATE", year: "2024" },
  { name: "Cybersecurity Fundamentals", level: "INTERMEDIATE", year: "2024" },
  { name: "AWS Cloud Fundamentals", level: "INTERMEDIATE", year: "2024" },
  { name: "INCMty Innovation Program", level: "INTERMEDIATE", year: "2023" }
];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const getSecurityColor = (level) => {
    switch (level) {
      case 'CRITICAL': return 'text-red-400 border-red-400';
      case 'HIGH': return 'text-yellow-400 border-yellow-400';
      case 'MEDIUM': return 'text-blue-400 border-blue-400';
      default: return 'text-green-400 border-green-400';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-500';
      case 'DEVELOPMENT': return 'bg-yellow-500';
      case 'MAINTENANCE': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Matrix Background */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20"
        style={{ zIndex: 0 }}
      />

      {/* Scanlines Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-10" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500 to-transparent opacity-20 animate-pulse"></div>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-green-400 opacity-30"
            style={{
              top: `${i * 5}%`,
              animation: `scan 3s linear infinite`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative" style={{ zIndex: 2 }}>
        {/* Navigation */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-sm border-b border-green-400/30' : 'bg-transparent'}`}>
          <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
            <div className="flex justify-between items-center py-3 sm:py-4">
              <div className="text-sm sm:text-lg lg:text-xl font-bold text-green-400 glitch-text" data-text="[SYSTEM_ONLINE]">
                [SYSTEM_ONLINE]
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-4 lg:space-x-8">
                {['home', 'about', 'projects', 'experience', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`hover:text-green-300 transition-colors uppercase tracking-wider border border-transparent hover:border-green-400 px-2 lg:px-3 py-1 text-xs lg:text-sm ${activeSection === section ? 'text-green-300 border-green-400 bg-green-400/10' : 'text-green-400'}`}
                  >
                    [{section === 'home' ? 'INICIO' : section === 'about' ? 'PERFIL' : section === 'projects' ? 'PROYECTOS' : section === 'experience' ? 'EXPERIENCIA' : 'CONTACTO'}]
                  </button>
                ))}
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden border border-green-400 p-2 hover:bg-green-400/10 text-sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? '✕' : '☰'}
              </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden bg-black/95 border border-green-400 rounded-lg mt-2 p-4 mb-4">
                {['home', 'about', 'projects', 'experience', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="block w-full text-left py-2 hover:text-green-300 transition-colors uppercase tracking-wider text-sm"
                  >
                    [{section === 'home' ? 'INICIO' : section === 'about' ? 'PERFIL' : section === 'projects' ? 'PROYECTOS' : section === 'experience' ? 'EXPERIENCIA' : 'CONTACTO'}]
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-3 sm:px-4 lg:px-6">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
              {/* Terminal */}
              <div className="bg-black border-2 border-green-400 rounded-lg p-3 sm:p-6 shadow-lg shadow-green-400/20 order-2 lg:order-1">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="ml-4 text-green-400 text-xs sm:text-sm">terminal@david-system</div>
                </div>
                <div className="h-48 sm:h-64 overflow-y-auto">
                  <pre className="text-left text-green-400 text-xs sm:text-sm whitespace-pre-wrap">
                    {terminalText}
                    {showCursor && <span className="bg-green-400 text-black">█</span>}
                  </pre>
                </div>
              </div>

              {/* Main Content */}
              <div className="order-1 lg:order-2">
                <div className="mb-6 lg:mb-8">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 lg:mb-6 glitch-text text-center lg:text-left" data-text="DAVID SALOMON NAVA">
                    <span className="text-green-400">DAVID SALOMON NAVA</span>
                  </h1>
                  <h2 className="text-lg sm:text-xl lg:text-2xl text-green-300 mb-4 lg:mb-6 typing-animation text-center lg:text-left">
                    [FULL_STACK_DEVELOPER]
                  </h2>
                  <div className="border border-green-400 p-3 lg:p-4 bg-green-400/5">
                    <p className="text-green-400 mb-3 lg:mb-4 text-sm sm:text-base">
                      <span className="text-green-300">[MISSION]:</span> Desarrollador especializado en arquitectura MVC. Construyendo el futuro con Python, IA y ciberseguridad.
                    </p>
                    <p className="text-green-400 text-sm sm:text-base">
                      <span className="text-green-300">[STATUS]:</span> ACTIVE | LEARNING | INNOVATING
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 mb-6 lg:mb-8">
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="px-4 lg:px-6 py-2 lg:py-3 border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 transform hover:scale-105 uppercase tracking-wider cyber-button text-xs sm:text-sm"
                  >
                    [ACCEDER_PROYECTOS]
                  </button>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="px-4 lg:px-6 py-2 lg:py-3 border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 transform hover:scale-105 uppercase tracking-wider cyber-button text-xs sm:text-sm"
                  >
                    [INICIAR_CONTACTO]
                  </button>
                </div>

                <div className="flex justify-center lg:justify-start space-x-4 lg:space-x-6">
                  <a href="https://github.com/salog0d" target="_blank" rel="noopener noreferrer"
                     className="p-2 lg:p-3 border border-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 group">
                    <span className="text-lg lg:text-xl">⚡</span>
                  </a>
                  <a href="https://www.linkedin.com/in/salodev/" target="_blank" rel="noopener noreferrer"
                     className="p-2 lg:p-3 border border-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 group">
                    <span className="text-lg lg:text-xl">🔗</span>
                  </a>
                  <a href="mailto:david.salomon.nava11@gmail.com"
                     className="p-2 lg:p-3 border border-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 group">
                    <span className="text-lg lg:text-xl">📧</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-6 border-t border-green-400/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-16 glitch-text" data-text="[PERFIL_USUARIO]">[PERFIL_USUARIO]</h2>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div className="space-y-6">
                <div className="border border-green-400 p-4 lg:p-6 bg-green-400/5">
                  <h3 className="text-lg lg:text-xl font-bold text-green-300 mb-4">[FILOSOFÍA_DESARROLLO]</h3>
                  <p className="text-green-400 mb-4 text-sm sm:text-base">
                    Desarrollador full-stack enfocado en <span className="text-green-300">comprensión profunda </span>
                    vs. memorización superficial. Mi misión: Mantenerme actualizado en la vanguardia de la tecnología, creando sisemas robustos,
                    <span className="text-green-300">seguros, escalables e innovadores</span>.
                  </p>

                  <p className="text-green-400 text-sm sm:text-base">
                    <span className="text-green-300">[OBJETIVO]:</span> Convertirme en un ingeniero que
                    comprende, innova y optimiza soluciones tecnológicas del futuro.
                  </p>
                </div>

                <div className="border border-green-400 p-4 bg-green-400/5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div className="flex items-center">
                      <span className="text-green-300 mr-2">📍</span>
                      <span>[LOCATION]: Monterrey, MX</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-300 mr-2">📅</span>
                      <span>[STATUS]: AVAILABLE</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-300 mr-2">🛡️</span>
                      <span>[CLEARANCE]: DEVELOPER</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-300 mr-2">👁️</span>
                      <span>[MODE]: LEARNING</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-green-400 p-4 lg:p-6 bg-green-400/5 hover:bg-green-400/10 transition-all duration-300 group">
                  <div className="text-green-400 mb-4 text-2xl lg:text-3xl">💻</div>
                  <h3 className="text-base lg:text-lg font-semibold mb-2 text-green-300">[FULL_STACK]</h3>
                  <p className="text-green-400 text-xs sm:text-sm">Python • Django • React • Rails</p>
                </div>
                <div className="border border-green-400 p-4 lg:p-6 bg-green-400/5 hover:bg-green-400/10 transition-all duration-300 group">
                  <div className="text-green-400 mb-4 text-2xl lg:text-3xl">🔒</div>
                  <h3 className="text-base lg:text-lg font-semibold mb-2 text-green-300">[SECURITY_ENTHUSIAST]</h3>
                  <p className="text-green-400 text-xs sm:text-sm">Penetration Testing • Analysis</p>
                </div>
                <div className="border border-green-400 p-4 lg:p-6 bg-green-400/5 hover:bg-green-400/10 transition-all duration-300 group">
                  <div className="text-green-400 mb-4 text-2xl lg:text-3xl">🗄️</div>
                  <h3 className="text-base lg:text-lg font-semibold mb-2 text-green-300">[DATABASE]</h3>
                  <p className="text-green-400 text-xs sm:text-sm">PostgreSQL • Pandas • Analytics</p>
                </div>
                <div className="border border-green-400 p-4 lg:p-6 bg-green-400/5 hover:bg-green-400/10 transition-all duration-300 group">
                  <div className="text-green-400 mb-4 text-2xl lg:text-3xl">🧠</div>
                  <h3 className="text-base lg:text-lg font-semibold mb-2 text-green-300">[AI_SYSTEMS_ENTHUSIAST]</h3>
                  <p className="text-green-400 text-xs sm:text-sm">Computer Vision • ML • Pytorch</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-6 border-t border-green-400/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-16 glitch-text" data-text="[TECNOLOGÍAS_SISTEMA]">[TECNOLOGÍAS_SISTEMA]</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category} className="border border-green-400 p-4 lg:p-6 bg-green-400/5 hover:bg-green-400/10 transition-all duration-300">
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-4 text-green-300 uppercase tracking-wider">
                    [{category.replace(/ /g, '_')}]
                  </h3>
                  <div className="space-y-2">
                    {skillList.map((skill) => (
                      <div key={skill} className="flex items-center">
                        <span className="w-2 h-2 bg-green-400 mr-3 animate-pulse flex-shrink-0"></span>
                        <span className="text-green-400 text-xs sm:text-sm font-mono">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 lg:mt-16">
              <h3 className="text-xl sm:text-2xl font-semibold mb-6 lg:mb-8 text-center text-green-300">[CERTIFICACIONES]</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {certifications.map((cert) => (
                  <div key={cert.name} className="border border-green-400 p-3 lg:p-4 bg-green-400/5 hover:bg-green-400/10 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-green-400">🏆</span>
                      <span className="text-xs text-green-300">{cert.year}</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-semibold text-green-300 mb-1">{cert.name}</h4>
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">🔐</span>
                      <span className="text-xs text-green-400">[{cert.level}]</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-6 border-t border-green-400/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-16 glitch-text" data-text="[PROYECTOS]">[PROYECTOS]</h2>

            <div className="space-y-6 lg:space-y-8">
              {projects.map((project, index) => (
                <div key={index} className="border border-green-400 bg-green-400/5 hover:bg-green-400/10 transition-all duration-300 group">
                  <div className="p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 lg:gap-4 mb-4 flex-wrap">
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-green-300 glitch-text" data-text={project.name}>
                            {project.name}
                          </h3>
                          <span className="px-2 lg:px-3 py-1 border border-green-400 text-green-400 text-xs uppercase tracking-wider">
                            [{project.category.replace(/ /g, '_')}]
                          </span>
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)} mr-2 animate-pulse`}></div>
                            <span className="text-xs text-green-400">[{project.status}]</span>
                          </div>
                          <span className={`px-2 py-1 border text-xs ${getSecurityColor(project.security)}`}>
                            [SEC:{project.security}]
                          </span>
                        </div>

                        <p className="text-green-400 mb-4 font-mono text-sm sm:text-base">{project.description}</p>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div className="border border-red-400/50 p-3 bg-red-400/5">
                            <h4 className="font-semibold text-red-400 mb-2 text-xs sm:text-sm">[PROBLEMA_IDENTIFICADO]:</h4>
                            <p className="text-green-400 text-xs sm:text-sm">{project.problem}</p>
                          </div>

                          <div className="border border-green-400/50 p-3 bg-green-400/5">
                            <h4 className="font-semibold text-green-400 mb-2 text-xs sm:text-sm">[SOLUCIÓN_IMPLEMENTADA]:</h4>
                            <p className="text-green-400 text-xs sm:text-sm">{project.solution}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map((tech) => (
                            <span key={tech} className="px-2 lg:px-3 py-1 bg-black border border-green-400 text-green-400 text-xs font-mono hover:bg-green-400 hover:text-black transition-all duration-300">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 min-w-full sm:min-w-[160px] lg:min-w-[160px]">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center px-4 py-2 border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 uppercase tracking-wider text-xs sm:text-sm"
                        >
                          <span className="mr-2">⚡</span>
                          [CÓDIGO]
                        </a>
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center px-4 py-2 border border-green-400 bg-green-400/10 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 uppercase tracking-wider text-xs sm:text-sm"
                          >
                            <span className="mr-2">🌐</span>
                            [DEMO]
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-6 border-t border-green-400/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-16 glitch-text" data-text="[HISTORIAL_LABORAL]">[HISTORIAL_LABORAL]</h2>

            <div className="space-y-8 lg:space-y-12">
              {experience.map((exp, index) => (
                <div key={index} className="border border-green-400 bg-green-400/5 hover:bg-green-400/10 transition-all duration-300">
                  <div className="p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-green-300 mb-2">{exp.role}</h3>
                        <h4 className="text-base sm:text-lg lg:text-xl text-green-400 mb-1">{exp.company}</h4>
                        <p className="text-green-400 text-xs sm:text-sm">[LOCATION]: {exp.location}</p>
                      </div>
                      <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                        <span className="px-3 lg:px-4 py-2 border border-green-400 text-green-400 text-xs sm:text-sm uppercase tracking-wider mb-2">
                          [{exp.period}]
                        </span>
                        <span className={`px-3 py-1 border text-xs uppercase tracking-wider ${
                          exp.classification === 'CLASSIFIED' ? 'border-red-400 text-red-400' :
                          exp.classification === 'CONFIDENTIAL' ? 'border-yellow-400 text-yellow-400' :
                          'border-green-400 text-green-400'
                        }`}>
                          [{exp.classification}]
                        </span>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {exp.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="flex items-start border border-green-400/30 p-3 bg-black/30">
                          <span className="text-green-400 mr-3 mt-0.5 flex-shrink-0">▶</span>
                          <span className="text-green-400 text-xs sm:text-sm font-mono">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 lg:mt-16 border border-green-400 bg-green-400/5">
              <div className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 lg:mb-8 text-green-300">[FORMACIÓN_ACADÉMICA]</h3>
                <div className="text-center max-w-2xl mx-auto">
                  <div className="border border-green-400 p-4 lg:p-6 bg-black/30">
                    <h4 className="text-lg sm:text-xl font-semibold text-green-300 mb-2">[COMPUTER_SCIENCE_DEGREE]</h4>
                    <p className="text-green-400 mb-2 text-sm sm:text-base">Tecnológico de Monterrey</p>
                    <p className="text-green-400 mb-4 text-sm sm:text-base">[PERIODO]: 2023 - 2027</p>
                    <div className="flex items-center justify-center">
                      <div className="w-3 h-3 bg-green-400 mr-3 animate-pulse"></div>
                      <span className="text-green-400 text-xs sm:text-sm">[STATUS]: IN_PROGRESS</span>
                    </div>
                    <p className="text-green-400 text-xs sm:text-sm mt-4 border-t border-green-400/30 pt-4">
                      [MÓDULOS]: Computer Science • Physics • Mathematics • Cybersecurity
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-6 border-t border-green-400/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 glitch-text" data-text="[INICIAR_CONEXIÓN]">[INICIAR_CONEXIÓN]</h2>
            <div className="border border-green-400 p-4 sm:p-6 lg:p-8 bg-green-400/5 mb-8 lg:mb-12">
              <p className="text-lg sm:text-xl text-green-400 mb-4">
                <span className="text-green-300">[MENSAJE_SISTEMA]:</span> Preparado para colaborar en proyectos innovadores.
              </p>
              <p className="text-green-400 text-sm sm:text-base">
                <span className="text-green-300">[ESTADO]:</span> DISPONIBLE para discutir oportunidades,
                proyectos de ciberseguridad y desarrollo de sistemas críticos.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-12">
              <div className="border border-green-400 p-4 lg:p-6 bg-green-400/5 hover:bg-green-400/10 transition-all duration-300 group">
                <div className="text-green-400 mx-auto mb-4 text-3xl lg:text-4xl">📧</div>
                <h3 className="text-base lg:text-lg font-semibold mb-2 text-green-300">[EMAIL_PROTOCOL]</h3>
                <a href="mailto:david.salomon.nava11@gmail.com"
                   className="text-green-400 hover:text-green-300 transition-colors text-xs sm:text-sm font-mono break-all">
                  david.salomon.nava11@gmail.com
                </a>
              </div>

              <div className="border border-green-400 p-4 lg:p-6 bg-green-400/5 hover:bg-green-400/10 transition-all duration-300 group">
                <div className="text-green-400 mx-auto mb-4 text-3xl lg:text-4xl">🔗</div>
                <h3 className="text-base lg:text-lg font-semibold mb-2 text-green-300">[NETWORK_LINK]</h3>
                <a href="https://www.linkedin.com/in/salodev/"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-green-400 hover:text-green-300 transition-colors text-xs sm:text-sm font-mono">
                  linkedin.com/in/salodev
                </a>
              </div>

              <div className="border border-green-400 p-4 lg:p-6 bg-green-400/5 hover:bg-green-400/10 transition-all duration-300 group sm:col-span-2 lg:col-span-1">
                <div className="text-green-400 mx-auto mb-4 text-3xl lg:text-4xl">⚡</div>
                <h3 className="text-base lg:text-lg font-semibold mb-2 text-green-300">[CODE_REPOSITORY]</h3>
                <a href="https://github.com/salog0d"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-green-400 hover:text-green-300 transition-colors text-xs sm:text-sm font-mono">
                  github.com/salog0d
                </a>
              </div>
            </div>

            <div className="border-2 border-green-400 p-4 sm:p-6 lg:p-8 bg-green-400/10 hover:bg-green-400/20 transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-green-300">[ESTABLECER_COMUNICACIÓN]</h3>
              <p className="text-base sm:text-lg mb-6 text-green-400">
                Conectando mentes para construir el futuro de la tecnología segura.
              </p>
              <a href="mailto:david.salomon.nava11@gmail.com"
                 className="inline-block px-6 sm:px-8 py-2 sm:py-3 border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 uppercase tracking-wider font-bold cyber-button text-xs sm:text-sm">
                [ENVIAR_TRANSMISIÓN]
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 lg:py-8 px-3 sm:px-4 lg:px-6 border-t border-green-400/30 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-green-400 font-mono text-xs sm:text-sm mb-4">
              [SYSTEM_INFO]: © 2025 David Salomón Nava • Powered by React
            </p>
            <p className="text-green-400/60 font-mono text-xs">
              [WARNING]: This portfolio may contain traces of advanced algorithms and caffeine
            </p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }

        .glitch-text {
          position: relative;
          animation: glitch 2s infinite;
        }

        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .glitch-text::before {
          animation: glitch-1 0.25s infinite;
          color: #ff00ff;
          z-index: -1;
        }

        .glitch-text::after {
          animation: glitch-2 0.25s infinite;
          color: #00ffff;
          z-index: -2;
        }

        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }

        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(2px, -2px); }
          40% { transform: translate(-2px, 2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(2px, 2px); }
        }

        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, -2px); }
          40% { transform: translate(2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(-2px, 2px); }
        }

        .typing-animation {
          overflow: hidden;
          border-right: 3px solid #00ff00;
          white-space: nowrap;
          animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
        }

        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes blink-caret {
          from, to { border-color: transparent; }
          50% { border-color: #00ff00; }
        }

        .cyber-button {
          position: relative;
          overflow: hidden;
        }

        .cyber-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.2), transparent);
          transition: left 0.5s;
        }

        .cyber-button:hover::before {
          left: 100%;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;