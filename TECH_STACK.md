# 🛠️ Technical Stack & Architecture

## Overview

This AI-powered code reviewer is a full-stack TypeScript application that integrates with GitHub to automatically review pull requests using advanced AI models (GPT-4 or Claude).

---

## Core Technologies

### Programming Language
- **TypeScript 5.3+**
  - Strict type checking for reliability
  - Modern ES2020+ features
  - Compiled to CommonJS for Node.js compatibility

### Runtime Environment
- **Node.js 20 LTS**
  - Latest stable features
  - Enhanced performance
  - Long-term support

---

## Key Dependencies

### GitHub Integration

#### [@octokit/rest](https://github.com/octokit/rest.js) (v20.0+)
- **Purpose**: GitHub REST API client
- **Usage**: 
  - Fetch PR metadata, files, and diffs
  - Post review comments and summaries
  - Manage pull request interactions
- **Why**: Official GitHub SDK with excellent TypeScript support

#### [@octokit/webhooks](https://github.com/octokit/webhooks.js) (v12.0+)
- **Purpose**: GitHub webhook handling
- **Usage**: 
  - Receive and verify webhook events
  - Parse pull request events
  - Secure signature validation
- **Why**: Official webhook processor with built-in security

### AI Providers

#### [openai](https://github.com/openai/openai-node) (v4.20+)
- **Purpose**: OpenAI API client (GPT-4, GPT-3.5)
- **Usage**:
  - Send code review prompts to GPT models
  - Receive structured JSON responses
  - Token usage tracking
- **Models Supported**:
  - `gpt-4-turbo-preview` (recommended)
  - `gpt-4`
  - `gpt-3.5-turbo` (cost-effective)
- **Why**: Most widely used AI model with strong coding capabilities

#### [@anthropic-ai/sdk](https://github.com/anthropics/anthropic-sdk-typescript) (v0.27+)
- **Purpose**: Anthropic Claude API client
- **Usage**:
  - Alternative to OpenAI
  - Send code review prompts to Claude models
  - Detailed token metrics
- **Models Supported**:
  - `claude-3-5-sonnet-20241022` (recommended, best performance)
  - `claude-3-opus-20240229` (most capable)
  - `claude-3-haiku-20240307` (fastest, cheapest)
- **Why**: Excellent at code understanding and detailed analysis

### Web Framework

#### [Express](https://expressjs.com/) (v4.18+)
- **Purpose**: HTTP server for webhook endpoint
- **Usage**:
  - `/webhook` - Receive GitHub events
  - `/health` - Health check endpoint
  - Middleware for JSON parsing
- **Why**: Industry standard, simple, reliable

### CLI Framework

#### [Commander](https://github.com/tj/commander.js) (v11.1+)
- **Purpose**: Command-line interface
- **Usage**: Parse CLI arguments for manual PR reviews
- **Example**: `node dist/index.js review --owner X --repo Y --pr 123`
- **Why**: Most popular Node.js CLI framework

### Utilities

#### [dotenv](https://github.com/motdotla/dotenv) (v16.3+)
- **Purpose**: Environment variable management
- **Usage**: Load `.env` file into `process.env`
- **Why**: Standard for configuration management

#### [winston](https://github.com/winstonjs/winston) (v3.11+)
- **Purpose**: Logging framework
- **Usage**: 
  - Structured JSON logging
  - Console output with colors
  - Error tracking and debugging
- **Why**: Production-grade logging with multiple transports

---

## Development Dependencies

### TypeScript Tooling
- **typescript** (v5.3+): Compiler
- **ts-node** (v10.9+): Direct TypeScript execution for development
- **@types/node**, **@types/express**: Type definitions

### Code Quality
- **eslint** (v8.55+): Linting
- **@typescript-eslint/parser**: TypeScript parsing for ESLint
- **@typescript-eslint/eslint-plugin**: TypeScript-specific rules
- **prettier** (v3.1+): Code formatting

---

## Architecture

### Deployment Modes

```
┌─────────────────────────────────────────────────────────────┐
│                    AI Code Reviewer                          │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   GitHub     │  │   Webhook    │  │     CLI      │     │
│  │   Actions    │  │   Server     │  │    Manual    │     │
│  │              │  │              │  │              │     │
│  │  Automatic   │  │  Continuous  │  │  On-demand   │     │
│  │  on PR       │  │  listening   │  │  reviews     │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                 │                  │              │
│         └─────────────────┼──────────────────┘              │
│                           │                                 │
│                    ┌──────▼───────┐                         │
│                    │  PRReviewer  │                         │
│                    │    Core      │                         │
│                    └──────┬───────┘                         │
│                           │                                 │
│         ┌─────────────────┼─────────────────┐              │
│         │                 │                 │              │
│    ┌────▼────┐     ┌──────▼──────┐   ┌─────▼─────┐       │
│    │ GitHub  │     │ AI Provider │   │   Config  │       │
│    │ Client  │     │   Factory   │   │  Manager  │       │
│    └────┬────┘     └──────┬──────┘   └───────────┘       │
│         │                 │                                │
│         │          ┌──────┴──────┐                        │
│         │          │             │                        │
│         │     ┌────▼────┐   ┌────▼────┐                  │
│         │     │ OpenAI  │   │Anthropic│                  │
│         │     │Provider │   │Provider │                  │
│         │     └─────────┘   └─────────┘                  │
│         │                                                  │
│         │  Octokit                                         │
│         ▼                                                  │
│    ┌─────────────────┐                                    │
│    │  GitHub API     │                                    │
│    └─────────────────┘                                    │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

```
1. PR Event Triggered
   ↓
