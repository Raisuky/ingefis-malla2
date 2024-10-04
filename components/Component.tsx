'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';

// Constants
const LOCAL_STORAGE_KEY = 'approvedSubjects';
const LOCAL_STORAGE_KEY_IN_PROGRESS = 'inProgressSubjects';
const LOCAL_STORAGE_GRADES_KEY = 'grades';

interface Subject {
  code: string;
  name: string;
  semester: number;
  description: string;
  prerequisites?: string[];
  hours: number;
  credits: number;
}

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

const Curriculum: React.FC = () => {
  const [semesters, setSemesters] = useState<number[]>([]);
  const [approvedSubjects, setApprovedSubjects] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [inProgressSubjects, setInProgressSubjects] = useState<string[]>([]);
  const [grades, setGrades] = useState<{ [code: string]: number }>({});
  const [currentSemester, setCurrentSemester] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  // Long press timer and duration
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const longPressDuration = 500;

  useEffect(() => {
    const storedApprovedSubjects = localStorage.getItem(LOCAL_STORAGE_KEY);
    const storedInProgressSubjects = localStorage.getItem(LOCAL_STORAGE_KEY_IN_PROGRESS);
    const storedGrades = localStorage.getItem(LOCAL_STORAGE_GRADES_KEY);
    if (storedApprovedSubjects) setApprovedSubjects(JSON.parse(storedApprovedSubjects));
    if (storedInProgressSubjects) setInProgressSubjects(JSON.parse(storedInProgressSubjects));
    if (storedGrades) setGrades(JSON.parse(storedGrades));

    const uniqueSemesters = Array.from(new Set(subjects.map(subject => subject.semester)));
    setSemesters(uniqueSemesters.sort((a, b) => a - b));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(approvedSubjects));
  }, [approvedSubjects]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_IN_PROGRESS, JSON.stringify(inProgressSubjects));
  }, [inProgressSubjects]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_GRADES_KEY, JSON.stringify(grades));
  }, [grades]);

  const handleApproveSubject = useCallback((code: string) => {
    if (window.confirm('¿Estás seguro de que quieres aprobar esta asignatura?')) {
      const grade = prompt('Ingresa la calificación para esta asignatura (entre 1.0 y 7.0):');
      const parsedGrade = parseFloat(grade || '');

      if (parsedGrade >= 1.0 && parsedGrade <= 7.0) {
        setGrades(prevGrades => ({ ...prevGrades, [code]: parsedGrade }));
        setApprovedSubjects(prevApproved => [...new Set([...prevApproved, code])]);
        setInProgressSubjects(prevInProgress => prevInProgress.filter(subjectCode => subjectCode !== code));
      } else {
        alert('Por favor, ingresa una calificación válida entre 1.0 y 7.0.');
      }
    }
  }, []);

  const handleInProgressSubject = useCallback((code: string) => {
    if (window.confirm('¿Estás seguro de que quieres marcar esta asignatura como en progreso?')) {
      setInProgressSubjects(prevInProgress => {
        if (prevInProgress.includes(code)) {
          return prevInProgress.filter(subjectCode => subjectCode !== code);
        } else {
          return [...prevInProgress, code];
        }
      });
    }
  }, []);

  const handleSelectSubject = useCallback((code: string) => {
    setSelectedSubjects(prevSelected => {
      if (prevSelected.includes(code)) {
        return prevSelected.filter(subjectCode => subjectCode !== code);
      } else {
        return [...prevSelected, code];
      }
    });
  }, []);

  const calculateWeightedAverage = useCallback(() => {
    let totalCredits = 0;
    let totalGrades = 0;

    approvedSubjects.forEach(code => {
      const subject = subjects.find(subject => subject.code === code);
      const grade = grades[code];
      if (subject && grade) {
        totalCredits += subject.credits;
        totalGrades += grade * subject.credits;
      }
    });

    return totalCredits > 0 ? (totalGrades / totalCredits).toFixed(2) : '0.00';
  }, [approvedSubjects, grades]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prevMode => !prevMode);
  }, []);

  const totalSubjects = subjects.length;
  const approvedSubjectsCount = approvedSubjects.length;
  const progressPercentage = (approvedSubjectsCount / totalSubjects) * 100;

  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.code.includes(searchQuery);
    const matchesSemester = currentSemester === null || subject.semester === currentSemester;
    return matchesSearch && matchesSemester;
  });

  const createNode = useCallback((subject: Subject) => {
    const isApproved = approvedSubjects.includes(subject.code);
    const isInProgress = inProgressSubjects.includes(subject.code);
    const isUnlocked = subject.prerequisites?.every(prereq => approvedSubjects.includes(prereq)) ?? true;
    const isLocked = subject.prerequisites?.some(prereq => !approvedSubjects.includes(prereq)) ?? false;
    const isSelected = selectedSubjects.includes(subject.code);

    const getBackgroundColor = () => {
      if (isApproved) return isDarkMode ? '#065f46' : '#d1fae5';
      if (isInProgress) return isDarkMode ? '#92400e' : '#fef3c7';
      if (isUnlocked) return isDarkMode ? '#1e40af' : '#dbeafe';
      if (isLocked) return isDarkMode ? '#991b1b' : '#fee2e2';
      return isDarkMode ? '#374151' : '#f3f4f6';
    };

    const style = {
      backgroundColor: getBackgroundColor(),
      border: isSelected ? '4px solid #60a5fa' : '1px solid #d1d5db',
      borderRadius: '0.375rem',
      padding: '1rem',
      cursor: 'pointer',
      transition: 'transform 0.2s',
      color: isDarkMode ? '#ffffff' : '#000000',
      position: 'relative' as const,
      userSelect: 'none' as const,
    };

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      handleSelectSubject(subject.code);
    };

    const handleDoubleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      handleApproveSubject(subject.code);
    };

    const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      handleInProgressSubject(subject.code);
    };

    const handleTouchStart = () => {
      longPressTimer.current = setTimeout(() => {
        handleInProgressSubject(subject.code);
      }, longPressDuration);
    };

    const handleTouchEnd = () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };

    const handleMouseEnter = () => setShowTooltip(subject.code);
    const handleMouseLeave = () => setShowTooltip(null);

    return (
      <div
        key={subject.code}
        style={style}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleContextMenu}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        tabIndex={0}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === 'Enter') handleClick(e);
          if (e.key === ' ') handleDoubleClick(e);
        }}
      >
        <h3 style={{ fontWeight: 600, fontSize: '1.125rem' }}>{subject.name}</h3>
        <p style={{ fontSize: '0.875rem' }}>Código: {subject.code}</p>
        <p style={{ fontSize: '0.875rem' }}>Horas por semana: {subject.hours}</p>
        <p style={{ fontSize: '0.875rem' }}>Créditos: {subject.credits}</p>
        {isApproved && <p style={{ fontSize: '0.875rem' }}>Calificación: {grades[subject.code]}</p>}
        {subject.prerequisites && subject.prerequisites.length > 0 && (
          <p style={{ fontSize: '0.875rem' }}>Prerrequisitos: {subject.prerequisites.join(', ')}</p>
        )}
        {isApproved && <span style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', fontSize: '1.5rem' }}>✅</span>}
        {isInProgress && <span style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', fontSize: '1.5rem' }}>🔄</span>}
        {showTooltip === subject.code && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            backgroundColor: isDarkMode ? '#4b5563' : '#ffffff',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            padding: '0.5rem',
            zIndex: 10,
            maxWidth: '200px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}>
            {subject.description}
          </div>
        )}
      </div>
    );
  }, [approvedSubjects, inProgressSubjects, selectedSubjects, grades, isDarkMode, handleSelectSubject, handleApproveSubject, handleInProgressSubject, showTooltip]);

  const renderSemester = useCallback((semester: number) => {
    const semesterSubjects = filteredSubjects.filter(subject => subject.semester === semester);
    return (
      <div key={semester} style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: isDarkMode ? '#ffffff' : '#000000' }}>Semestre {semester}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
          {semesterSubjects.map(createNode)}
        </div>
      </div>
    );
  }, [filteredSubjects, createNode, isDarkMode]);

  const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);
  const completedCredits = approvedSubjects.reduce((sum, code) => {
    const subject = subjects.find(s => s.code === code);
    return sum + (subject ? subject.credits : 0);
  }, 0);

  const exportProgress = () => {
    const csvContent = [
      ['Código', 'Nombre', 'Estado', 'Calificación'],
      ...subjects.map(subject => [
        subject.code,
        subject.name,
        approvedSubjects.includes(subject.code) ? 'Aprobado' : 
          inProgressSubjects.includes(subject.code) ? 'En Progreso' : 'Pendiente',
        grades[subject.code] || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "progreso_curriculum.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem',
      backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#000000',
      minHeight: '100vh',
    }}>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>Malla Curricular</h1>

      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>¿Cómo usar esta malla curricular?</h2>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', fontSize: '0.875rem' }}>
          <li><strong>Hacer clic en una asignatura</strong> para seleccionarla como en curso.</li>
          <li><strong>Hacer doble clic en una asignatura</strong> para marcarla como aprobada y agregar una calificación.</li>
          <li><strong>Hacer clic derecho (o mantener presionado en móviles)</strong> para marcar una asignatura como "en curso".</li>
          <li>Las asignaturas bloqueadas (en rojo) tienen prerrequisitos no cumplidos.</li>
          <li>Las asignaturas aprobadas (en verde) se marcarán automáticamente con su calificación.</li>
          <li>Las asignaturas en curso (en amarillo) se pueden marcar para seguimiento.</li>
        </ul>
      </div>

      <input
        type="text"
        placeholder="Buscar asignatura por nombre o código"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: '100%',
          padding: '0.5rem',
          marginBottom: '1rem',
          borderRadius: '0.25rem',
          border: '1px solid #d1d5db',
          backgroundColor: isDarkMode ? '#374151' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#000000'
        }}
      />

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="semester-select" style={{ marginRight: '0.5rem' }}>Filtrar por semestre:</label>
        <select
          id="semester-select"
          value={currentSemester?.toString() ?? ''}
          onChange={(e) => setCurrentSemester(e.target.value ? parseInt(e.target.value) : null)}
          style={{
            padding: '0.5rem',
            borderRadius: '0.25rem',
            border: '1px solid #d1d5db',
            backgroundColor: isDarkMode ? '#374151' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#000000'
          }}
        >
          <option value="">Todos</option>
          {semesters.map(semester => (
            <option key={semester} value={semester.toString()}>
              Semestre {semester}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>Progreso: {Math.round(progressPercentage)}%</h2>
        <div style={{
          width: '100%',
          backgroundColor: isDarkMode ? '#4b5563' : '#e5e7eb',
          borderRadius: '9999px',
          height: '0.5rem',
          overflow: 'hidden'
        }}>
          <div
            style={{
              width: `${progressPercentage}%`,
              backgroundColor: '#3b82f6',
              height: '100%',
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>Promedio Ponderado Acumulado: {calculateWeightedAverage()}</h2>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>Resumen de Créditos</h2>
        <p>Créditos Completados: {completedCredits} / {totalCredits}</p>
        <p>Créditos Restantes: {totalCredits - completedCredits}</p>
      </div>

      <button
        onClick={toggleDarkMode}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: isDarkMode ? '#4b5563' : '#e5e7eb',
          color: isDarkMode ? '#ffffff' : '#000000',
          border: 'none',
          borderRadius: '0.25rem',
          cursor: 'pointer',
          marginBottom: '1rem',
          marginRight: '1rem'
        }}
      >
        {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
      </button>

      <button
        onClick={exportProgress}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          border: 'none',
          borderRadius: '0.25rem',
          cursor: 'pointer',
          marginBottom: '2rem'
        }}
      >
        Exportar Progreso (CSV)
      </button>

      {semesters.map(renderSemester)}

      <footer style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>
          Made by <a href="https://github.com/Raisuky/" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>Raisuky</a>, 2024
        </p>
      </footer>
    </div>
  );
};

export default Curriculum;
