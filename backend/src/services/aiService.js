import { OpenAI } from 'openai';
import logger from '../utils/logger.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const createProjectPrompt = (params) => {
  return `You are an expert academic project advisor for B.Tech students. Generate ${params.numberOfIdeas} unique, feasible, and engaging project ideas based on the following student profile:

Student Profile:
- Branch: ${params.branch}
- Year of Study: ${params.year}
- Technical Skills: ${params.skills.join(', ')}
- Interests: ${params.interests.join(', ')}
- Preferred Project Type: ${params.projectType}
- Difficulty Level: ${params.difficulty}
- Team Size: ${params.teamSize} members
- Available Duration: ${params.duration}
- Preferred Technologies: ${params.preferredTechs.join(', ')}

For EACH project, provide a comprehensive JSON object with the following structure:
{
  "title": "Project title",
  "tagline": "One-line tagline describing the project",
  "problemStatement": "Clear problem statement this project solves",
  "description": "Detailed project description (2-3 paragraphs)",
  "suitability": "Why this project is perfect for this student's profile",
  "targetUsers": "Who will use this application",
  "keyFeatures": ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
  "aiFeatures": ["AI/ML feature 1", "AI/ML feature 2"],
  "techStack": {
    "frontend": ["React", "Tailwind CSS"],
    "backend": ["Node.js", "Express"],
    "database": ["MongoDB"],
    "apis": ["OpenAI API", "REST APIs"]
  },
  "architecture": "System architecture overview (2-3 sentences)",
  "databaseDesign": "Database schema and collections description",
  "apiRequirements": ["API endpoint 1", "API endpoint 2"],
  "developmentRoadmap": [
    {"phase": "Phase 1: Setup", "tasks": ["Task 1", "Task 2"], "duration": "1 week"},
    {"phase": "Phase 2: Core Features", "tasks": ["Task 1", "Task 2"], "duration": "2 weeks"}
  ],
  "estimatedDuration": "${params.duration}",
  "difficultyLevel": "${params.difficulty}",
  "teamResponsibilities": [
    {"role": "Frontend Developer", "responsibilities": ["Build UI", "Handle state"]},
    {"role": "Backend Developer", "responsibilities": ["Design APIs", "Database"]}
  ],
  "futureEnhancements": ["Enhancement 1", "Enhancement 2", "Enhancement 3"],
  "expectedLearning": ["Learning outcome 1", "Learning outcome 2", "Learning outcome 3"]
}

Return ONLY a valid JSON array with ${params.numberOfIdeas} project objects. Ensure all projects are unique, realistic, and aligned with the student's skills and interests. Do NOT include any markdown formatting or extra text.`;
};

const createRefinementPrompt = (project, refinementType) => {
  const refinementInstructions = {
    easier: 'Simplify this project to make it achievable in a shorter timeframe with fewer technical complexities.',
    advanced: 'Add advanced features and complex technical components to increase difficulty.',
    addAI: 'Enhance this project with more AI/ML features and components.',
    addFeatures: 'Add 5 more innovative features to this project.',
    reduceDuration: 'Modify this project scope to be completable in 2 weeks instead of the original duration.',
    thirdYear: 'Adjust this project to be most suitable for a 3rd-year B.Tech student with intermediate experience.',
    finalYear: 'Make this project complex and comprehensive enough for a final-year B.Tech project.',
  };

  return `You are an expert project advisor. The user has requested to "${refinementInstructions[refinementType]}" for the following project:

Current Project:
${JSON.stringify(project, null, 2)}

Please modify the project according to the request. Return ONLY a valid JSON object with the updated project details following the same structure as above. Ensure all fields are present and coherent.`;
};

export const generateProjects = async (params) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      logger.warn('OpenAI API key not configured. Using mock data.');
      return generateMockProjects(params);
    }

    const prompt = createProjectPrompt(params);

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const content = response.choices[0].message.content;
    const projects = JSON.parse(content);

    // Validate and ensure all projects have required fields
    return Array.isArray(projects) ? projects : [projects];
  } catch (error) {
    logger.error(`Error generating projects: ${error.message}`);
    throw error;
  }
};

export const refineProject = async (project, refinementType) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      logger.warn('OpenAI API key not configured. Using mock refinement.');
      return generateMockRefinedProject(project, refinementType);
    }

    const prompt = createRefinementPrompt(project, refinementType);

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 3000,
    });

    const content = response.choices[0].message.content;
    const refinedProject = JSON.parse(content);

    return refinedProject;
  } catch (error) {
    logger.error(`Error refining project: ${error.message}`);
    throw error;
  }
};

