// Demo file for AI Code Reviewer
// This file has exactly 4 intentional issues for testing

// ISSUE 1: Hardcoded API token (SECURITY)
export const API_TOKEN = "ghp_1234567890abcdefghijklmnopqrstuvwxyz";

// ISSUE 2: Inefficient array operation (PERFORMANCE)
export function filterLargeArray(items: any[]) {
  let result = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items.length; j++) {
      if (items[i].id === items[j].relatedId) {
        result.push(items[i]);
      }
    }
  }
  return result;
}

// ISSUE 3: Missing null check (BUG)
export function getUserName(user: any) {
  return user.profile.name.toUpperCase();
}

// ISSUE 4: No error handling (CODE QUALITY)
export async function loadData(url: string) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