2. GitHub Client fetches PR context
   - Metadata (title, description)
   - Changed files
   - File diffs (patches)
   - Full file contents
   ↓
3. AI Provider receives context
   - Builds review prompt
   - Sends to AI API (OpenAI/Anthropic)
   - Receives structured response
   ↓
4. Response Parsing
   - Extract summary
   - Extract inline comments
   - Validate structure
   ↓
5. GitHub Client posts results
   - Create review with inline comments
   - Post summary comment
   ↓
6. PR Updated with AI feedback
```

### Key Classes

#### `PRReviewer` (src/reviewer.ts)
- **Role**: Orchestrator
- **Responsibilities**:
  - Coordinate GitHub and AI interactions
  - Handle errors and logging
  - Format and post results

#### `GitHubClient` (src/github/client.ts)
- **Role**: GitHub API wrapper
- **Responsibilities**:
  - Fetch PR data
  - Post comments
  - Manage API rate limits

#### `AIProvider` (src/ai/base.ts)
- **Role**: Abstract base class
- **Responsibilities**:
  - Define review interface
  - Build prompts
  - Parse responses
  - Format output

#### `OpenAIProvider` / `AnthropicProvider`
- **Role**: AI-specific implementations
- **Responsibilities**:
  - Call specific AI APIs
  - Handle provider quirks
  - Manage tokens and costs

---

## Configuration System

### Environment Variables

```typescript
interface Config {
  github: {
    token: string;              // PAT or GitHub Actions token
    webhookSecret?: string;      // For webhook verification
  };
  ai: {
    provider: 'openai' | 'anthropic';
    openai?: {
      apiKey: string;
      model: string;
    };
    anthropic?: {
      apiKey: string;
      model: string;
    };
  };
  server: {
    port: number;                // Default: 3000
    nodeEnv: string;             // development | production
  };
  review: {
    maxFiles: number;            // Default: 20
    maxFileSizeKB: number;       // Default: 500
    severity: string;            // low | medium | high
  };
}
```

### Configuration Loading
1. Read `.env` file (dotenv)
2. Override with environment variables
3. Validate required fields
4. Provide defaults for optional fields

---

## AI Integration Details

### Prompt Engineering

**Key Components**:
1. **Context**: PR title, description
2. **Files**: Changed files with diffs and full content
3. **Instructions**: What to look for (security, performance, etc.)
4. **Format**: JSON structure for consistent parsing

**Prompt Strategy**:
- Provide full context (within token limits)
- Request specific categories (security, performance, style)
- Ask for actionable feedback
- Request line-specific comments with file paths

### Response Format

```json
{
  "summary": {
    "overallRating": 8,
    "summary": "Overall summary...",
    "securityIssues": ["Issue 1"],
    "performanceIssues": ["Issue 1"],
    "codeQualityIssues": ["Issue 1"],
    "bestPractices": ["Suggestion 1"],
    "positivePoints": ["Good point 1"]
  },
  "comments": [
    {
      "path": "src/file.ts",
      "line": 42,
      "side": "RIGHT",
      "body": "[SECURITY] Issue description..."
    }
  ]
}
```

### Token Management

**Strategies**:
1. Limit file count (`MAX_FILES_TO_REVIEW`)
2. Limit file size (`MAX_FILE_SIZE_KB`)
3. Skip generated files (minified, lock files)
4. Provide diffs instead of full content for large files

---

## Security Considerations

### Secrets Management
- ✅ Use environment variables for all secrets
- ✅ Never commit `.env` file
- ✅ Use GitHub Secrets for Actions
- ✅ Validate webhook signatures

### API Tokens
- ✅ Use minimal required permissions
- ✅ Rotate tokens regularly
- ✅ Different tokens for different environments

### Code Safety
- ✅ No code execution on server
- ✅ Validate all inputs
- ✅ Rate limiting considerations
- ✅ Error handling to prevent leaks

---

## Performance

### Optimizations
1. **Parallel file fetching**: Use `Promise.all()`
2. **Content filtering**: Skip large/binary files
3. **Caching**: (Future) Cache AI responses for similar changes
4. **Async processing**: Don't block webhook responses

### Typical Metrics
- **GitHub API calls**: 2-5 per review
- **AI API calls**: 1 per review
- **Response time**: 15-60 seconds (depends on PR size)
- **Memory usage**: ~50-200MB
- **Token usage**: 1K-10K per review

---

## Containerization

### Docker
- **Base image**: `node:20-alpine` (minimal, secure)
- **Build strategy**: Multi-stage not needed (simple build)
- **Port**: 3000 (configurable)
- **Health check**: `/health` endpoint

### Docker Compose
- Single service setup
- Environment variable injection
- Volume mounting for logs
- Auto-restart policy

---

## Monitoring & Observability

### Logging
- **Library**: Winston
- **Format**: Structured JSON
- **Levels**: error, warn, info, debug
- **Fields**: timestamp, level, message, metadata

### Metrics to Track
- Number of reviews completed
- Average response time
- AI API costs
- Error rates
- GitHub API rate limit status

---

## Testing Strategy

### Unit Tests
- AI response parsing
- Configuration validation
- Utility functions

### Integration Tests
- GitHub API mocking
- AI API mocking
- End-to-end PR review simulation

### Manual Testing
- Real PR reviews
- Different file types
- Edge cases (large PRs, binary files)

---

## CI/CD Pipeline

### GitHub Actions
1. **Trigger**: PR events (opened, synchronize)
2. **Steps**:
   - Checkout code
   - Setup Node.js
   - Install dependencies
   - Build TypeScript
   - Run review
3. **Secrets**: AI API keys, GitHub token

### Deployment
- **GitHub Actions**: Auto-deploy on PR
- **Webhook Server**: Docker container on cloud
- **CLI**: npm package or direct execution

---

## Future Enhancements

### Planned Features
- [ ] Support for more AI providers (Gemini, Cohere)
- [ ] Configurable review rules per repository
- [ ] Review caching to reduce costs
- [ ] Multi-language support
- [ ] Custom review templates
- [ ] Integration with other platforms (GitLab, Bitbucket)
- [ ] Web dashboard for review analytics
- [ ] Team-specific customization
- [ ] Learning from accepted/rejected suggestions

### Scalability Considerations
- [ ] Queue system for high-volume scenarios
- [ ] Distributed processing
- [ ] Database for review history
- [ ] API rate limit management
- [ ] Cost tracking per repo/organization

---

## Cost Estimation

### Per Review (Average PR: 5-10 files)

| Provider | Model | Input Tokens | Output Tokens | Cost |
|----------|-------|--------------|---------------|------|
| OpenAI | GPT-4 Turbo | ~5K | ~1K | $0.10-0.50 |
| OpenAI | GPT-3.5 Turbo | ~5K | ~1K | $0.01-0.05 |
| Anthropic | Claude 3.5 Sonnet | ~5K | ~1K | $0.15-0.60 |
| Anthropic | Claude 3 Haiku | ~5K | ~1K | $0.01-0.05 |

### Monthly Estimates

**Small Team** (50 PRs/month):
- GPT-4 Turbo: $5-25/month
- Claude 3.5 Sonnet: $7.50-30/month

**Medium Team** (200 PRs/month):
- GPT-4 Turbo: $20-100/month
- Claude 3.5 Sonnet: $30-120/month

**Large Team** (1000 PRs/month):
- GPT-4 Turbo: $100-500/month
- Claude 3.5 Sonnet: $150-600/month

---

## Comparison with Alternatives

| Feature | This Tool | GitHub Copilot | Code Climate | SonarQube |
|---------|-----------|----------------|--------------|-----------|
| AI-Powered | ✅ | ✅ | ❌ | ❌ |
| Inline Comments | ✅ | ✅ | ✅ | ✅ |
| Custom Prompts | ✅ | ❌ | ❌ | Limited |
| Self-Hosted | ✅ | ❌ | ✅ | ✅ |
| Cost | Variable | $10-20/user | $15-30/user | Free/Paid |
| Multi-Provider | ✅ | ❌ | N/A | N/A |

---

## Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

### Git Workflow
1. Create feature branch
2. Make changes
3. Run linter and tests
4. Commit with descriptive message
5. Open PR (will trigger self-review! 🎉)
6. Address feedback
7. Merge to main

---

## Support & Resources

### Documentation
- [README.md](./README.md) - Main documentation
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Step-by-step setup
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines
- This file (TECH_STACK.md) - Technical details

### External Resources
- [GitHub REST API](https://docs.github.com/en/rest)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Anthropic API Documentation](https://docs.anthropic.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Last Updated**: November 2024
**Version**: 1.0.0
**Maintainer**: See [CONTRIBUTING.md](./CONTRIBUTING.md)

