import Anthropic from '@anthropic-ai/sdk';
import { AIProvider } from './base';
import { PRContext, AIReviewResult } from '../types';
import { config } from '../config';
import logger from '../logger';

export class AnthropicProvider extends AIProvider {
  private client: Anthropic;
  private model: string;

  constructor() {
    super();
    if (!config.ai.anthropic) {
      throw new Error('Anthropic configuration is missing');
    }
    this.client = new Anthropic({
      apiKey: config.ai.anthropic.apiKey,
    });
    this.model = config.ai.anthropic.model;
  }

  async reviewPR(context: PRContext): Promise<AIReviewResult> {
    logger.info('Starting Anthropic PR review', { 
      pr: context.pullNumber, 
      files: context.files.length,
      model: this.model 
    });

    try {
      const prompt = this.buildReviewPrompt(context);

      const message = await this.client.messages.create({
        model: this.model,
        max_tokens: 4096,
        temperature: 0.3,
        system: 'You are an expert code reviewer with deep knowledge of software engineering best practices, security, and performance optimization. Provide thorough, constructive code reviews. Always respond with valid JSON.',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const responseText = message.content[0].type === 'text' 
        ? message.content[0].text 
        : '{}';
      
      logger.info('Received Anthropic response', { 
        inputTokens: message.usage.input_tokens,
        outputTokens: message.usage.output_tokens 
      });

      const result = this.parseAIResponse(responseText);
      return result;
    } catch (error) {
      logger.error('Anthropic review failed', { error });
      throw error;
    }
  }
}

