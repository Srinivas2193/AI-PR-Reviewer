# Contributing to AI Code Reviewer

Thank you for your interest in contributing! 🎉

## How to Contribute

### Reporting Bugs

- Check if the bug has already been reported in [Issues](https://github.com/yourusername/ai-code-reviewer/issues)
- If not, create a new issue with:
  - Clear title and description
  - Steps to reproduce
  - Expected vs actual behavior
  - Environment details (Node version, OS, etc.)

### Suggesting Enhancements

- Open an issue with the `enhancement` label
- Describe your idea clearly
- Explain why it would be useful

### Pull Requests

1. **Fork the repository**
2. **Create a branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Test thoroughly**
5. **Commit**: `git commit -m 'Add amazing feature'`
6. **Push**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Development Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/ai-code-reviewer.git
cd ai-code-reviewer

# Install dependencies
npm install

# Create .env file
cp env.example .env
# Edit .env with your credentials

# Build
npm run build

# Test
npm test
```

### Code Style

- Follow TypeScript best practices
- Use Prettier for formatting: `npm run format`
- Use ESLint: `npm run lint`
- Write meaningful commit messages

### Adding New AI Providers

1. Create a new file in `src/ai/` (e.g., `src/ai/gemini.ts`)
2. Extend the `AIProvider` base class
3. Implement the `reviewPR` method
4. Update `src/ai/factory.ts` to include your provider
5. Add configuration in `src/config.ts`
6. Update documentation

Example:
```typescript
// src/ai/gemini.ts
import { AIProvider } from './base';
import { PRContext, AIReviewResult } from '../types';

export class GeminiProvider extends AIProvider {
  async reviewPR(context: PRContext): Promise<AIReviewResult> {
    // Implementation
  }
}
```

### Testing Guidelines

- Test with real PRs before submitting
- Include both positive and negative test cases
- Document any manual testing steps

## Questions?

Feel free to open an issue with the `question` label!

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow

---

Thank you for contributing! 🙏

