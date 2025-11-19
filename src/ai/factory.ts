import { AIProvider } from './base';
import { OpenAIProvider } from './openai';
import { AnthropicProvider } from './anthropic';
import { GeminiProvider } from './gemini';
import { config } from '../config';

export function createAIProvider(): AIProvider {
  switch (config.ai.provider) {
    case 'openai':
      return new OpenAIProvider();
    case 'anthropic':
      return new AnthropicProvider();
    case 'gemini':
      return new GeminiProvider();
    default:
      throw new Error(`Unsupported AI provider: ${config.ai.provider}`);
  }
}

