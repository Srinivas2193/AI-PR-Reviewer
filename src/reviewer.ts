import { GitHubClient } from './github/client';
import { createAIProvider } from './ai/factory';
import logger from './logger';

export class PRReviewer {
  private githubClient: GitHubClient;
  private aiProvider;

  constructor(githubToken?: string) {
    this.githubClient = new GitHubClient(githubToken);
    this.aiProvider = createAIProvider();
  }

  async reviewPR(owner: string, repo: string, pullNumber: number): Promise<void> {
    logger.info('Starting PR review', { owner, repo, pullNumber });

    try {
      // 1. Fetch PR context
      const context = await this.githubClient.getPRContext(owner, repo, pullNumber);
      logger.info('PR context fetched', { 
        files: context.files.length,
        title: context.title 
      });

      // 2. Get AI review
      const reviewResult = await this.aiProvider.reviewPR(context);
      logger.info('AI review completed', { 
        rating: reviewResult.summary.overallRating,
        comments: reviewResult.comments.length 
      });

      // 3. Get the commit SHA for posting review
      const commitSha = await this.githubClient.getPRHeadSha(owner, repo, pullNumber);

      // 4. Post inline comments (if any)
      if (reviewResult.comments.length > 0) {
        // Add AI Code Reviewer branding to each comment
        const brandedComments = reviewResult.comments.map(comment => {
          // Extract category from comment body (e.g., [SECURITY], [PERFORMANCE])
          const categoryMatch = comment.body.match(/^\[([A-Z_]+)\]/);
          let formattedBody = comment.body;
          let header = '🤖 **AI Code Reviewer**';
          
          if (categoryMatch) {
            const category = categoryMatch[1];
            header += ` *[${category}]*`;
            // Remove the category from the body since we're showing it in the header
            formattedBody = comment.body.replace(/^\[([A-Z_]+)\]\s*/, '');
          }
          
          return {
            ...comment,
            body: `${header}\n\n${formattedBody}`
          };
        });
        
        await this.githubClient.postReviewComments(
          owner,
          repo,
          pullNumber,
          commitSha,
          brandedComments
        );
      }

      // 5. Post summary comment
      const summaryText = this.aiProvider['formatSummaryForGitHub'](context, reviewResult);
      await this.githubClient.postSummaryComment(owner, repo, pullNumber, summaryText);

      logger.info('PR review completed successfully');
    } catch (error) {
      logger.error('PR review failed', { error });
      throw error;
    }
  }
}

