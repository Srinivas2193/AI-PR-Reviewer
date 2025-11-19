/**
 * Webhook server for receiving GitHub events
 * This runs as a standalone server that listens for PR events
 */

import express from 'express';
import { Webhooks } from '@octokit/webhooks';
import { config } from './config';
import { PRReviewer } from './reviewer';
import logger from './logger';

const app = express();
const webhooks = new Webhooks({
  secret: config.github.webhookSecret || 'development-secret',
});

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Webhook endpoint
app.post('/webhook', async (req, res) => {
  try {
    const signature = req.headers['x-hub-signature-256'] as string;
    const event = req.headers['x-github-event'] as string;

    logger.info('Received webhook', { event });

    // Verify webhook signature
    if (config.github.webhookSecret) {
      const isValid = await webhooks.verify(JSON.stringify(req.body), signature);
      if (!isValid) {
        logger.warn('Invalid webhook signature');
        return res.status(401).json({ error: 'Invalid signature' });
      }
    }

    // Handle pull request events
    if (event === 'pull_request') {
      const action = req.body.action;
      const pr = req.body.pull_request;
      const repo = req.body.repository;

      logger.info('Pull request event', { 
        action, 
        pr: pr.number, 
        repo: repo.full_name 
      });

      // Trigger review on PR opened or synchronized (updated)
      if (action === 'opened' || action === 'synchronize') {
        const [owner, repoName] = repo.full_name.split('/');
        
        // Process review asynchronously
        const reviewer = new PRReviewer();
        reviewer.reviewPR(owner, repoName, pr.number).catch((error) => {
          logger.error('Review processing failed', { error, pr: pr.number });
        });

        return res.json({ message: 'Review queued' });
      }
    }

    res.json({ message: 'Event received' });
  } catch (error) {
    logger.error('Webhook processing failed', { error });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
const PORT = config.server.port;
app.listen(PORT, () => {
  logger.info(`Webhook server started on port ${PORT}`);
  logger.info('Waiting for GitHub webhook events...');
});

export default app;

