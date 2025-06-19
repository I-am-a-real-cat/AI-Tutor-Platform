import React, { useState } from 'react';
import { 
  MessageSquare, Users, Search, Plus, Pin, Lock, 
  ThumbsUp, Reply, Clock, Filter, TrendingUp, Star,
  ChevronRight, Send, Paperclip, Hash
} from 'lucide-react';
import { DiscussionForum, ForumPost } from '../../types/learning';

interface DiscussionForumsProps {
  darkMode: boolean;
}

export const DiscussionForums: React.FC<DiscussionForumsProps> = ({ darkMode }) => {
  const [selectedForum, setSelectedForum] = useState<DiscussionForum | null>(null);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [replyContent, setReplyContent] = useState('');

  const forums: DiscussionForum[] = [
    {
      id: '1',
      subjectId: 'mathematics',
      title: 'Mathematics Discussion',
      description: 'Discuss calculus, algebra, geometry, and other math topics',
      posts: [
        {
          id: '1',
          forumId: '1',
          authorId: '1',
          authorName: 'Alex Johnson',
          authorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
          content: 'Can someone help me understand the chain rule in calculus? I\'m having trouble with composite functions.',
          createdAt: new Date('2024-12-15T10:30:00'),
          likes: 12,
          replies: [
            {
              id: '1',
              postId: '1',
              authorId: '2',
              authorName: 'Sarah Chen',
              authorAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
              content: 'The chain rule is used when you have a function inside another function. Think of it as peeling an onion - you work from the outside in.',
              createdAt: new Date('2024-12-15T11:00:00'),
              likes: 8
            }
          ],
          isSticky: false,
          isLocked: false
        },
        {
          id: '2',
          forumId: '1',
          authorId: '3',
          authorName: 'Mike Rodriguez',
          authorAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
          content: 'What are some good resources for practicing integration techniques? I need more practice problems.',
          createdAt: new Date('2024-12-15T09:15:00'),
          likes: 5,
          replies: [],
          isSticky: true,
          isLocked: false
        }
      ],
      isActive: true,
      createdAt: new Date('2024-01-01'),
      lastActivity: new Date('2024-12-15T11:00:00'),
      participantCount: 156
    },
    {
      id: '2',
      subjectId: 'physics',
      title: 'Physics Help Center',
      description: 'Get help with mechanics, thermodynamics, and quantum physics',
      posts: [],
      isActive: true,
      createdAt: new Date('2024-01-01'),
      lastActivity: new Date('2024-12-14T16:30:00'),
      participantCount: 89
    },
    {
      id: '3',
      subjectId: 'chemistry',
      title: 'Chemistry Lab',
      description: 'Discuss chemical reactions, lab procedures, and safety',
      posts: [],
      isActive: true,
      createdAt: new Date('2024-01-01'),
      lastActivity: new Date('2024-12-14T14:20:00'),
      participantCount: 124
    }
  ];

  const getSubjectColor = (subjectId: string) => {
    const colors = {
      'mathematics': 'from-blue-500 to-blue-600',
      'physics': 'from-purple-500 to-purple-600',
      'chemistry': 'from-green-500 to-green-600',
      'biology': 'from-emerald-500 to-emerald-600'
    };
    return colors[subjectId as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim() || !selectedForum) return;
    
    // In a real app, this would make an API call
    console.log('Creating post:', newPostContent);
    setNewPostContent('');
  };

  const handleReply = (postId: string) => {
    if (!replyContent.trim()) return;
    
    // In a real app, this would make an API call
    console.log('Replying to post:', postId, replyContent);
    setReplyContent('');
  };

  if (selectedPost) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header */}
        <header className={`border-b transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <button
                onClick={() => setSelectedPost(null)}
                className={`mr-4 p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
              <h1 className={`text-xl font-semibold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Discussion Thread</h1>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Original Post */}
          <div className={`border rounded-xl p-6 mb-6 transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-start space-x-4">
              <img
                src={selectedPost.authorAvatar}
                alt={selectedPost.authorName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className={`font-semibold transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>{selectedPost.authorName}</h3>
                  <span className={`text-sm transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {selectedPost.createdAt.toLocaleDateString()} at {selectedPost.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {selectedPost.isSticky && (
                    <Pin className="w-4 h-4 text-yellow-600" />
                  )}
                </div>
                <p className={`mb-4 transition-colors duration-300 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>{selectedPost.content}</p>
                <div className="flex items-center space-x-4">
                  <button className={`flex items-center space-x-1 text-sm transition-colors ${
                    darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'
                  }`}>
                    <ThumbsUp className="w-4 h-4" />
                    <span>{selectedPost.likes}</span>
                  </button>
                  <button className={`flex items-center space-x-1 text-sm transition-colors ${
                    darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'
                  }`}>
                    <Reply className="w-4 h-4" />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Replies */}
          <div className="space-y-4 mb-8">
            {selectedPost.replies.map((reply) => (
              <div key={reply.id} className={`border rounded-xl p-6 ml-8 transition-colors duration-300 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-start space-x-4">
                  <img
                    src={reply.authorAvatar}
                    alt={reply.authorName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className={`font-medium transition-colors duration-300 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>{reply.authorName}</h4>
                      <span className={`text-sm transition-colors duration-300 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {reply.createdAt.toLocaleDateString()} at {reply.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className={`mb-3 transition-colors duration-300 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>{reply.content}</p>
                    <button className={`flex items-center space-x-1 text-sm transition-colors ${
                      darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'
                    }`}>
                      <ThumbsUp className="w-4 h-4" />
                      <span>{reply.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Reply Form */}
          <div className={`border rounded-xl p-6 transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Add a Reply</h3>
            <div className="space-y-4">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write your reply..."
                rows={4}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <div className="flex items-center justify-between">
                <button className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}>
                  <Paperclip className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleReply(selectedPost.id)}
                  disabled={!replyContent.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Post Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedForum) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header */}
        <header className={`border-b transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSelectedForum(null)}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode 
                      ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
                <div>
                  <h1 className={`text-xl font-semibold transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>{selectedForum.title}</h1>
                  <p className={`text-sm transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>{selectedForum.participantCount} participants</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Create Post */}
          <div className={`border rounded-xl p-6 mb-8 transition-colors duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h2 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Start a New Discussion</h2>
            <div className="space-y-4">
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="What would you like to discuss?"
                rows={3}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className={`p-2 rounded-lg transition-colors ${
                    darkMode 
                      ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                  }`}>
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button className={`p-2 rounded-lg transition-colors ${
                    darkMode 
                      ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                  }`}>
                    <Hash className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={handleCreatePost}
                  disabled={!newPostContent.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Post
                </button>
              </div>
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {selectedForum.posts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className={`cursor-pointer border rounded-xl p-6 hover:border-blue-400 transition-all duration-200 ${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className={`font-semibold transition-colors duration-300 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>{post.authorName}</h3>
                      <span className={`text-sm transition-colors duration-300 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {post.createdAt.toLocaleDateString()}
                      </span>
                      {post.isSticky && (
                        <Pin className="w-4 h-4 text-yellow-600" />
                      )}
                      {post.isLocked && (
                        <Lock className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <p className={`mb-3 line-clamp-2 transition-colors duration-300 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>{post.content}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className={`flex items-center space-x-1 transition-colors duration-300 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <ThumbsUp className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </span>
                      <span className={`flex items-center space-x-1 transition-colors duration-300 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.replies.length}</span>
                      </span>
                      <span className={`flex items-center space-x-1 transition-colors duration-300 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <Clock className="w-4 h-4" />
                        <span>{post.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </span>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-400'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`border-b transition-colors duration-300 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h1 className={`text-xl font-semibold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Discussion Forums</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-300 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Connect & Learn Together</h2>
          <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Join subject-specific discussions, ask questions, share knowledge, and learn from your peers.
          </p>
        </div>

        {/* Forums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forums.map((forum) => (
            <div
              key={forum.id}
              onClick={() => setSelectedForum(forum)}
              className={`cursor-pointer border rounded-xl p-6 hover:border-blue-400 hover:shadow-lg transition-all duration-200 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getSubjectColor(forum.subjectId)} flex items-center justify-center`}>
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className={`text-sm transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Active</span>
                </div>
              </div>
              
              <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>{forum.title}</h3>
              <p className={`text-sm mb-4 transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>{forum.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span className={`flex items-center transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Users className="w-4 h-4 mr-1" />
                    {forum.participantCount}
                  </span>
                  <span className={`flex items-center transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <MessageSquare className="w-4 h-4 mr-1" />
                    {forum.posts.length}
                  </span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-400'
                }`} />
              </div>
              
              <div className="mt-4 pt-4 border-t border-opacity-20 border-gray-300">
                <div className="flex items-center justify-between text-xs">
                  <span className={`transition-colors duration-300 ${
                    darkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    Last activity: {forum.lastActivity.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Popular Topics */}
        <div className="mt-12">
          <h3 className={`text-2xl font-semibold mb-6 transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Trending Discussions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`border rounded-xl p-6 transition-colors duration-300 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h4 className={`font-semibold transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>Hot Topics</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-sm transition-colors duration-300 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Chain Rule in Calculus</span>
                  <span className="text-xs text-green-600">+12 replies</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm transition-colors duration-300 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Quantum Mechanics Basics</span>
                  <span className="text-xs text-green-600">+8 replies</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm transition-colors duration-300 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Organic Chemistry Reactions</span>
                  <span className="text-xs text-green-600">+15 replies</span>
                </div>
              </div>
            </div>

            <div className={`border rounded-xl p-6 transition-colors duration-300 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center space-x-3 mb-4">
                <Star className="w-5 h-5 text-yellow-600" />
                <h4 className={`font-semibold transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>Top Contributors</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
                    alt="Sarah Chen"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className={`text-sm font-medium transition-colors duration-300 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>Sarah Chen</div>
                    <div className={`text-xs transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>45 helpful answers</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
                    alt="Mike Rodriguez"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className={`text-sm font-medium transition-colors duration-300 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>Mike Rodriguez</div>
                    <div className={`text-xs transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>38 helpful answers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};