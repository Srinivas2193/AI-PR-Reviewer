import { AIProvider } from './base';
import { PRContext, AIReviewResult } from '../types';
import { config } from '../config';
import logger from '../logger';

export class GeminiProvider extends AIProvider {
  private apiKey: string;
  private model: string;
  private resolvedModel: string | null = null;

  constructor() {
    super();
    if (!config.ai.gemini) {
      throw new Error('Gemini configuration is missing');
    }
    this.apiKey = config.ai.gemini.apiKey;
    this.model = config.ai.gemini.model;
  }

  private async getAvailableModel(): Promise<string> {
    if (this.resolvedModel) {
      return this.resolvedModel;
    }

    try {
      logger.info('Fetching available Gemini models');
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${this.apiKey}`
      );

      if (!response.ok) {
        logger.error('Failed to fetch models list', { status: response.status });
        throw new Error(`Failed to fetch models: ${response.status}`);
      }

      const data: any = await response.json();
      
      // Filter models that support generateContent
      const compatibleModels = data.models?.filter((m: any) => 
        m.supportedGenerationMethods?.includes('generateContent')
      ) || [];

      // Prefer stable models over preview/experimental ones
      // Priority: gemini-1.5-flash (fastest/cheapest) > gemini-1.5-pro > others
      const preferredModelNames = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];
      
      let availableModel = null;
      
      // Try to find preferred models first
      for (const preferred of preferredModelNames) {
        availableModel = compatibleModels.find((m: any) => 
          m.name.includes(preferred) && !m.name.includes('preview') && !m.name.includes('exp')
        );
        if (availableModel) break;
      }
      
      // If no preferred model found, use any non-preview model
      if (!availableModel) {
        availableModel = compatibleModels.find((m: any) => 
          !m.name.includes('preview') && !m.name.includes('exp')
        );
      }
      
      // Last resort: use any model
      if (!availableModel) {
        availableModel = compatibleModels[0];
      }

      if (!availableModel) {
        throw new Error('No suitable Gemini model found that supports generateContent');
      }

      // Extract model name from full path (e.g., "models/gemini-pro" -> "gemini-pro")
      const modelName = availableModel.name.replace('models/', '');
      this.resolvedModel = modelName;
      logger.info('Using Gemini model', { model: modelName, displayName: availableModel.displayName });
      
      return modelName;
    } catch (error) {
      logger.error('Failed to get available model', { error });
      throw error;
    }
  }

  async reviewPR(context: PRContext): Promise<AIReviewResult> {
    logger.info('Starting Gemini PR review', {
      pr: context.pullNumber,
      files: context.files.length,
      model: this.model,
    });

    try {
      // Get the actual available model
      const modelToUse = await this.getAvailableModel();
      
      const prompt = this.buildReviewPrompt(context);

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelToUse}:generateContent?key=${this.apiKey}`,
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

