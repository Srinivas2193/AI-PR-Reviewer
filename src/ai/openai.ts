import OpenAI from 'openai';
import { AIProvider } from './base';
import { PRContext, AIReviewResult } from '../types';
import { config } from '../config';
import logger from '../logger';

export class OpenAIProvider extends AIProvider {
  private client: OpenAI;
  private model: string;

  constructor() {
    super();
    if (!config.ai.openai) {
      throw new Error('OpenAI configuration is missing');
    }
    this.client = new OpenAI({
      apiKey: config.ai.openai.apiKey,
    });
    this.model = config.ai.openai.model;
  }

  async reviewPR(context: PRContext): Promise<AIReviewResult> {
    logger.info('Starting OpenAI PR review', { 
      pr: context.pullNumber, 
      files: context.files.length,
      model: this.model 
    });

    try {
      const prompt = this.buildReviewPrompt(context);

      const completion = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert code reviewer with deep knowledge of software engineering best practices, security, and performance optimization. Provide thorough, constructive code reviews.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' },
      });

      const responseText = completion.choices[0]?.message?.content || '{}';
      logger.info('Received OpenAI response', { 
        tokens: completion.usage?.total_tokens 
      });

      const result = this.parseAIResponse(responseText);
      return result;
    } catch (error) {
      logger.error('OpenAI review failed', { error });
      throw error;
    }
  }
}

