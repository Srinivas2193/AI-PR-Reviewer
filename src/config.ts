import dotenv from 'dotenv';

dotenv.config();

export interface Config {
  github: {
    token: string;
    webhookSecret?: string;
  };
  ai: {
    provider: 'openai' | 'anthropic' | 'gemini';
    openai?: {
      apiKey: string;
      model: string;
    };
    anthropic?: {
      apiKey: string;
      model: string;
    };
    gemini?: {
      apiKey: string;
      model: string;
    };
  };
  server: {
    port: number;
    nodeEnv: string;
  };
  review: {
    maxFiles: number;
    maxFileSizeKB: number;
    severity: 'low' | 'medium' | 'high';
  };
}

function getConfig(): Config {
  const githubToken = process.env.GITHUB_TOKEN;
  if (!githubToken) {
    throw new Error('GITHUB_TOKEN is required');
  }

  const aiProvider = (process.env.AI_PROVIDER || 'openai') as 'openai' | 'anthropic' | 'gemini';

  const config: Config = {
    github: {
      token: githubToken,
      webhookSecret: process.env.GITHUB_WEBHOOK_SECRET,
    },
    ai: {
      provider: aiProvider,
    },
    server: {
      port: parseInt(process.env.PORT || '3000', 10),
      nodeEnv: process.env.NODE_ENV || 'development',
    },
    review: {
      maxFiles: parseInt(process.env.MAX_FILES_TO_REVIEW || '20', 10),
      maxFileSizeKB: parseInt(process.env.MAX_FILE_SIZE_KB || '500', 10),
      severity: (process.env.REVIEW_SEVERITY || 'medium') as 'low' | 'medium' | 'high',
    },
  };

  if (aiProvider === 'openai') {
    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      throw new Error('OPENAI_API_KEY is required when AI_PROVIDER is openai');
    }
    config.ai.openai = {
      apiKey: openaiKey,
      model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
    };
  } else if (aiProvider === 'anthropic') {
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    if (!anthropicKey) {
      throw new Error('ANTHROPIC_API_KEY is required when AI_PROVIDER is anthropic');
    }
    config.ai.anthropic = {
      apiKey: anthropicKey,
      model: process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022',
    };
  } else if (aiProvider === 'gemini') {
    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
      throw new Error('GEMINI_API_KEY is required when AI_PROVIDER is gemini');
    }
    config.ai.gemini = {
      apiKey: geminiKey,
      model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
    };
  }

  return config;
}

export const config = getConfig();

