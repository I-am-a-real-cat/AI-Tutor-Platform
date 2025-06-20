import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Subject } from '../types';
import { Send, Brain, Lightbulb, MessageCircle, Sparkles, ArrowLeft } from 'lucide-react';
import { generateAIResponse } from '../utils/aiSimulator';
import { AITutorInterface } from './ai/AITutorInterface';
import { StudyPage } from './study/StudyPage';

interface TutorChatProps {
  selectedSubject?: Subject;
  onBack: () => void;
  darkMode: boolean;
  onNavigateToSubjects?: () => void;
  onCreateSubject?: (subject: Subject) => void;
}

export const TutorChat: React.FC<TutorChatProps> = ({ 
  selectedSubject, 
  onBack, 
  darkMode, 
  onNavigateToSubjects,
  onCreateSubject
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showInterface, setShowInterface] = useState(true);
  const [showStudyPage, setShowStudyPage] = useState(false);
  const [studySubject, setStudySubject] = useState<Subject | null>(null);
  const [studyModuleId, setStudyModuleId] = useState<string | undefined>();
  const [studyLessonId, setStudyLessonId] = useState<string | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleStartChat = () => {
    setShowInterface(false);
    const welcomeMessage: ChatMessage = {
      id: '1',
      type: 'ai',
      content: `Hello! I'm your AI tutor${selectedSubject ? ` for ${selectedSubject.name}` : ''}. I'm here to help you understand concepts, work through problems, and answer any questions you have. What would you like to learn about today?`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  const handleNavigateToStudy = (subject: Subject, moduleId?: string, lessonId?: string) => {
    setStudySubject(subject);
    setStudyModuleId(moduleId);
    setStudyLessonId(lessonId);
    setShowStudyPage(true);
    setShowInterface(false);
  };

  const handleBackFromStudy = () => {
    setShowStudyPage(false);
    setShowInterface(true);
    setStudySubject(null);
    setStudyModuleId(undefined);
    setStudyLessonId(undefined);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      subject: selectedSubject?.name
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(inputValue, selectedSubject?.name);
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        subject: selectedSubject?.name
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "Can you explain this concept step by step?",
    "What are some real-world applications?",
    "I'm struggling with this problem...",
    "Can you give me practice problems?"
  ];

  // Show study page if navigated to specific content
  if (showStudyPage && studySubject) {
    return (
      <StudyPage 
        subject={studySubject}
        onBack={handleBackFromStudy}
        darkMode={darkMode}
        moduleId={studyModuleId}
        lessonId={studyLessonId}
      />
    );
  }

  // Show the main interface if no chat has started
  if (showInterface) {
    return (
      <AITutorInterface 
        darkMode={darkMode} 
        onStartChat={handleStartChat}
        onNavigateToSubjects={onNavigateToSubjects}
        onNavigateToDashboard={onBack}
        onNavigateToStudy={handleNavigateToStudy}
        onCreateSubject={onCreateSubject}
      />
    );
  }

  // Show chat interface without navbar
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className={`border rounded-xl shadow-sm h-[calc(100vh-48px)] flex flex-col transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          {/* Chat Header */}
          <div className={`border-b p-6 transition-colors duration-300 ${
            darkMode ? 'border-gray-700' : 'border-gray-100'
          }`}>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowInterface(true)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-lg font-semibold transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>AI Tutor</h1>
                {selectedSubject && (
                  <p className={`text-sm transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>{selectedSubject.name}</p>
                )}
              </div>
              <div className="ml-auto flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Online</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                  message.type === 'user' ? 'order-2' : 'order-1'
                }`}>
                  {message.type === 'ai' && (
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                      <span className={`text-xs font-medium transition-colors duration-300 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>AI Tutor</span>
                    </div>
                  )}
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : darkMode
                        ? 'bg-gray-700 text-gray-100 border border-gray-600'
                        : 'bg-gray-100 text-gray-900 border border-gray-200'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>
                  <p className={`text-xs mt-1 px-1 transition-colors duration-300 ${
                    darkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-xs lg:max-w-md xl:max-w-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                    <span className={`text-xs font-medium transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>AI Tutor</span>
                  </div>
                  <div className={`px-4 py-3 rounded-2xl border transition-colors duration-300 ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-200'
                  }`}>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className={`px-6 py-4 border-t transition-colors duration-300 ${
              darkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-100 bg-gray-50'
            }`}>
              <p className={`text-sm mb-3 flex items-center transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <MessageCircle className="w-4 h-4 mr-2" />
                Try asking:
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputValue(question);
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                    className={`px-3 py-2 text-sm border rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors ${
                      darkMode 
                        ? 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-blue-900 hover:text-blue-200' 
                        : 'bg-white text-gray-700 border-gray-200'
                    }`}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className={`p-6 border-t transition-colors duration-300 ${
            darkMode ? 'border-gray-700' : 'border-gray-100'
          }`}>
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none text-sm transition-colors duration-300 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  rows={1}
                  style={{ minHeight: '44px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};