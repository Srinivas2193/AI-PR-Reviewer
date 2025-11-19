# 🌍 Supported Languages & Tech Stacks

**Yes, ALL of them!** Your AI Code Reviewer works with every programming language and framework.

---

## ✅ Complete Language Support

| Category | Languages/Frameworks | Status |
|----------|---------------------|--------|
| **Frontend** | React, Vue, Angular, Svelte, Next.js | ✅ Full Support |
| **Backend** | Node.js, Python, Java, .NET, Go, Ruby, PHP, Rust | ✅ Full Support |
| **Mobile** | React Native, Flutter, Swift, Kotlin | ✅ Full Support |
| **Database** | SQL, MongoDB, PostgreSQL, MySQL | ✅ Full Support |
| **DevOps** | Docker, Kubernetes, Terraform, YAML | ✅ Full Support |
| **Scripting** | Bash, PowerShell, Python scripts | ✅ Full Support |

---

## 🎯 Framework-Specific Insights

### React.js / React TypeScript

**What the AI checks:**
- ✅ React Hooks rules (useEffect dependencies, custom hooks)
- ✅ Component performance (useMemo, useCallback, React.memo)
- ✅ PropTypes or TypeScript interfaces
- ✅ Key props in lists
- ✅ State management patterns
- ✅ Accessibility (a11y) issues
- ✅ Event handler optimization

**Example Review:**
```jsx
// AI will catch:
useEffect(() => {
  fetchData(userId);
}, []); // ❌ Missing userId dependency!
```

---

### Python (Django, Flask, FastAPI)

**What the AI checks:**
- ✅ PEP 8 compliance
- ✅ Type hints and annotations
- ✅ Exception handling patterns
- ✅ Context managers (with statements)
- ✅ List comprehensions vs loops
- ✅ Django ORM optimization
- ✅ Async/await usage in FastAPI

**Example Review:**
```python
# AI will catch:
def get_users():
    users = User.objects.all()
    for user in users:
        user.posts  # ❌ N+1 query problem!
```

---

### Java (Spring Boot)

**What the AI checks:**
- ✅ Exception handling (try-catch-finally)
- ✅ Resource management (try-with-resources)
- ✅ Stream API optimization
- ✅ Null pointer exceptions
- ✅ Generics usage
- ✅ Spring annotations
- ✅ Thread safety

**Example Review:**
```java
// AI will catch:
public void processFile(String path) {
    FileReader reader = new FileReader(path);
    // ❌ Resource leak! Use try-with-resources
}
```

---

### .NET / C# (ASP.NET Core)

**What the AI checks:**
- ✅ Async/await patterns
- ✅ IDisposable implementation
- ✅ LINQ query optimization
- ✅ Null reference handling (nullable types)
- ✅ Task cancellation tokens
- ✅ Dependency injection
- ✅ Entity Framework optimization

**Example Review:**
```csharp
// AI will catch:
public async Task<List<User>> GetUsers() {
    return dbContext.Users.ToList(); 
    // ❌ Use ToListAsync() for async!
}
```

---

### TypeScript

**What the AI checks:**
- ✅ Type safety (any usage, type assertions)
- ✅ Interface definitions
- ✅ Generics usage
- ✅ Null/undefined handling
- ✅ Enum vs const enum
- ✅ Type guards
- ✅ Strict mode compliance

**Example Review:**
```typescript
// AI will catch:
function getUser(id: string): any {
    // ❌ Don't use 'any', define proper types!
    return fetch(`/api/users/${id}`);
}
```

---

### Go

**What the AI checks:**
- ✅ Error handling patterns
- ✅ Goroutine management
- ✅ Channel usage
- ✅ defer statements
- ✅ Interface implementations
- ✅ Context usage
- ✅ Memory leaks

**Example Review:**
```go
// AI will catch:
func getUser(id string) User {
    user, _ := db.Query(id)  // ❌ Error ignored!
    return user
}
```

---

### SQL (All Dialects)

**What the AI checks:**
- ✅ SQL injection vulnerabilities
- ✅ Missing indexes
- ✅ N+1 query problems
- ✅ SELECT * usage
- ✅ JOIN optimization
- ✅ Transaction management
- ✅ Deadlock risks

**Example Review:**
```sql
-- AI will catch:
SELECT * FROM users WHERE id = '$userId';
-- ❌ SQL injection risk! Use parameterized queries
```

---

### PHP (Laravel)

**What the AI checks:**
- ✅ SQL injection via raw queries
- ✅ XSS vulnerabilities
- ✅ CSRF protection
- ✅ Eloquent optimization
- ✅ Type declarations
- ✅ Error handling
- ✅ PSR standards

**Example Review:**
```php
// AI will catch:
$users = DB::select("SELECT * FROM users WHERE id = " . $id);
// ❌ SQL injection! Use query builder or prepared statements
```

---

### Ruby (Ruby on Rails)

**What the AI checks:**
- ✅ N+1 queries in ActiveRecord
- ✅ Mass assignment vulnerabilities
- ✅ SQL injection
- ✅ Ruby idioms
- ✅ Exception handling
- ✅ Gem security issues
- ✅ Performance patterns

**Example Review:**
```ruby
# AI will catch:
@users.each do |user|
  user.posts.count  # ❌ N+1 query!
end
```

---

## 🔥 Real-World Examples

### React Native App
```javascript
// AI will review:
✅ Platform-specific code
✅ Performance (FlatList optimization)
✅ Memory leaks in useEffect
✅ Navigation patterns
✅ AsyncStorage usage
```

### Docker Configuration
```dockerfile
# AI will review:
✅ Base image security
✅ Layer optimization
✅ Secrets in ENV
✅ USER directive usage
✅ Health checks
```

### Kubernetes YAML
```yaml
# AI will review:
✅ Resource limits
✅ Security contexts
✅ Liveness/readiness probes
✅ Secret management
✅ Best practices
```

---

## 🎯 Universal Reviews Across All Languages

**Security**: SQL injection, XSS, hardcoded secrets  
**Performance**: Algorithmic complexity, memory usage  
**Bugs**: Null checks, edge cases, type errors  
**Quality**: Error handling, code structure  
**Best Practices**: Language-specific idioms  

---

## 🚀 How to Use

**Same workflow for ALL languages!**

1. Add `.github/workflows/ai-review.yml` to your repo
2. Add `GEMINI_API_KEY` to secrets
3. Create a PR
4. Get AI reviews! 🎉

No configuration needed - the AI automatically detects your language and adapts!

---

## ✨ The Magic

Your AI Code Reviewer uses **Google Gemini** (or GPT-4/Claude), which:
- 📚 Was trained on **billions of lines** of code
- 🌍 Understands **every major programming language**
- 🧠 Knows **framework-specific patterns**
- 🔍 Detects **language-specific issues**
- 💡 Suggests **best practices** for each ecosystem

**One tool, infinite languages!** 🌈

---

## 💬 Questions?

**Q: Do I need to configure it for each language?**  
A: No! The AI automatically detects and adapts.

**Q: Will it understand my framework (e.g., NestJS, FastAPI)?**  
A: Yes! The AI knows all major frameworks.

**Q: What about mixed-language repos (e.g., React + Python)?**  
A: Works perfectly! Reviews each file in its own language.

**Q: Does it work with my company's internal framework?**  
A: Yes! The AI understands patterns and can learn from your codebase.

---

## 🎉 Start Reviewing!

See [DEPLOY_TO_OTHER_REPOS.md](DEPLOY_TO_OTHER_REPOS.md) for setup instructions.

**Your AI Code Reviewer works with EVERYTHING!** 🚀

