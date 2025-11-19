// Test file with intentional issues for AI PR reviewer to catch
// This file contains security, performance, and code quality issues

import { Request, Response } from 'express';

// SECURITY ISSUE: Hardcoded credentials
const API_KEY = "sk-1234567890abcdefghijklmnopqrstuvwxyz"; // Never hardcode API keys!
const DB_PASSWORD = "admin123"; // Plain text password in code

// SECURITY ISSUE: SQL Injection vulnerability
export function getUserById(userId: string) {
  const query = "SELECT * FROM users WHERE id = " + userId; // SQL injection risk!
  return query;
}

// BUG: Using == instead of ===
export function checkAge(age: number) {
  if (age == 18) { // Should use === for strict equality
    return "Adult";
  }
  return "Minor";
}

// CODE QUALITY ISSUE: Missing error handling
export async function fetchUserData(userId: string) {
  const response = await fetch(`https://api.example.com/users/${userId}`);
  const data = await response.json(); // What if response fails?
  return data;
}

// BEST PRACTICE ISSUE: Using var instead of const/let
var globalConfig = {
  apiUrl: "https://api.example.com",
  timeout: 5000
};

// SECURITY ISSUE: No input validation
export function createUser(req: Request, res: Response) {
  const { email, password } = req.body;
  // No validation - what if email is malicious?
  const user = {
    email: email,
    password: password // Should be hashed!
  };
  return user;
}

// PERFORMANCE ISSUE: N+1 query problem
export async function getUsersWithPosts(userIds: string[]) {
  const results = [];
  for (const id of userIds) {
    // This creates N queries instead of 1
    const user = await fetch(`/api/users/${id}`);
    const posts = await fetch(`/api/posts?userId=${id}`);
    results.push({ user, posts });
  }
  return results;
}

// BUG: Function doesn't handle edge cases
export function divideNumbers(a: number, b: number) {
  return a / b; // What if b is 0?
}

// CODE QUALITY ISSUE: Overly complex nested conditions
export function processUserAccess(user: any) {
  if (user) {
    if (user.isActive) {
      if (user.role === 'admin') {
        if (user.permissions) {
          if (user.permissions.includes('write')) {
            return true;
          }
        }
      }
    }
  }
  return false;
}

// PERFORMANCE ISSUE: Synchronous blocking operation
export function processLargeFile(data: string) {
  let result = "";
  for (let i = 0; i < 1000000; i++) {
    result += data; // String concatenation in loop - very slow!
  }
  return result;
}

// SECURITY ISSUE: Eval usage (code injection risk)
export function calculateFormula(formula: string) {
  return eval(formula); // Never use eval with user input!
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

