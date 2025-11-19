#!/usr/bin/env node

/**
 * Main entry point - can be used for both CLI and server modes
 */

import { Command } from 'commander';
import { PRReviewer } from './reviewer';
import logger from './logger';

const program = new Command();

program
  .name('ai-code-reviewer')
  .description('AI-powered code reviewer for GitHub pull requests')
  .version('1.0.0');

program
  .command('review')
  .description('Review a specific pull request')
  .requiredOption('-o, --owner <owner>', 'Repository owner')
  .requiredOption('-r, --repo <repo>', 'Repository name')
  .requiredOption('-p, --pr <number>', 'Pull request number')
  .action(async (options) => {
    try {
      const reviewer = new PRReviewer();
      await reviewer.reviewPR(
        options.owner,
        options.repo,
        parseInt(options.pr, 10)
      );
      logger.info('Review completed successfully');
      process.exit(0);
    } catch (error) {
      logger.error('Review failed', { error });
      process.exit(1);
    }
  });

program
  .command('server')
  .description('Start webhook server')
  .action(() => {
    logger.info('Starting webhook server...');
    require('./server');
  });

// If no command specified, show help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

program.parse();

