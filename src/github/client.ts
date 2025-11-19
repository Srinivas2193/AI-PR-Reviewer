import { Octokit } from '@octokit/rest';
import { config } from '../config';
import { PRFile, PRContext, ReviewComment } from '../types';
import logger from '../logger';

export class GitHubClient {
  private octokit: Octokit;

  constructor(token?: string) {
    this.octokit = new Octokit({
      auth: token || config.github.token,
    });
  }

  async getPRContext(owner: string, repo: string, pullNumber: number): Promise<PRContext> {
    logger.info('Fetching PR context', { owner, repo, pullNumber });

    const { data: pr } = await this.octokit.pulls.get({
      owner,
      repo,
      pull_number: pullNumber,
    });

    const { data: filesData } = await this.octokit.pulls.listFiles({
      owner,
      repo,
      pull_number: pullNumber,
      per_page: config.review.maxFiles,
    });

    const files: PRFile[] = await Promise.all(
      filesData.map(async (file) => {
        let contents: string | undefined;

        // Only fetch contents for files that are not too large
        if (file.status !== 'removed' && file.changes < config.review.maxFileSizeKB * 10) {
          try {
            const { data: contentData } = await this.octokit.repos.getContent({
              owner,
              repo,
              path: file.filename,
              ref: pr.head.sha,
            });

            if ('content' in contentData && contentData.content) {
              contents = Buffer.from(contentData.content, 'base64').toString('utf-8');
            }
          } catch (error) {
            logger.warn(`Failed to fetch contents for ${file.filename}`, { error });
          }
        }

        return {
          filename: file.filename,
          status: file.status,
          additions: file.additions,
          deletions: file.deletions,
          changes: file.changes,
          patch: file.patch,
          contents,
        };
      })
    );

    return {
      owner,
      repo,
      pullNumber,
      title: pr.title,
      description: pr.body || '',
      files,
    };
  }

  async postReviewComments(
    owner: string,
    repo: string,
    pullNumber: number,
    commitId: string,
    comments: ReviewComment[]
  ): Promise<void> {
    logger.info('Posting review comments', { owner, repo, pullNumber, commentCount: comments.length });

    if (comments.length === 0) {
      logger.info('No comments to post');
      return;
    }

    try {
      await this.octokit.pulls.createReview({
        owner,
        repo,
        pull_number: pullNumber,
        commit_id: commitId,
        event: 'COMMENT',
        body: '## 🤖 AI Code Reviewer\n\n' +
              `Found ${comments.length} issue${comments.length > 1 ? 's' : ''} that need attention. ` +
              'See inline comments below for details.',
        comments: comments.map((c) => ({
          path: c.path,
          line: c.line,
          side: c.side,
          body: c.body,
        })),
      });
      logger.info('Review comments posted successfully');
    } catch (error) {
      logger.error('Failed to post review comments', { error });
      throw error;
    }
  }

  async postSummaryComment(
    owner: string,
    repo: string,
    pullNumber: number,
    summary: string
  ): Promise<void> {
    logger.info('Posting summary comment', { owner, repo, pullNumber });

    try {
      await this.octokit.issues.createComment({
        owner,
        repo,
        issue_number: pullNumber,
        body: summary,
      });
      logger.info('Summary comment posted successfully');
    } catch (error) {
      logger.error('Failed to post summary comment', { error });
      throw error;
    }
  }

  async getPRHeadSha(owner: string, repo: string, pullNumber: number): Promise<string> {
    const { data: pr } = await this.octokit.pulls.get({
      owner,
      repo,
      pull_number: pullNumber,
    });
    return pr.head.sha;
  }
}

