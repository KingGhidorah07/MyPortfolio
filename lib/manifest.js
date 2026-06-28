(function () {
  "use strict";
  window.__BRAND__ = {
    name: "Martín Andrade",
    fullName: "Martín Josué Andrade Salazar",
    tagline: "Desarrollador Full Stack · 8+ años transformando ideas en software",
    email: "martinjosue011111@gmail.com",
    github: "https://github.com/KingGhidorah07",
    linkedin: "https://www.linkedin.com/in/mart%C3%ADn-josu%C3%A9-andrade-salazar-229b12215/",
    location: "Ameca, Jalisco",

    typewriterTexts: [
      "Desarrollador Full Stack",
      "Mtro. en Ingeniería de Software",
      "Lic. en Tecnologías de la Información",
      "5× Ganador Exposoftware",
      "Experto en Linux y SQL"
    ],

    stats: [
      { value: 8, suffix: "+", label: "Años de experiencia" },
      { value: 6, suffix: "",  label: "Proyectos de impacto" },
      { value: 5, suffix: "×", label: "Victorias Exposoftware" }
    ],

    projects: [
      {
        num: "01",
        name: "Sistema de Actas con Blockchain",
        year: "2022",
        category: "Innovación · Blockchain",
        stack: ["Hyperledger Fabric", "Smart Contracts", "Laravel", "Vue.js"],
        desc: "Plataforma para la generación, firma y verificación de actas de titulación usando Hyperledger Fabric y smart contracts. Garantiza integridad y trazabilidad de documentos con firma electrónica, eliminando la posibilidad de falsificación."
      },
      {
        num: "02",
        name: "Control de Acceso — CETIS 63",
        year: "2021",
        category: "Institucional · Control de Acceso",
        stack: ["Laravel", "Vue.js", "MySQL"],
        desc: "Sistema de registro de entradas y salidas para el CETIS 63. Gestión de permisos, control de personal y alumnos con registro en tiempo real. Interfaz de administración web y reportes automatizados."
      },
      {
        num: "03",
        name: "Control Escolar para Primarias",
        year: "2020",
        category: "Educativo · Control Escolar",
        stack: ["Laravel", "Vue.js", "MySQL", "PHP"],
        desc: "Sistema integral de control escolar para nivel primaria: gestión de alumnos, calificaciones, asistencias, grupos y generación de boletas. Acceso diferenciado para directores, maestros y padres de familia."
      },
      {
        num: "04",
        name: "Reportes Ciudadanos",
        year: "2019",
        category: "Gobierno · Ciudadano",
        stack: ["Laravel", "PHP", "MySQL"],
        desc: "Plataforma para que ciudadanos reporten problemas de servicios públicos y las autoridades les den seguimiento. Registro de reportes, asignación a personal, actualización de estatus y notificaciones automáticas."
      },
      {
        num: "05",
        name: "Sistema de Servicios Psicológicos",
        year: "2021",
        category: "Salud · Gestión Clínica",
        stack: ["Laravel", "Vue.js", "MySQL"],
        desc: "Gestión de expedientes clínicos de pacientes en consulta psicológica. Registro de historial, seguimiento de sesiones, notas del terapeuta y control de citas, cumpliendo normas de confidencialidad."
      },
      {
        num: "06",
        name: "Préstamo de Equipos a Estudiantes",
        year: "2022",
        category: "Institucional · Inventario",
        stack: ["Laravel", "Vue.js", "MySQL"],
        desc: "Control de inventario y préstamo de equipos de cómputo a estudiantes universitarios. Registro de movimientos, estado del equipo, historial por alumno y reportes de disponibilidad en tiempo real."
      }
    ],

    experience: [
      {
        period: "2023 — Presente",
        role: "Ingeniero de Mantenimiento de Telefonía",
        company: "Empresa Actual",
        location: "Guadalajara, Jalisco",
        current: true,
        desc: "Desarrollo de herramientas de automatización de procesos, administración de bases de datos y servidores Linux, análisis de datos para soporte a decisiones, y mantenimiento de infraestructura de telefonía empresarial. Implementación de soluciones en Docker para despliegue continuo."
      },
      {
        period: "2018 — 2023 · 5 años",
        role: "Desarrollador Full Stack Senior",
        company: "Universidad de Guadalajara",
        location: "Guadalajara, Jalisco",
        current: false,
        desc: "Liderazgo técnico en el desarrollo de sistemas institucionales de alto impacto: control escolar, control de acceso, reportes ciudadanos y sistema de actas de titulación con Hyperledger Fabric. Diseño de arquitectura, toma de decisiones técnicas y mentoría a desarrolladores junior."
      },
      {
        period: "2016 — 2018 · 2 años",
        role: "Desarrollador Full Stack Junior",
        company: "Universidad de Guadalajara",
        location: "Guadalajara, Jalisco",
        current: false,
        desc: "Inicio de carrera profesional desarrollando sistemas web para la institución. Participación en proyectos de backend y frontend, aprendizaje de buenas prácticas, manejo de bases de datos relacionales y trabajo colaborativo en equipo."
      }
    ],

    skills: {
      "Lenguajes": ["PHP", "JavaScript", "Python", "Swift", "Dart"],
      "Frameworks": ["Laravel", "Vue.js", "Quasar", "Angular", "Flutter"],
      "DevOps & Herramientas": ["Docker", "Linux", "Git", "GitHub", "Hyperledger Fabric", "Smart Contracts", "REST API"],
      "Bases de datos": ["MySQL", "SQL Avanzado", "Diseño relacional", "Administración de BD"],
      "Idiomas": ["Español (nativo)", "Inglés (técnico B2)"]
    },

    education: [
      {
        period: "2023 — 2025",
        degree: "Maestría en Ingeniería de Software",
        specialty: "Ingeniería de software avanzada",
        institution: "Universidad de Guadalajara",
        status: "Egresado"
      },
      {
        period: "2019 — 2023",
        degree: "Licenciado en Tecnologías de la Información",
        specialty: "Desarrollo de software y sistemas",
        institution: "Universidad de Guadalajara",
        status: "Egresado"
      }
    ],

    exposoftware: {
      tagline: '"Donde el código demuestra su valor"',
      description: "Exposoftware es el certamen universitario más competitivo de la región donde estudiantes presentan sus mejores proyectos de software ante jueces especializados y empresas. Martín ha participado en más de 5 ediciones consecutivas, obteniendo reconocimientos por la calidad técnica, innovación y impacto real de sus sistemas.",
      pillars: [
        { icon: "🏆", title: "5 victorias consecutivas", desc: "Primeros lugares y reconocimientos especiales" },
        { icon: "⚙️", title: "Proyectos de impacto real", desc: "Sistemas en producción con usuarios reales" },
        { icon: "🧠", title: "Innovación técnica", desc: "Blockchain, automatización y análisis de datos" },
        { icon: "🤝", title: "Mentoría y liderazgo", desc: "Formación de nuevos desarrolladores en la universidad" }
      ]
    }
  };
})();
