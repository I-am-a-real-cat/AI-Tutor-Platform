import { AcademicLevel, CoreSubject, Topic, DailyQuiz } from '../types/learning';

export const academicLevels: AcademicLevel[] = [
  {
    id: 'high_school',
    name: 'High School',
    description: 'Grades 9-12 curriculum covering foundational subjects',
    subjects: ['mathematics', 'english', 'physics', 'chemistry', 'biology', 'history']
  },
  {
    id: 'university',
    name: 'University',
    description: 'Advanced undergraduate courses and specialized subjects',
    subjects: ['advanced_mathematics', 'literature', 'advanced_physics', 'organic_chemistry', 'computer_science', 'economics']
  }
];

export const coreSubjects: CoreSubject[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    code: 'MATH-101',
    description: 'Comprehensive mathematics covering algebra, geometry, trigonometry, and pre-calculus',
    icon: 'Calculator',
    color: 'from-blue-500 to-blue-600',
    academicLevel: 'high_school',
    topics: [
      {
        id: 'algebra',
        name: 'Algebra',
        description: 'Linear equations, quadratic functions, and polynomial operations',
        subjectId: 'mathematics',
        order: 1,
        lessons: [],
        isCompleted: false,
        progress: 75,
        estimatedTime: 120
      },
      {
        id: 'geometry',
        name: 'Geometry',
        description: 'Shapes, angles, area, volume, and geometric proofs',
        subjectId: 'mathematics',
        order: 2,
        lessons: [],
        isCompleted: false,
        progress: 45,
        estimatedTime: 100
      },
      {
        id: 'trigonometry',
        name: 'Trigonometry',
        description: 'Sine, cosine, tangent functions and their applications',
        subjectId: 'mathematics',
        order: 3,
        lessons: [],
        isCompleted: false,
        progress: 20,
        estimatedTime: 80
      }
    ],
    totalLessons: 45,
    estimatedHours: 60,
    difficulty: 'intermediate'
  },
  {
    id: 'advanced_mathematics',
    name: 'Advanced Mathematics',
    code: 'MATH-301',
    description: 'Calculus, differential equations, linear algebra, and advanced mathematical concepts',
    icon: 'Calculator',
    color: 'from-purple-500 to-purple-600',
    academicLevel: 'university',
    topics: [
      {
        id: 'calculus',
        name: 'Calculus',
        description: 'Limits, derivatives, integrals, and their applications',
        subjectId: 'advanced_mathematics',
        order: 1,
        lessons: [],
        isCompleted: false,
        progress: 60,
        estimatedTime: 150
      },
      {
        id: 'linear_algebra',
        name: 'Linear Algebra',
        description: 'Vectors, matrices, eigenvalues, and vector spaces',
        subjectId: 'advanced_mathematics',
        order: 2,
        lessons: [],
        isCompleted: false,
        progress: 30,
        estimatedTime: 120
      }
    ],
    totalLessons: 60,
    estimatedHours: 90,
    difficulty: 'advanced',
    prerequisites: ['mathematics']
  },
  {
    id: 'english',
    name: 'English Language',
    code: 'ENG-101',
    description: 'Grammar, composition, reading comprehension, and communication skills',
    icon: 'BookOpen',
    color: 'from-green-500 to-green-600',
    academicLevel: 'high_school',
    topics: [
      {
        id: 'grammar',
        name: 'Grammar & Syntax',
        description: 'Parts of speech, sentence structure, and proper usage',
        subjectId: 'english',
        order: 1,
        lessons: [],
        isCompleted: true,
        progress: 100,
        estimatedTime: 80
      },
      {
        id: 'composition',
        name: 'Writing & Composition',
        description: 'Essay writing, paragraph structure, and style',
        subjectId: 'english',
        order: 2,
        lessons: [],
        isCompleted: false,
        progress: 65,
        estimatedTime: 100
      },
      {
        id: 'literature',
        name: 'Literature Analysis',
        description: 'Reading comprehension, literary devices, and critical analysis',
        subjectId: 'english',
        order: 3,
        lessons: [],
        isCompleted: false,
        progress: 40,
        estimatedTime: 90
      }
    ],
    totalLessons: 40,
    estimatedHours: 50,
    difficulty: 'intermediate'
  },
  {
    id: 'physics',
    name: 'Physics',
    code: 'PHYS-101',
    description: 'Mechanics, thermodynamics, waves, and electricity & magnetism',
    icon: 'Atom',
    color: 'from-red-500 to-red-600',
    academicLevel: 'high_school',
    topics: [
      {
        id: 'mechanics',
        name: 'Classical Mechanics',
        description: 'Motion, forces, energy, and momentum',
        subjectId: 'physics',
        order: 1,
        lessons: [],
        isCompleted: false,
        progress: 55,
        estimatedTime: 120
      },
      {
        id: 'thermodynamics',
        name: 'Thermodynamics',
        description: 'Heat, temperature, and energy transfer',
        subjectId: 'physics',
        order: 2,
        lessons: [],
        isCompleted: false,
        progress: 25,
        estimatedTime: 100
      }
    ],
    totalLessons: 50,
    estimatedHours: 70,
    difficulty: 'advanced',
    prerequisites: ['mathematics']
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    code: 'CHEM-101',
    description: 'Atomic structure, chemical bonding, reactions, and stoichiometry',
    icon: 'FlaskConical',
    color: 'from-yellow-500 to-yellow-600',
    academicLevel: 'high_school',
    topics: [
      {
        id: 'atomic_structure',
        name: 'Atomic Structure',
        description: 'Atoms, electrons, protons, neutrons, and periodic table',
        subjectId: 'chemistry',
        order: 1,
        lessons: [],
        isCompleted: true,
        progress: 100,
        estimatedTime: 90
      },
      {
        id: 'chemical_bonding',
        name: 'Chemical Bonding',
        description: 'Ionic, covalent, and metallic bonds',
        subjectId: 'chemistry',
        order: 2,
        lessons: [],
        isCompleted: false,
        progress: 70,
        estimatedTime: 110
      }
    ],
    totalLessons: 45,
    estimatedHours: 65,
    difficulty: 'intermediate'
  },
  {
    id: 'biology',
    name: 'Biology',
    code: 'BIO-101',
    description: 'Cell biology, genetics, evolution, and ecology',
    icon: 'Dna',
    color: 'from-emerald-500 to-emerald-600',
    academicLevel: 'high_school',
    topics: [
      {
        id: 'cell_biology',
        name: 'Cell Biology',
        description: 'Cell structure, organelles, and cellular processes',
        subjectId: 'biology',
        order: 1,
        lessons: [],
        isCompleted: false,
        progress: 80,
        estimatedTime: 100
      },
      {
        id: 'genetics',
        name: 'Genetics',
        description: 'DNA, RNA, inheritance, and genetic variation',
        subjectId: 'biology',
        order: 2,
        lessons: [],
        isCompleted: false,
        progress: 35,
        estimatedTime: 120
      }
    ],
    totalLessons: 42,
    estimatedHours: 60,
    difficulty: 'intermediate'
  }
];

export const dailyQuizzes: DailyQuiz[] = [
  {
    id: 'quiz-math-today',
    date: new Date(),
    subjectId: 'mathematics',
    questions: [
      {
        id: 'q1',
        question: 'Solve for x: 2x + 5 = 13',
        type: 'multiple_choice',
        options: ['3', '4', '5', '6'],
        correctAnswer: 1,
        explanation: '2x + 5 = 13, so 2x = 8, therefore x = 4',
        difficulty: 'easy',
        points: 10
      },
      {
        id: 'q2',
        question: 'What is the area of a circle with radius 5?',
        type: 'multiple_choice',
        options: ['25π', '10π', '5π', '50π'],
        correctAnswer: 0,
        explanation: 'Area = πr² = π(5)² = 25π',
        difficulty: 'medium',
        points: 15
      }
    ],
    timeLimit: 300,
    isCompleted: false,
    streak: 7
  }
];