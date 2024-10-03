'use client';

import React, { useEffect, useState } from 'react';

interface Subject {
  code: string;
  name: string;
  semester: number;
  description: string;
  prerequisites?: string[];
  hours: number;
}

// Todas las asignaturas con los semestres correctos y relaciones de prerrequisitos
const subjects: Subject[] = [
  { code: "25001", name: "Introducción a la Física", semester: 1, description: "Fundamentos básicos de la física", prerequisites: [], hours: 4 }, // Anual
  { code: "25002", name: "Cálculo", semester: 1, description: "Cálculo básico e integral", prerequisites: [], hours: 6 }, // Anual
  { code: "25003", name: "Álgebra", semester: 1, description: "Estructuras algebraicas fundamentales", prerequisites: [], hours: 5 }, // Anual
  { code: "25053", name: "Física Experimental I", semester: 1, description: "Laboratorio introductorio de física", prerequisites: [], hours: 4 }, // Anual
  { code: "25007", name: "Electromagnetismo I", semester: 3, description: "Conceptos fundamentales del electromagnetismo", prerequisites: ["25001"], hours: 5 },
  { code: "25008", name: "Cálculo Avanzado", semester: 3, description: "Conceptos avanzados de cálculo", prerequisites: ["25002"], hours: 6 },
  { code: "25010", name: "Ecuaciones Diferenciales", semester: 3, description: "Métodos de resolución de ecuaciones diferenciales", prerequisites: ["25002", "25003"], hours: 5 },
  { code: "25012", name: "Electromagnetismo II", semester: 4, description: "Conceptos avanzados de electromagnetismo", prerequisites: ["25007", "25008"], hours: 5 },
  { code: "25013", name: "Métodos Matemáticos para la Física I", semester: 4, description: "Métodos matemáticos aplicados a la física", prerequisites: ["25008", "25010"], hours: 4 },
  { code: "25014", name: "Electrónica", semester: 4, description: "Introducción a la electrónica", prerequisites: ["25007"], hours: 4 },
  { code: "25016", name: "Óptica", semester: 5, description: "Fundamentos de la óptica", prerequisites: ["25007"], hours: 4 },
  { code: "25017", name: "Métodos Matemáticos para la Física II", semester: 5, description: "Métodos avanzados matemáticos", prerequisites: ["25013"], hours: 4 },
  { code: "25018", name: "Termodinámica", semester: 5, description: "Conceptos fundamentales de termodinámica", prerequisites: ["25007"], hours: 4 },
  { code: "25021", name: "Física Moderna", semester: 6, description: "Conceptos modernos en física", prerequisites: ["25012"], hours: 4 },
  { code: "25022", name: "Mecánica de Fluidos", semester: 6, description: "Principios básicos de la mecánica de fluidos", prerequisites: ["25012"], hours: 4 },
  { code: "25023", name: "Física Experimental VI", semester: 6, description: "Laboratorio avanzado en física experimental", prerequisites: ["25012"], hours: 6 },
  { code: "25026", name: "Mecánica Cuántica", semester: 7, description: "Fundamentos de la mecánica cuántica", prerequisites: ["25012"], hours: 5 },
  { code: "25027", name: "Mecánica Estadística", semester: 7, description: "Introducción a la mecánica estadística", prerequisites: ["25012"], hours: 5 },
  { code: "25028", name: "Cálculo Numérico", semester: 7, description: "Métodos numéricos aplicados", prerequisites: ["25010"], hours: 4 },
  { code: "25031", name: "Física del Sólido", semester: 8, description: "Fundamentos de la física del estado sólido", prerequisites: ["25026"], hours: 5 },
  { code: "25032", name: "Laboratorio Avanzado", semester: 8, description: "Laboratorio avanzado en física", prerequisites: ["25023"], hours: 6 },
  { code: "25033", name: "Espectroscopia Moderna", semester: 8, description: "Introducción a la espectroscopia moderna", prerequisites: ["25026"], hours: 4 },
  { code: "25034", name: "Electivo I", semester: 8, description: "Asignatura electiva", prerequisites: [], hours: 3 },
  { code: "25035", name: "Electivo II", semester: 9, description: "Asignatura electiva", prerequisites: [], hours: 3 },
  { code: "25036", name: "Desarrollo Social de Chile", semester: 9, description: "Historia del desarrollo social en Chile", prerequisites: [], hours: 3 },
  { code: "25037", name: "Teoría Económica", semester: 9, description: "Fundamentos de la teoría económica", prerequisites: [], hours: 4 },
  { code: "25038", name: "Taller de Desarrollo Personal", semester: 9, description: "Desarrollo personal y profesional", prerequisites: [], hours: 2 },
  { code: "25042", name: "Administración de Empresas", semester: 10, description: "Introducción a la administración de empresas", prerequisites: [], hours: 4 },
  { code: "25043", name: "Ingeniería Económica y Evaluación de Proyectos", semester: 10, description: "Evaluación económica y de proyectos", prerequisites: [], hours: 4 },
  { code: "25044", name: "Taller de Relaciones Interpersonales", semester: 10, description: "Desarrollo de habilidades interpersonales", prerequisites: [], hours: 2 },
  { code: "25048", name: "Teoría de Sistemas", semester: 11, description: "Fundamentos de la teoría de sistemas", prerequisites: [], hours: 5 },
  { code: "25049", name: "Teoría de Proyectos", semester: 11, description: "Teoría y gestión de proyectos", prerequisites: [], hours: 5 },
  { code: "25050", name: "Trabajo de Titulación", semester: 12, description: "Proyecto final de titulación", prerequisites: [], hours: 10 },
  { code: "25051", name: "Práctica Profesional", semester: 12, description: "Práctica profesional obligatoria", prerequisites: [], hours: 0 },
  
  // Métodos Computacionales
  { code: "25054", name: "Métodos Computacionales para la Física I", semester: 2, description: "Introducción a los métodos computacionales", prerequisites: [], hours: 4 },
  { code: "25055", name: "Métodos Computacionales para la Física II", semester: 6, description: "Métodos computacionales avanzados", prerequisites: ["25054"], hours: 4 },
  { code: "25056", name: "Métodos Computacionales y Estadísticos III", semester: 7, description: "Métodos computacionales y estadísticos avanzados", prerequisites: ["25055"], hours: 4 },
];

