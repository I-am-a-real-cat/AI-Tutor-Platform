import React, { useState } from 'react';
import { 
  Users, Plus, Search, Calendar, Clock, MessageCircle, 
  Share2, Trophy, Target, BookOpen, User, Settings,
  ChevronRight, Star, Award, TrendingUp
} from 'lucide-react';

interface StudyGroupsProps {
  darkMode: boolean;
}

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  subject: string;
  members: GroupMember[];
  maxMembers: number;
  createdBy: string;
  createdAt: Date;
  nextSession?: Date;
  totalSessions: number;
  averageScore: number;
  isPrivate: boolean;
  goals: GroupGoal[];
}

interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  role: 'admin' | 'moderator' | 'member';
  joinDate: Date;
  contribution: number;
  studyHours: number;
}

interface GroupGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: Date;
  completed: boolean;
}

interface StudySession {
  id: string;
  groupId: string;
  title: string;
  date: Date;
  duration: number;
  attendees: string[];
  materials: string[];
  notes: string;
}

export const StudyGroups: React.FC<StudyGroupsProps> = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState<'my-groups' | 'discover' | 'sessions'>('my-groups');
  const [selectedGroup, setSelectedGroup] = useState<StudyGroup | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const myGroups: StudyGroup[] = [
    {
      id: '1',
      name: 'Advanced Calculus Study Circle',
      description: 'Weekly sessions focusing on advanced calculus concepts and problem-solving techniques.',
      subject: 'Mathematics',
      members: [
        { id: '1', name: 'Alex Johnson', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', role: 'admin', joinDate: new Date('2024-11-01'), contribution: 95, studyHours: 45 },
        { id: '2', name: 'Sarah Chen', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', role: 'member', joinDate: new Date('2024-11-05'), contribution: 88, studyHours: 38 },
        { id: '3', name: 'Mike Rodriguez', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', role: 'member', joinDate: new Date('2024-11-10'), contribution: 92, studyHours: 42 }
      ],
      maxMembers: 8,
      createdBy: 'Alex Johnson',
      createdAt: new Date('2024-11-01'),
      nextSession: new Date('2024-12-18T15:00:00'),
      totalSessions: 12,
      averageScore: 87,
      isPrivate: false,
      goals: [
        { id: '1', title: 'Complete Chapter 5', target: 100, current: 75, deadline: new Date('2024-12-25'), completed: false },
        { id: '2', title: 'Group Study Hours', target: 200, current: 125, deadline: new Date('2024-12-31'), completed: false }
      ]
    },
    {
      id: '2',
      name: 'Quantum Physics Explorers',
      description: 'Dive deep into quantum mechanics with fellow physics enthusiasts.',
      subject: 'Physics',
      members: [
        { id: '1', name: 'Alex Johnson', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', role: 'member', joinDate: new Date('2024-10-15'), contribution: 82, studyHours: 32 },
        { id: '4', name: 'Emily Watson', avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', role: 'admin', joinDate: new Date('2024-10-01'), contribution: 96, studyHours: 55 }
      ],
      maxMembers: 6,
      createdBy: 'Emily Watson',
      createdAt: new Date('2024-10-01'),
      nextSession: new Date('2024-12-19T14:00:00'),
      totalSessions: 8,
      averageScore: 84,
      isPrivate: true,
      goals: [
        { id: '3', title: 'Master Wave Functions', target: 50, current: 35, deadline: new Date('2024-12-30'), completed: false }
      ]
    }
  ];

  const availableGroups: StudyGroup[] = [
    {
      id: '3',
      name: 'Organic Chemistry Masters',
      description: 'Master organic chemistry reactions and mechanisms together.',
      subject: 'Chemistry',
      members: [
        { id: '5', name: 'David Kim', avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', role: 'admin', joinDate: new Date('2024-11-20'), contribution: 90, studyHours: 40 }
      ],
      maxMembers: 10,
      createdBy: 'David Kim',
      createdAt: new Date('2024-11-20'),
      nextSession: new Date('2024-12-20T16:00:00'),
      totalSessions: 5,
      averageScore: 89,
      isPrivate: false,
      goals: []
    }
  ];

  const upcomingSessions: StudySession[] = [
    {
      id: '1',
      groupId: '1',
      title: 'Integration Techniques Workshop',
      date: new Date('2024-12-18T15:00:00'),
      duration: 120,
      attendees: ['1', '2', '3'],
      materials: ['Chapter 5 Notes', 'Practice Problems'],
      notes: 'Focus on integration by parts and substitution methods'
    },
    {
      id: '2',
      groupId: '2',
      title: 'Quantum Entanglement Discussion',
      date: new Date('2024-12-19T14:00:00'),
      duration: 90,
      attendees: ['1', '4'],
      materials: ['Research Papers', 'Video Lectures'],
      notes: 'Explore Bell\'s theorem and experimental evidence'
    }
  ];

  const getSubjectColor = (subject: string) => {
    const colors = {
      'Mathematics': 'from-blue-500 to-blue-600',
      'Physics': 'from-purple-500 to-purple-600',
      'Chemistry': 'from-green-500 to-green-600',
      'Biology': 'from-emerald-500 to-emerald-600'
    };
    return colors[subject as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'moderator': return 'bg-blue-100 text-blue-800';
      case 'member': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedGroup) {
    return (
      <div className="space-y-6">
        {/* Group Header */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSelectedGroup(null)}
            className={`p-2 rounded-lg transition-colors ${
              darkMode 
                ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <div className="flex-1">
            <h1 className={`text-2xl font-bold transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>{selectedGroup.name}</h1>
            <p className={`transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>{selectedGroup.description}</p>
          </div>
          <button className={`p-2 rounded-lg transition-colors ${
            darkMode 
              ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
          }`}>
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Group Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className={`border rounded-xl p-6 transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-blue-600">{selectedGroup.members.length}</span>
            </div>
            <h3 className={`font-semibold transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Members</h3>
            <p className={`text-sm transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>of {selectedGroup.maxMembers} max</p>
          </div>

          <div className={`border rounded-xl p-6 transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-green-600">{selectedGroup.totalSessions}</span>
            </div>
            <h3 className={`font-semibold transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Sessions</h3>
            <p className={`text-sm transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Completed</p>
          </div>

          <div className={`border rounded-xl p-6 transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-purple-600">{selectedGroup.averageScore}%</span>
            </div>
            <h3 className={`font-semibold transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Avg Score</h3>
            <p className={`text-sm transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Group performance</p>
          </div>

          <div className={`border rounded-xl p-6 transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-2xl font-bold text-yellow-600">{selectedGroup.goals.length}</span>
            </div>
            <h3 className={`font-semibold transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Active Goals</h3>
            <p className={`text-sm transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>In progress</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Members */}
          <div className={`border rounded-xl p-6 transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h2 className={`text-xl font-semibold mb-6 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Group Members</h2>

            <div className="space-y-4">
              {selectedGroup.members.map((member) => (
                <div key={member.id} className={`border rounded-lg p-4 transition-colors duration-300 ${
                  darkMode ? 'border-gray-600' : 'border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className={`font-semibold transition-colors duration-300 ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>{member.name}</h3>
                        <p className={`text-sm transition-colors duration-300 ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>Joined {member.joinDate.toLocaleDateString()}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(member.role)}`}>
                      {member.role}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className={`transition-colors duration-300 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>Contribution</span>
                      <div className={`font-semibold transition-colors duration-300 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>{member.contribution}%</div>
                    </div>
                    <div>
                      <span className={`transition-colors duration-300 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>Study Hours</span>
                      <div className={`font-semibold transition-colors duration-300 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>{member.studyHours}h</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Group Goals */}
          <div className={`border rounded-xl p-6 transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-semibold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Group Goals</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Add Goal
              </button>
            </div>

            <div className="space-y-4">
              {selectedGroup.goals.map((goal) => {
                const progress = (goal.current / goal.target) * 100;
                const daysLeft = Math.ceil((goal.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <div key={goal.id} className={`border rounded-lg p-4 transition-colors duration-300 ${
                    darkMode ? 'border-gray-600' : 'border-gray-200'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className={`font-semibold transition-colors duration-300 ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>{goal.title}</h3>
                        <p className={`text-sm transition-colors duration-300 ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {goal.current} / {goal.target} • {daysLeft} days left
                        </p>
                      </div>
                      <span className={`text-lg font-bold transition-colors duration-300 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {Math.round(progress)}%
                      </span>
                    </div>

                    <div className={`w-full rounded-full h-2 transition-colors duration-300 ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <div
                        className="h-2 rounded-full bg-blue-500 transition-all duration-500"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Study Groups</h1>
          <p className={`transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Collaborate and learn together</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Create Group
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {[
          { id: 'my-groups', label: 'My Groups' },
          { id: 'discover', label: 'Discover' },
          { id: 'sessions', label: 'Sessions' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 px-4 py-2 rounded-md font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : darkMode
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      {(activeTab === 'discover' || activeTab === 'my-groups') && (
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-400'
          }`} />
          <input
            type="text"
            placeholder="Search groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-300 ${
              darkMode 
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>
      )}

      {/* Content */}
      {activeTab === 'my-groups' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myGroups.map((group) => (
            <div
              key={group.id}
              onClick={() => setSelectedGroup(group)}
              className={`group cursor-pointer border rounded-xl p-6 hover:border-blue-400 hover:shadow-lg transition-all duration-200 ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getSubjectColor(group.subject)} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  {group.isPrivate && (
                    <div className="w-2 h-2 bg-yellow-400 rounded-full" title="Private Group"></div>
                  )}
                  <span className={`text-sm transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>{group.subject}</span>
                </div>
              </div>

              <h3 className={`text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {group.name}
              </h3>
              <p className={`text-sm mb-4 line-clamp-2 transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>{group.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex -space-x-2">
                  {group.members.slice(0, 3).map((member) => (
                    <img
                      key={member.id}
                      src={member.avatar}
                      alt={member.name}
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                  {group.members.length > 3 && (
                    <div className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium transition-colors duration-300 ${
                      darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                    }`}>
                      +{group.members.length - 3}
                    </div>
                  )}
                </div>
                <span className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {group.members.length}/{group.maxMembers} members
                </span>
              </div>

              {group.nextSession && (
                <div className={`flex items-center text-sm mb-4 transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Next: {group.nextSession.toLocaleDateString()} at {group.nextSession.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-opacity-20 border-gray-300">
                <div className="flex items-center space-x-4 text-sm">
                  <span className={`flex items-center transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Trophy className="w-4 h-4 mr-1" />
                    {group.averageScore}%
                  </span>
                  <span className={`flex items-center transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Calendar className="w-4 h-4 mr-1" />
                    {group.totalSessions}
                  </span>
                </div>
                <ChevronRight className={`w-4 h-4 group-hover:text-blue-500 transition-colors ${
                  darkMode ? 'text-gray-400' : 'text-gray-400'
                }`} />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'discover' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableGroups.map((group) => (
            <div
              key={group.id}
              className={`border rounded-xl p-6 hover:border-blue-400 hover:shadow-lg transition-all duration-200 ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getSubjectColor(group.subject)} flex items-center justify-center`}>
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>{group.subject}</span>
              </div>

              <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {group.name}
              </h3>
              <p className={`text-sm mb-4 transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>{group.description}</p>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className={`transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Members</span>
                  <span className={`transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>{group.members.length}/{group.maxMembers}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Sessions</span>
                  <span className={`transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>{group.totalSessions}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Avg Score</span>
                  <span className={`transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>{group.averageScore}%</span>
                </div>
              </div>

              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Join Group
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'sessions' && (
        <div className="space-y-6">
          <h2 className={`text-xl font-semibold transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Upcoming Sessions</h2>

          <div className="space-y-4">
            {upcomingSessions.map((session) => {
              const group = myGroups.find(g => g.id === session.groupId);
              return (
                <div key={session.id} className={`border rounded-xl p-6 transition-colors duration-300 ${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getSubjectColor(group?.subject || 'Mathematics')} flex items-center justify-center`}>
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>{session.title}</h3>
                        <p className={`text-sm transition-colors duration-300 ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>{group?.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium transition-colors duration-300 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {session.date.toLocaleDateString()}
                      </div>
                      <div className={`text-sm transition-colors duration-300 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {session.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <span className={`text-sm font-medium transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>Duration</span>
                      <p className={`transition-colors duration-300 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>{session.duration} minutes</p>
                    </div>
                    <div>
                      <span className={`text-sm font-medium transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>Attendees</span>
                      <p className={`transition-colors duration-300 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>{session.attendees.length} confirmed</p>
                    </div>
                    <div>
                      <span className={`text-sm font-medium transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>Materials</span>
                      <p className={`transition-colors duration-300 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>{session.materials.length} items</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className={`text-sm font-medium transition-colors duration-300 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>Session Notes:</span>
                    <p className={`text-sm mt-1 transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>{session.notes}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Join Session
                      </button>
                      <button className={`px-4 py-2 border rounded-lg transition-colors ${
                        darkMode 
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}>
                        View Materials
                      </button>
                    </div>
                    <button className={`p-2 rounded-lg transition-colors ${
                      darkMode 
                        ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                    }`}>
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};