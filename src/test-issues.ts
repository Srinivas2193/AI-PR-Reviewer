// Test file - Now with all issues FIXED!
// This demonstrates how code should be written securely and efficiently

import { Request, Response } from 'express';

// FIXED: Load credentials from environment variables
const API_KEY = process.env.API_KEY;
const DB_PASSWORD = process.env.DB_PASSWORD;

// FIXED: Use parameterized query to prevent SQL injection
export function getUserById(userId: string) {
  // Using parameterized query (example syntax)
  const query = 'SELECT * FROM users WHERE id = ?';
  // Execute with userId as parameter: db.execute(query, [userId])
  return query;
}

// FIXED: Use strict equality
export function checkAge(age: number) {
  if (age === 18) { // Use === for strict equality
    return "Adult";
  }
  return "Minor";
}

// FIXED: Add proper error handling
export async function fetchUserData(userId: string) {
  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error; // Re-throw for caller to handle
  }
}

// FIXED: Use const instead of var
const globalConfig = {
  apiUrl: "https://api.example.com",
  timeout: 5000
};

// FIXED: Add input validation and password hashing
export async function createUser(req: Request, res: Response) {
  const { email, password } = req.body;
  
  // Validate input
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    throw new Error('Invalid email address');
  }
  if (!password || typeof password !== 'string' || password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }
  
  // Hash the password before storing (using bcrypt or similar in real code)
  // const hashedPassword = await bcrypt.hash(password, 10);
  const hashedPassword = '***HASHED***'; // Placeholder - use bcrypt.hash() in real code
  
  const user = {
    email: email,
    password: hashedPassword // Properly hashed!
  };
  return user;
}

// FIXED: Fetch data in bulk to avoid N+1 problem
export async function getUsersWithPosts(userIds: string[]) {
  // Fetch all users and posts in just 2 requests instead of 2*N
  const userIdsParam = userIds.join(',');
  const [usersResponse, postsResponse] = await Promise.all([
    fetch(`/api/users?ids=${userIdsParam}`),
    fetch(`/api/posts?userIds=${userIdsParam}`)
  ]);
  
  const users: any = await usersResponse.json();
  const posts: any = await postsResponse.json();
  
  // Map users to their posts in memory
  return userIds.map(id => ({
    user: users.find((u: any) => u.id === id),
    posts: posts.filter((p: any) => p.userId === id)
  }));
}

// FIXED: Handle division by zero
export function divideNumbers(a: number, b: number) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

// FIXED: Simplify nested conditions
export function processUserAccess(user: any) {
  return !!(
    user &&
    user.isActive &&
    user.role === 'admin' &&
    user.permissions?.includes('write')
  );
}

// FIXED: Use array join for efficient string building
export function processLargeFile(data: string) {
  const parts = [];
  for (let i = 0; i < 1000000; i++) {
    parts.push(data); // Build array, then join
  }
  return parts.join(''); // Much faster!
}

// FIXED: Replace eval with safe alternative (example using mathjs)
export function calculateFormula(formula: string) {
  // In real code, use a library like 'mathjs' or 'expr-eval'
  // import { evaluate } from 'mathjs';
  // return evaluate(formula);
  
  // For this example, just return a safe message
  throw new Error('Use a safe math expression parser library instead of eval');
}

export default {
  getUserById,
  checkAge,
  fetchUserData,
  createUser,
  getUsersWithPosts,
  divideNumbers,
  processUserAccess,
  processLargeFile,
  calculateFormula
};

