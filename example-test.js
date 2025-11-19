// Example test file with intentional issues for AI PR reviewer to catch
// Use this file to test your AI PR reviewer setup

const express = require('express');
const app = express();

// SECURITY ISSUE: SQL Injection vulnerability
app.get('/user', (req, res) => {
  const userId = req.query.id;
  const query = "SELECT * FROM users WHERE id = " + userId; // SQL injection risk!
  res.send(query);
});

// SECURITY ISSUE: Password not hashed
function createUser(username, password) {
  // Password should be hashed before storage!
  return {
    username: username,
    password: password  // Storing plain text password
  };
}

// PERFORMANCE ISSUE: N+1 query problem
async function getUsersWithPosts(userIds) {
  const users = [];
  for (const id of userIds) {
    // This creates N queries instead of 1
    const user = await db.query(`SELECT * FROM users WHERE id = ${id}`);
    const posts = await db.query(`SELECT * FROM posts WHERE userId = ${id}`);
    users.push({ user, posts });
  }
  return users;
}

// CODE QUALITY ISSUE: Missing error handling
function divideNumbers(a, b) {
  return a / b; // What if b is 0?
}

// BEST PRACTICE ISSUE: Using var instead of const/let
var globalVariable = "This should be const or let";

// BEST PRACTICE ISSUE: No input validation
app.post('/create-user', (req, res) => {
  const email = req.body.email;
  // No validation - what if email is invalid?
  createUser(email, req.body.password);
});

// BUG: Incorrect comparison
function checkAge(age) {
  if (age = 18) { // Should be == or ===, not =
    return "You are 18";
  }
}

module.exports = { createUser, getUsersWithPosts, divideNumbers, checkAge };