export const chatWithAI = async (projectContext, userMessage) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      logger.warn('OpenAI API key not configured. Using mock response.');
      return generateMockChatResponse(userMessage);
    }

    const prompt = `You are an expert B.Tech project advisor. The user is asking about the following project:

Project: ${projectContext.title}
Description: ${projectContext.description}
Tech Stack: ${JSON.stringify(projectContext.techStack)}
Features: ${projectContext.keyFeatures.join(', ')}

User Question: ${userMessage}

Provide a helpful, detailed answer based on the project context.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0].message.content;
  } catch (error) {
    logger.error(`Error in AI chat: ${error.message}`);
    throw error;
  }
};

// Mock functions for when API key is not available
const generateMockProjects = (params) => {
  const mockProjects = [
    {
      title: 'AI-Powered Mental Health Support Platform',
      tagline: 'Real-time emotional support with AI chatbot and sentiment analysis',
      problemStatement: 'Students often struggle with mental health issues but hesitate to seek professional help due to cost and stigma.',
      description: 'A comprehensive web platform that provides 24/7 mental health support through an AI chatbot, mood tracking, journaling, and resources. The platform uses NLP for sentiment analysis to detect mental distress patterns and recommend appropriate interventions.',
      suitability: 'Perfect for your healthcare interest and AI/ML skills. Demonstrates real-world application of AI in healthcare.',
      targetUsers: 'College students, young professionals, and anyone seeking mental health support',
      keyFeatures: [
        'AI Chatbot for mental health support',
        'Mood tracking dashboard',
        'Journal with sentiment analysis',
        'Resource recommendations',
        'Crisis alert system',
      ],
      aiFeatures: ['NLP sentiment analysis', 'AI chatbot using GPT API', 'Pattern recognition for mental health risks'],
      techStack: {
        frontend: ['React.js', 'Tailwind CSS', 'Chart.js'],
        backend: ['Node.js', 'Express.js'],
        database: ['MongoDB'],
        apis: ['OpenAI API', 'REST APIs'],
      },
      architecture: 'Client-server architecture with React frontend, Express backend, and MongoDB database. AI processing through OpenAI API.',
      databaseDesign: 'Collections: users, journal_entries, mood_logs, chat_history, resources',
      apiRequirements: ['POST /api/ai/chat', 'POST /api/mood/log', 'GET /api/analytics'],
      developmentRoadmap: [
        {
          phase: 'Phase 1: Setup & Authentication',
          tasks: ['Setup project', 'Implement authentication', 'Design database'],
          duration: '1 week',
        },
        {
          phase: 'Phase 2: Core Features',
          tasks: ['Build UI', 'Implement chatbot', 'Add mood tracking'],
          duration: '2 weeks',
        },
      ],
      estimatedDuration: '2 months',
      difficultyLevel: params.difficulty,
      teamResponsibilities: [
        { role: 'Frontend Developer', responsibilities: ['UI/UX', 'React components'] },
        { role: 'Backend Developer', responsibilities: ['APIs', 'Database design'] },
      ],
      futureEnhancements: ['Video counseling integration', 'Meditation features', 'Community support'],
      expectedLearning: ['AI/ML integration', 'Full-stack development', 'Healthcare application development'],
    },
  ];

  return mockProjects.slice(0, params.numberOfIdeas);
};

const generateMockRefinedProject = (project, refinementType) => {
  const refined = { ...project };
  refined.refinementHistory = refined.refinementHistory || [];
  refined.refinementHistory.push({
    refinementType,
    timestamp: new Date(),
    changes: `Project refined to be ${refinementType}`,
  });
  return refined;
};

const generateMockChatResponse = (message) => {
  const responses = {
    default: 'This is a mock response. Please configure your OpenAI API key to get real AI responses.',
    database: 'For this project, I recommend using MongoDB for storing user data, chat history, and mood logs.',
    architecture: 'The architecture uses a three-tier design with React frontend, Express backend, and MongoDB database.',
    team: 'For a team of 3-4 members, you can have 1 frontend developer, 1-2 backend developers, and 1 DevOps/QA person.',
    build: 'Start by setting up the development environment, then build the authentication system, followed by the core features.',
  };

  const lowerMessage = message.toLowerCase();
  for (const [key, response] of Object.entries(responses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }

  return responses.default;
};
