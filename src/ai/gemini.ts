import { AIProvider } from './base';
import { PRContext, AIReviewResult } from '../types';
import { config } from '../config';
import logger from '../logger';

export class GeminiProvider extends AIProvider {
  private apiKey: string;
  private model: string;

  constructor() {
    super();
    if (!config.ai.gemini) {
      throw new Error('Gemini configuration is missing');
    }
    this.apiKey = config.ai.gemini.apiKey;
    this.model = config.ai.gemini.model;
  }

  async reviewPR(context: PRContext): Promise<AIReviewResult> {
    logger.info('Starting Gemini PR review', {
      pr: context.pullNumber,
      files: context.files.length,
      model: this.model,
    });

    try {
      const prompt = this.buildReviewPrompt(context);

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/${this.model}:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.3,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 8192,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        logger.error('Gemini API error', { 
          status: response.status, 
          statusText: response.statusText,
          error: errorText 
        });
        throw new Error(`Gemini API error (${response.status}): ${errorText}`);
      }

      const data: any = await response.json();
      
      if (!data.candidates || data.candidates.length === 0) {
        logger.error('No response from Gemini', { data });
        throw new Error('Gemini returned no candidates in response');
      }
      
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';

      logger.info('Received Gemini response', {
        hasResponse: !!responseText,
      });

      const result = this.parseAIResponse(responseText);
      return result;
    } catch (error) {
      logger.error('Gemini review failed', { error });
      throw error;
    }
  }
}

