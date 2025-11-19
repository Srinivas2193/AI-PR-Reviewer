export interface PRFile {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
  patch?: string;
  contents?: string;
}

export interface ReviewComment {
  path: string;
  line: number;
  side: 'LEFT' | 'RIGHT';
  body: string;
}

export interface ReviewSummary {
  overallRating: number; // 1-10
  summary: string;
  securityIssues: string[];
  performanceIssues: string[];
  codeQualityIssues: string[];
  bestPractices: string[];
  positivePoints: string[];
}

export interface AIReviewResult {
  summary: ReviewSummary;
  comments: ReviewComment[];
}

export interface PRContext {
  owner: string;
  repo: string;
  pullNumber: number;
  title: string;
  description: string;
  files: PRFile[];
}

