#!/usr/bin/env node

/**
 * GitHub Actions entry point
 * This script is executed when running as a GitHub Action
 */

import { PRReviewer } from './reviewer';
import logger from './logger';

async function main() {
  try {
    // GitHub Actions automatically provides these environment variables
    const githubToken = process.env.GITHUB_TOKEN;
    const eventName = process.env.GITHUB_EVENT_NAME;
    const repository = process.env.GITHUB_REPOSITORY; // format: owner/repo
    const prNumber = process.env.PR_NUMBER;

    logger.info('GitHub Action started', { eventName, repository, prNumber });

    if (!githubToken) {
      throw new Error('GITHUB_TOKEN environment variable is required');
    }

    if (!repository) {
      throw new Error('GITHUB_REPOSITORY environment variable is required');
    }

    if (!prNumber) {
      throw new Error('PR_NUMBER environment variable is required');
    }

    const [owner, repo] = repository.split('/');

    const reviewer = new PRReviewer(githubToken);
    await reviewer.reviewPR(owner, repo, parseInt(prNumber, 10));

    logger.info('Review completed successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Action failed', { error });
    process.exit(1);
  }
}

main();

