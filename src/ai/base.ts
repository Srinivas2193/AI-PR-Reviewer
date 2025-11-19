import { PRContext, AIReviewResult } from '../types';

export abstract class AIProvider {
  abstract reviewPR(context: PRContext): Promise<AIReviewResult>;

  protected buildReviewPrompt(context: PRContext): string {
    const filesInfo = context.files
      .map((file) => {
        let fileInfo = `\n### File: ${file.filename} (${file.status})\n`;
        fileInfo += `Additions: ${file.additions}, Deletions: ${file.deletions}\n`;

        if (file.patch) {
          fileInfo += `\nDiff:\n\`\`\`diff\n${file.patch}\n\`\`\`\n`;
        }

        if (file.contents && file.contents.length < 10000) {
          fileInfo += `\nFull Content:\n\`\`\`\n${file.contents}\n\`\`\`\n`;
        }

        return fileInfo;
      })
      .join('\n---\n');

    return `You are an expert code reviewer. Review the following Pull Request and provide detailed feedback.

**PR Title:** ${context.title}

**PR Description:**
${context.description || 'No description provided'}

**Files Changed (${context.files.length} files):**
${filesInfo}

---

**Your Task:**
Analyze this PR thoroughly and provide:

1. **Inline Comments**: Specific issues in the code that need attention. For each issue:
   - Identify the file and approximate line number
   - Explain the problem
   - Suggest a fix or improvement
   - Categorize: [SECURITY], [PERFORMANCE], [BUG], [STYLE], [BEST_PRACTICE]

2. **Overall Assessment**: Provide a summary with:
   - Overall rating (1-10)
   - Key security concerns (if any)
   - Performance issues (if any)
   - Code quality observations
   - Best practice violations
   - Positive aspects of the code

**Response Format (CRITICAL - Follow this JSON structure exactly):**

\`\`\`json
{
  "summary": {
    "overallRating": 8,
    "summary": "Overall summary of the PR...",
    "securityIssues": ["Issue 1", "Issue 2"],
    "performanceIssues": ["Issue 1"],
    "codeQualityIssues": ["Issue 1", "Issue 2"],
    "bestPractices": ["Suggestion 1", "Suggestion 2"],
    "positivePoints": ["Good thing 1", "Good thing 2"]
  },
  "comments": [
    {
      "path": "src/example.ts",
      "line": 42,
      "side": "RIGHT",
      "body": "[SECURITY] SQL injection vulnerability: Use parameterized queries instead..."
    }
  ]
}
\`\`\`

**Important Guidelines:**
- Be constructive and helpful
- Focus on significant issues, not nitpicks (unless they're important)
- Provide specific, actionable feedback
- Include code examples when suggesting fixes
- Consider the context of the entire PR
- Use "RIGHT" for new code, "LEFT" for old code
- Line numbers should match the diff (approximate if needed)
`;
  }

  protected parseAIResponse(responseText: string): AIReviewResult {
    try {
      // Try to extract JSON from markdown code blocks if present
      const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) || 
                        responseText.match(/```\n([\s\S]*?)\n```/);
      
      const jsonText = jsonMatch ? jsonMatch[1] : responseText;
      const parsed = JSON.parse(jsonText);

      // Validate structure
      if (!parsed.summary || !parsed.comments) {
        throw new Error('Invalid response structure');
      }

      return parsed as AIReviewResult;
    } catch (error) {
      // Fallback if parsing fails
      return {
        summary: {
          overallRating: 7,
          summary: responseText.substring(0, 500),
          securityIssues: [],
          performanceIssues: [],
          codeQualityIssues: [],
          bestPractices: [],
          positivePoints: [],
        },
        comments: [],
      };
    }
  }

  protected formatSummaryForGitHub(context: PRContext, result: AIReviewResult): string {
    const { summary } = result;
    const ratingEmoji = summary.overallRating >= 8 ? '🟢' : summary.overallRating >= 6 ? '🟡' : '🔴';

    let markdown = `# 🤖 AI Code Reviewer\n\n`;
    markdown += `> Automated code review powered by AI\n\n`;
    markdown += `### ${ratingEmoji} Overall Rating: ${summary.overallRating}/10\n\n`;
    markdown += `${summary.summary}\n\n`;

    if (summary.securityIssues.length > 0) {
      markdown += `### 🔒 Security Issues\n`;
      summary.securityIssues.forEach((issue) => {
        markdown += `- ⚠️ ${issue}\n`;
      });
      markdown += `\n`;
    }

    if (summary.performanceIssues.length > 0) {
      markdown += `### ⚡ Performance Issues\n`;
      summary.performanceIssues.forEach((issue) => {
        markdown += `- ${issue}\n`;
      });
      markdown += `\n`;
    }

    if (summary.codeQualityIssues.length > 0) {
      markdown += `### 📝 Code Quality Issues\n`;
      summary.codeQualityIssues.forEach((issue) => {
        markdown += `- ${issue}\n`;
      });
      markdown += `\n`;
    }

    if (summary.bestPractices.length > 0) {
      markdown += `### 💡 Best Practice Suggestions\n`;
      summary.bestPractices.forEach((practice) => {
        markdown += `- ${practice}\n`;
      });
      markdown += `\n`;
    }

    if (summary.positivePoints.length > 0) {
      markdown += `### ✅ Positive Points\n`;
      summary.positivePoints.forEach((point) => {
        markdown += `- ${point}\n`;
      });
      markdown += `\n`;
    }

    markdown += `\n---\n`;
    markdown += `📊 **Stats:** ${context.files.length} files changed`;
    
    const totalAdditions = context.files.reduce((sum, f) => sum + f.additions, 0);
    const totalDeletions = context.files.reduce((sum, f) => sum + f.deletions, 0);
    markdown += ` | +${totalAdditions} -${totalDeletions}\n`;
    
    if (result.comments.length > 0) {
      markdown += `💬 **Inline Comments:** ${result.comments.length} specific suggestions\n`;
    }

    markdown += `\n*Powered by AI Code Reviewer*`;

    return markdown;
  }
}

