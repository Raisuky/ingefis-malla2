const subjects: Subject[] = [
  { code: "25001", name: "Introducción a la Física", semester: 1, description: "Fundamentos básicos de la física", prerequisites: [], hours: 4, credits: 6 }, // Anual
  { code: "25002", name: "Cálculo", semester: 1, description: "Cálculo básico e integral", prerequisites: [], hours: 6, credits: 6 }, // Anual
  { code: "25003", name: "Álgebra", semester: 1, description: "Estructuras algebraicas fundamentales", prerequisites: [], hours: 5, credits: 5 }, // Anual
  { code: "25053", name: "Física Experimental I", semester: 1, description: "Laboratorio introductorio de física", prerequisites: [], hours: 4, credits: 4 }, // Anual
  { code: "25007", name: "Electromagnetismo I", semester: 3, description: "Conceptos fundamentales del electromagnetismo", prerequisites: ["25001"], hours: 5, credits: 5 },
  { code: "25008", name: "Cálculo Avanzado", semester: 3, description: "Conceptos avanzados de cálculo", prerequisites: ["25002"], hours: 6, credits: 6 },
  { code: "25010", name: "Ecuaciones Diferenciales", semester: 3, description: "Métodos de resolución de ecuaciones diferenciales", prerequisites: ["25002", "25003"], hours: 5, credits: 5 },
  { code: "25012", name: "Electromagnetismo II", semester: 4, description: "Conceptos avanzados de electromagnetismo", prerequisites: ["25007", "25008"], hours: 5, credits: 5 },
  { code: "25013", name: "Métodos Matemáticos para la Física I", semester: 4, description: "Métodos matemáticos aplicados a la física", prerequisites: ["25008", "25010"], hours: 4, credits: 4 },
  { code: "25014", name: "Electrónica", semester: 4, description: "Introducción a la electrónica", prerequisites: ["25007"], hours: 4, credits: 4 },
  { code: "25015", name: "Mecánica Clásica", semester: 4, description: "Dinámica integral, mecánica lagrangiana y hamiltoniana", prerequisites: ["25001"], hours: 6, credits: 6 },
  { code: "25016", name: "Óptica", semester: 5, description: "Fundamentos de la óptica", prerequisites: ["25012"], hours: 4, credits: 4 },
  { code: "25017", name: "Métodos Matemáticos para la Física II", semester: 5, description: "Métodos avanzados matemáticos", prerequisites: ["25013"], hours: 4, credits: 4 },
  { code: "25018", name: "Termodinámica", semester: 5, description: "Conceptos fundamentales de termodinámica", prerequisites: ["25002"], hours: 4, credits: 4 },
  { code: "25021", name: "Física Moderna", semester: 6, description: "Conceptos modernos en física", prerequisites: ["25012"], hours: 4, credits: 4 },
  { code: "25022", name: "Mecánica de Fluidos", semester: 6, description: "Principios básicos de la mecánica de fluidos", prerequisites: ["25012"], hours: 4, credits: 4 },
  { code: "25026", name: "Mecánica Cuántica", semester: 7, description: "Fundamentos de la mecánica cuántica", prerequisites: ["25012"], hours: 5, credits: 5 },
  { code: "25027", name: "Mecánica Estadística", semester: 7, description: "Introducción a la mecánica estadística", prerequisites: ["25012"], hours: 5, credits: 5 },
  { code: "25028", name: "Cálculo Numérico", semester: 7, description: "Métodos numéricos aplicados", prerequisites: ["25010"], hours: 4, credits: 4 },
  { code: "25031", name: "Física del Sólido", semester: 8, description: "Fundamentos de la física del estado sólido", prerequisites: ["25026"], hours: 5, credits: 5 },
  { code: "25032", name: "Laboratorio Avanzado", semester: 8, description: "Laboratorio avanzado en física", prerequisites: ["25023"], hours: 6, credits: 6 },
  { code: "25033", name: "Espectroscopia Moderna", semester: 8, description: "Introducción a la espectroscopia moderna", prerequisites: ["25026"], hours: 4, credits: 4 },
  { code: "25034", name: "Electivo I", semester: 8, description: "Asignatura electiva", prerequisites: [], hours: 3, credits: 3 },
  { code: "25035", name: "Electivo II", semester: 9, description: "Asignatura electiva", prerequisites: [], hours: 3, credits: 3 },
  { code: "25036", name: "Desarrollo Social de Chile", semester: 9, description: "Historia del desarrollo social en Chile", prerequisites: [], hours: 3, credits: 3 },
  { code: "25037", name: "Teoría Económica", semester: 9, description: "Fundamentos de la teoría económica", prerequisites: [], hours: 4, credits: 4 },
  { code: "25038", name: "Taller de Desarrollo Personal", semester: 9, description: "Desarrollo personal y profesional", prerequisites: [], hours: 2, credits: 2 },
  { code: "25042", name: "Administración de Empresas", semester: 10, description: "Introducción a la administración de empresas", prerequisites: [], hours: 4, credits: 4 },
  { code: "25043", name: "Ingeniería Económica y Evaluación de Proyectos", semester: 10, description: "Evaluación económica y de proyectos", prerequisites: [], hours: 4, credits: 4 },
  { code: "25044", name: "Taller de Relaciones Interpersonales", semester: 10, description: "Desarrollo de habilidades interpersonales", prerequisites: [], hours: 2, credits: 2 },
  { code: "25048", name: "Teoría de Sistemas", semester: 11, description: "Fundamentos de la teoría de sistemas", prerequisites: [], hours: 5, credits: 5 },
  { code: "25049", name: "Teoría de Proyectos", semester: 11, description: "Teoría y gestión de proyectos", prerequisites: [], hours: 5, credits: 5 },
  { code: "25050", name: "Trabajo de Titulación", semester: 12, description: "Proyecto final de titulación", prerequisites: [], hours: 10, credits: 10 },
  { code: "25051", name: "Práctica Profesional", semester: 12, description: "Práctica profesional obligatoria", prerequisites: [], hours: 0, credits: 0 },

  // Métodos Computacionales
  { code: "25054", name: "Métodos Computacionales para la Física I", semester: 2, description: "Introducción a los métodos computacionales", prerequisites: [], hours: 4, credits: 4 },
  { code: "25055", name: "Métodos Computacionales para la Física II", semester: 3, description: "Métodos computacionales avanzados", prerequisites: ["25054"], hours: 4, credits: 4 },
  { code: "25056", name: "Métodos Computacionales y Estadísticos III", semester: 4, description: "Métodos computacionales y estadísticos avanzados", prerequisites: ["25055"], hours: 4, credits: 4 },

  // Física experimental
  { code: "25011", name: "Física Experimental III", semester: 3, description: "Laboratorio avanzado en física experimental", prerequisites: ["25053"], hours: 6, credits: 6 },
  { code: "25019", name: "Física Experimental IV", semester: 5, description: "Laboratorio avanzado en física experimental", prerequisites: ["25012"], hours: 4, credits: 4 },
  { code: "25020", name: "Física Experimental V", semester: 5, description: "Laboratorio avanzado en física experimental", prerequisites: ["25012"], hours: 6, credits: 6 },
];
