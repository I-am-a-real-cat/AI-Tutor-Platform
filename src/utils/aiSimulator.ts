export const generateAIResponse = async (message: string, subject?: string): Promise<string> => {
  // Simulate AI thinking time
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

  const responses = {
    greeting: [
      "Hello! I'm your AI tutor. I'm here to help you learn and understand any topic you're curious about. What would you like to explore today?",
      "Hi there! Ready to dive into some learning? I can help explain concepts, work through problems, or answer any questions you have.",
      "Welcome! I'm excited to be your learning companion. Whether you need help with homework, want to explore new topics, or need clarification on something, I'm here for you!"
    ],
    math: [
      "Great question about mathematics! Let me break this down step by step for you.",
      "Mathematics can be tricky, but once you understand the underlying concepts, it becomes much clearer. Here's how I'd approach this:",
      "I love helping with math problems! The key is to understand the 'why' behind each step, not just memorize formulas."
    ],
    physics: [
      "Physics is all about understanding how the universe works! Let me explain this concept using real-world examples.",
      "That's a fascinating physics question! The beauty of physics is that it describes patterns we see everywhere around us.",
      "Physics can seem abstract, but it's actually very practical. Let me show you how this applies to everyday situations."
    ],
    chemistry: [
      "Chemistry is like a language - once you understand the grammar (periodic table and bonding), you can 'read' any reaction!",
      "Great chemistry question! Let's think about what's happening at the molecular level here.",
      "Chemistry is all about transformation and energy. Here's what's really going on in this process:"
    ],
    encouragement: [
      "You're doing great! Learning takes time, and asking questions shows you're really thinking about the material.",
      "Don't worry if this seems challenging - every expert was once a beginner. Let's work through this together!",
      "I can see you're really trying to understand this deeply. That's exactly the right approach!"
    ],
    general: [
      "That's a thoughtful question! Let me provide you with a comprehensive explanation.",
      "I'm here to help you understand this topic thoroughly. Here's what you need to know:",
      "Excellent question! This is actually a really important concept to master."
    ]
  };

  // Simple keyword matching for demo purposes
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage === '') {
    return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
  }
  
  if (subject) {
    const subjectResponses = responses[subject.toLowerCase() as keyof typeof responses] || responses.general;
    return subjectResponses[Math.floor(Math.random() * subjectResponses.length)];
  }
  
  if (lowerMessage.includes('thank') || lowerMessage.includes('help')) {
    return responses.encouragement[Math.floor(Math.random() * responses.encouragement.length)];
  }
  
  // For specific topics, provide more detailed responses
  if (lowerMessage.includes('derivative') || lowerMessage.includes('calculus')) {
    return "Derivatives measure the rate of change of a function. Think of it as asking 'how fast is this changing?' at any given point. For example, if you have a position function, its derivative gives you velocity. The power rule is a great place to start: for x^n, the derivative is n*x^(n-1). Would you like me to work through some examples?";
  }
  
  if (lowerMessage.includes('algebra') || lowerMessage.includes('equation')) {
    return "Algebra is about finding unknown values and understanding relationships between variables. The key principle is that whatever you do to one side of an equation, you must do to the other side to keep it balanced. Think of it like a scale - you want to isolate the variable you're solving for. What specific algebraic concept would you like to explore?";
  }
  
  return responses.general[Math.floor(Math.random() * responses.general.length)] + " " + 
         "Could you provide more details about what specifically you'd like to understand? I'm here to help make complex topics clear and engaging!";
};