const LOCAL_STORAGE_KEY = 'approvedSubjects';

const Curriculum: React.FC = () => {
  const [semesters, setSemesters] = useState<number[]>([]);
  const [approvedSubjects, setApprovedSubjects] = useState<string[]>([]); // Lista de asignaturas aprobadas
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]); // Asignaturas seleccionadas para generar horario
  const [currentSemester, setCurrentSemester] = useState<number | null>(null); // Semestre seleccionado
  const [searchQuery, setSearchQuery] = useState(''); // Para la búsqueda
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // Modo oscuro

  // Cargar asignaturas aprobadas desde localStorage al iniciar
  useEffect(() => {
    const storedApprovedSubjects = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedApprovedSubjects) {
      setApprovedSubjects(JSON.parse(storedApprovedSubjects));
    }

    const uniqueSemesters = Array.from(new Set(subjects.map(subject => subject.semester)));
    setSemesters(uniqueSemesters.sort((a, b) => a - b));
  }, []);

  // Guardar las asignaturas aprobadas en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(approvedSubjects));
  }, [approvedSubjects]);

  // Manejar la selección de asignaturas aprobadas
  const handleApproveSubject = (code: string) => {
    if (approvedSubjects.includes(code)) {
      setApprovedSubjects(approvedSubjects.filter(subjectCode => subjectCode !== code));
    } else {
      setApprovedSubjects([...approvedSubjects, code]);
    }
  };

  // Seleccionar asignaturas en curso para generar horario
  const handleSelectSubject = (code: string) => {
    if (selectedSubjects.includes(code)) {
      setSelectedSubjects(selectedSubjects.filter(subjectCode => subjectCode !== code));
    } else {
      setSelectedSubjects([...selectedSubjects, code]);
    }
  };

  // Alternar entre modo claro y oscuro
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Barra de progreso
  const totalSubjects = subjects.length;
  const approvedSubjectsCount = approvedSubjects.length;
  const progressPercentage = (approvedSubjectsCount / totalSubjects) * 100;

  // Filtrar las asignaturas por búsqueda o semestre
  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          subject.code.includes(searchQuery);
    const matchesSemester = currentSemester === null || subject.semester === currentSemester;
    return matchesSearch && matchesSemester;
  });

  // Renderizar una asignatura (nodo visual)
  const createNode = (subject: Subject) => {
    const isApproved = approvedSubjects.includes(subject.code);
    const isUnlocked = subject.prerequisites && subject.prerequisites.every(prereq => approvedSubjects.includes(prereq));
    const isLocked = subject.prerequisites && subject.prerequisites.some(prereq => !approvedSubjects.includes(prereq));
    const isSelected = selectedSubjects.includes(subject.code);

    return (
      <div
        key={subject.code}
        className={`p-4 rounded-lg shadow-md cursor-pointer transition-transform ${
          isApproved
            ? 'bg-green-100 hover:bg-green-200'
            : isUnlocked
            ? 'bg-blue-100 hover:bg-blue-200'
            : isLocked
            ? 'bg-red-100 hover:bg-red-200'
            : 'bg-gray-100 hover:bg-gray-200'
        } ${isSelected ? 'border-4 border-blue-400' : ''} ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
        onClick={() => handleSelectSubject(subject.code)} // Seleccionar asignatura para generar horario
        onDoubleClick={() => handleApproveSubject(subject.code)} // Doble clic para marcar aprobada
      >
        <h3 className="font-semibold text-lg">{subject.name}</h3>
        <p className="text-sm">Código: {subject.code}</p>
        <p className="text-sm">Horas por semana: {subject.hours}</p>
      </div>
    );
  };

  // Renderizado de los semestres
  const renderSemester = (semester: number) => {
    const semesterSubjects = filteredSubjects.filter(subject => subject.semester === semester);
    return (
      <div key={semester} className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Semestre {semester}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {semesterSubjects.map(createNode)}
        </div>
      </div>
    );
  };

  return (
    <div className={`container mx-auto px-4 py-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      <h1 className="text-4xl font-bold mb-8 text-center">Malla Curricular</h1>

      {/* Descripción de uso */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">¿Cómo usar esta malla curricular?</h2>
        <p className="text-sm">
          Esta malla curricular interactiva te permite gestionar tu progreso académico.
          <ul className="list-disc pl-6 mt-2">
            <li><strong>Hacer clic en una asignatura</strong> para seleccionarla como en curso.</li>
            <li><strong>Hacer doble clic en una asignatura</strong> para marcarla como aprobada.</li>
            <li>Las asignaturas bloqueadas (en rojo) tienen prerrequisitos no cumplidos.</li>
            <li>Las asignaturas aprobadas (en verde) se marcarán automáticamente.</li>
          </ul>
        </p>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar asignatura por nombre o código"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      {/* Filtro por semestre */}
      <div className="mb-4">
        <label className="mr-2">Filtrar por semestre:</label>
        <select
          value={currentSemester ?? ''}
          onChange={(e) => setCurrentSemester(e.target.value ? parseInt(e.target.value) : null)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">Todos</option>
          {semesters.map(semester => (
            <option key={semester} value={semester}>
              Semestre {semester}
            </option>
          ))}
        </select>
      </div>

      {/* Indicador de progreso */}
      <div className="mb-8">
        <h2 className="text-lg font-bold">Progreso: {Math.round(progressPercentage)}%</h2>
        <div className="w-full bg-gray-300 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Botón para alternar entre modo claro y oscuro */}
      <div className="mb-8">
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-gray-300 rounded-md"
        >
          {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
        </button>
      </div>

      {/* Renderizado de los semestres */}
      {semesters.map(renderSemester)}

      {/* Footer con créditos */}
      <div className="text-center mt-8">
        <p className="text-sm font-semibold">
          Creado por Joaquín Riquelme, 2024
        </p>
      </div>
    </div>
  );
};

export default Curriculum;
