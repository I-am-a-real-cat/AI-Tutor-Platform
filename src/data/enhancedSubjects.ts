import { EnhancedSubject, Instructor, Assignment, Material, Announcement } from '../types/subjects';

const instructors: Instructor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    email: 'sarah.chen@university.edu',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    title: 'Professor of Mathematics',
    department: 'Mathematics Department',
    bio: 'Dr. Chen specializes in advanced calculus and mathematical analysis with over 15 years of teaching experience.',
    officeHours: 'Mon, Wed, Fri 2:00-4:00 PM',
    officeLocation: 'Math Building, Room 301'
  },
  {
    id: '2',
    name: 'Prof. Michael Rodriguez',
    email: 'michael.rodriguez@university.edu',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    title: 'Associate Professor of Physics',
    department: 'Physics Department',
    bio: 'Prof. Rodriguez focuses on quantum mechanics and theoretical physics research.',
    officeHours: 'Tue, Thu 1:00-3:00 PM',
    officeLocation: 'Physics Building, Room 205'
  },
  {
    id: '3',
    name: 'Dr. Emily Watson',
    email: 'emily.watson@university.edu',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    title: 'Professor of Chemistry',
    department: 'Chemistry Department',
    bio: 'Dr. Watson is an expert in organic chemistry and biochemical processes.',
    officeHours: 'Mon, Wed 10:00 AM-12:00 PM',
    officeLocation: 'Chemistry Building, Room 150'
  }
];

export const enhancedSubjects: EnhancedSubject[] = [
  {
    id: 'math',
    name: 'Advanced Calculus',
    code: 'MATH 301',
    description: 'Advanced topics in differential and integral calculus, including multivariable calculus, vector analysis, and differential equations.',
    instructor: instructors[0],
    credits: 4,
    semester: 'Fall',
    year: 2024,
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      time: '10:00 AM - 11:00 AM',
      location: 'Math Building, Room 101'
    },
    enrollmentStatus: 'enrolled',
    capacity: {
      current: 28,
      max: 30
    },
    prerequisites: ['MATH 201', 'MATH 202'],
    materials: [
      {
        id: '1',
        title: 'Calculus: Early Transcendentals',
        type: 'pdf',
        url: '#',
        uploadDate: new Date('2024-08-15'),
        size: '15.2 MB',
        description: 'Main textbook for the course'
      },
      {
        id: '2',
        title: 'Lecture 1: Limits and Continuity',
        type: 'video',
        url: '#',
        uploadDate: new Date('2024-09-01'),
        description: 'Introduction to advanced limit concepts'
      }
    ],
    assignments: [
      {
        id: '1',
        title: 'Problem Set 1: Derivatives',
        description: 'Complete problems 1-20 from Chapter 3',
        dueDate: new Date('2024-12-20'),
        maxPoints: 100,
        submissionType: 'file',
        status: 'active',
        grade: 85,
        feedback: 'Good work on most problems. Review chain rule applications.'
      },
      {
        id: '2',
        title: 'Midterm Exam',
        description: 'Comprehensive exam covering chapters 1-5',
        dueDate: new Date('2024-12-25'),
        maxPoints: 200,
        submissionType: 'quiz',
        status: 'upcoming'
      }
    ],
    announcements: [
      {
        id: '1',
        title: 'Office Hours Change',
        content: 'Office hours for this week will be moved to Thursday 2-4 PM due to conference attendance.',
        author: 'Dr. Sarah Chen',
        publishDate: new Date('2024-12-10'),
        priority: 'medium',
        isRead: false
      }
    ],
    grades: {
      current: 87.5,
      breakdown: {
        assignments: 85,
        midterm: 90,
        final: 0,
        participation: 95
      }
    },
    progress: {
      completedTopics: 18,
      totalTopics: 24,
      lastAccessed: new Date('2024-12-15')
    },
    color: 'from-blue-500 to-blue-600',
    difficulty: 'Advanced'
  },
  {
    id: 'physics',
    name: 'Quantum Mechanics',
    code: 'PHYS 401',
    description: 'Introduction to quantum mechanics, wave functions, Schrödinger equation, and quantum systems.',
    instructor: instructors[1],
    credits: 4,
    semester: 'Fall',
    year: 2024,
    schedule: {
      days: ['Tuesday', 'Thursday'],
      time: '2:00 PM - 3:30 PM',
      location: 'Physics Building, Room 201'
    },
    enrollmentStatus: 'enrolled',
    capacity: {
      current: 25,
      max: 25
    },
    prerequisites: ['PHYS 301', 'MATH 301'],
    materials: [
      {
        id: '3',
        title: 'Introduction to Quantum Mechanics',
        type: 'pdf',
        url: '#',
        uploadDate: new Date('2024-08-20'),
        size: '22.1 MB',
        description: 'Primary textbook by Griffiths'
      }
    ],
    assignments: [
      {
        id: '3',
        title: 'Wave Function Analysis',
        description: 'Analyze the given wave functions and calculate probabilities',
        dueDate: new Date('2024-12-22'),
        maxPoints: 150,
        submissionType: 'file',
        status: 'active'
      }
    ],
    announcements: [
      {
        id: '2',
        title: 'Lab Equipment Update',
        content: 'New quantum simulation software has been installed in the lab computers.',
        author: 'Prof. Michael Rodriguez',
        publishDate: new Date('2024-12-12'),
        priority: 'low',
        isRead: true
      }
    ],
    grades: {
      current: 82.0,
      breakdown: {
        assignments: 80,
        midterm: 85,
        final: 0,
        participation: 88
      }
    },
    progress: {
      completedTopics: 12,
      totalTopics: 20,
      lastAccessed: new Date('2024-12-14')
    },
    color: 'from-purple-500 to-purple-600',
    difficulty: 'Advanced'
  },
  {
    id: 'chemistry',
    name: 'Organic Chemistry II',
    code: 'CHEM 302',
    description: 'Advanced organic chemistry covering reaction mechanisms, synthesis, and spectroscopy.',
    instructor: instructors[2],
    credits: 3,
    semester: 'Fall',
    year: 2024,
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      time: '9:00 AM - 10:00 AM',
      location: 'Chemistry Building, Room 120'
    },
    enrollmentStatus: 'enrolled',
    capacity: {
      current: 22,
      max: 24
    },
    prerequisites: ['CHEM 301'],
    materials: [
      {
        id: '4',
        title: 'Organic Chemistry Textbook',
        type: 'pdf',
        url: '#',
        uploadDate: new Date('2024-08-18'),
        size: '18.7 MB',
        description: 'Comprehensive organic chemistry reference'
      }
    ],
    assignments: [
      {
        id: '4',
        title: 'Synthesis Pathways',
        description: 'Design synthesis pathways for the given target molecules',
        dueDate: new Date('2024-12-21'),
        maxPoints: 120,
        submissionType: 'file',
        status: 'active'
      }
    ],
    announcements: [
      {
        id: '3',
        title: 'Final Exam Schedule',
        content: 'The final exam will be held on December 18th at 2:00 PM in the main lecture hall.',
        author: 'Dr. Emily Watson',
        publishDate: new Date('2024-12-08'),
        priority: 'high',
        isRead: false
      }
    ],
    grades: {
      current: 91.2,
      breakdown: {
        assignments: 92,
        midterm: 89,
        final: 0,
        participation: 95
      }
    },
    progress: {
      completedTopics: 15,
      totalTopics: 18,
      lastAccessed: new Date('2024-12-13')
    },
    color: 'from-green-500 to-green-600',
    difficulty: 'Intermediate'
  }
];