# GitHub Copilot Instructions - Actions Monorepo

This document contains valuable rules and knowledge learned during the development of this GitHub Actions monorepo. Follow these guidelines when working on this repository.

## 🏗️ Repository Architecture Rules

### Monorepo Structure
- **Action Placement**: Actions must be placed in the root directory (e.g., `github-comment/`, `maven-wrapper-verify/`) NOT in subdirectories like `actions/github-comment/`. GitHub Actions usage syntax `user/repo/action@version` requires actions to be at root level.

### Technology Stack Decisions
- **Node.js Version**: Always use Node.js 20 (latest supported by GitHub Actions)
- **TypeScript**: Use TypeScript 5.2+ with strict configuration
- **Build System**: Turborepo for monorepo management and pipeline orchestration
- **Bundler**: `@vercel/ncc` for single-file optimized builds
- **Testing**: Vitest for modern testing framework
- **Version Management**: Changesets (NOT semantic-release) for monorepo support
- **Code Quality**: ESLint + Prettier with TypeScript support

## 🔧 GitHub Actions Development Rules

### Action Structure Requirements
1. Each action must have:
   - `action.yml` - Action metadata and inputs/outputs
   - `package.json` - Node.js package configuration
   - `src/index.ts` - Main TypeScript source
   - `dist/index.js` - Built JavaScript (committed to repo)
   - `tsconfig.json` - TypeScript configuration

### Action Inputs Best Practices
- Keep inputs minimal and focused
- Remove unnecessary inputs that add complexity
- For external tools (like github-comment), provide `command` input for flexibility
- Set up environment variables automatically to reduce user boilerplate

### Binary Installation Pattern
When wrapping external CLI tools:
1. Download from GitHub releases
2. Use `@actions/tool-cache` for caching
3. Handle version resolution (`latest` → actual version)
4. Make binaries executable with `fs.chmodSync(path, '755')`
5. Cache tools to improve performance

### Environment Variables Setup
For GitHub context, automatically set these variables:
- `GH_COMMENT_REPO_ORG` - Repository owner
- `GH_COMMENT_REPO_NAME` - Repository name
- `GH_COMMENT_SHA1` - Commit SHA
- `GH_COMMENT_PR_NUMBER` - Pull request number (if applicable)

## 🚀 CI/CD Workflow Rules

### Permissions Management
Always specify explicit permissions for workflow jobs:

**CI Workflow (`pull_request`):**
```yaml
permissions:
  contents: write        # For git push
  pull-requests: write   # For PR interactions
```

**Release Workflow (`push` to main):**
```yaml
permissions:
  contents: write        # For releases
  issues: write         # For changesets
  pull-requests: write  # For release PRs
```

### Git Operations in CI
- **Checkout Strategy**: Use `ref: ${{ github.head_ref || github.ref }}` to avoid merge commits
- **Push Strategy**: Use `git push origin HEAD:${{ github.head_ref }}` for detached HEAD scenarios
- **Auto-commit Pattern**: Check for changes, then commit with `[skip ci]` to avoid infinite loops

### Workflow Concurrency
Add concurrency control to release workflows:
```yaml
concurrency: ${{ github.workflow }}-${{ github.ref }}
```

## 🧪 Testing and Quality Rules

### Smoke Testing
- Implement smoke tests for actions in CI workflow
- Use actual action (`uses: ./action-name`) with test configuration
- Provide required environment variables (`GITHUB_TOKEN`)

### Code Formatting
- Use `.prettierignore` to exclude build artifacts:
  ```
  */dist/
  **/dist/**
  ```
- Format check should pass before any git operations

### Template Systems
When using external tools with templates:
- Use built-in template variables (e.g., `.Commit.SHA`, `.PullRequest.Number`)
- Avoid environment variable references in templates (e.g., `.Env.*`) as they cause rendering errors

## 📦 Build and Distribution Rules

### Build Artifacts
- Commit `dist/` directories to repository (required for GitHub Actions)
- Use `@vercel/ncc` for single-file builds with source maps
- Include license information in builds: `--license licenses.txt`

### Turborepo Configuration
Structure pipeline with proper dependencies:
```json
{
  "build": {
    "dependsOn": ["^build"],
    "outputs": ["dist/**"]
  },
  "test": {
    "dependsOn": ["build"]
  }
}
```

## 🔄 Version Management Rules

### Changesets Workflow
1. **For Changes**: Run `npm run changeset` to create changeset files
2. **Release Process**: Changesets automatically creates Release PRs
3. **Publishing**: Merging Release PR triggers automatic GitHub release

### Conventional Commits
Use conventional commit format for changesets:
- `feat:` - New features
- `fix:` - Bug fixes  
- `chore:` - Maintenance tasks
- `docs:` - Documentation changes

## 🛠️ Development Experience Rules

### Package Scripts Standardization
Each action should have consistent scripts:
```json
{
  "build": "ncc build src/index.ts -o dist --source-map --license licenses.txt",
  "test": "vitest run",
  "test:watch": "vitest",
  "lint": "eslint src/**/*.ts",
  "type-check": "tsc --noEmit",
  "clean": "rm -rf dist"
}
```

### Dependency Management
- Use exact versions for runtime dependencies
- Use ranges for dev dependencies
- Keep `@actions/*` packages up to date
- Set `engines.node: ">=20.0.0"` requirement

## 🎯 Action Design Principles

### User Experience
- Minimize required inputs
- Provide sensible defaults
- Auto-configure environment when possible
- Clear error messages with actionable guidance

### Performance
- Cache external tool downloads
- Use Turborepo for parallel builds
- Optimize bundle sizes with ncc

### Reliability
- Handle edge cases (detached HEAD, missing PR context)
- Validate inputs before execution
- Provide clear error messages
- Use TypeScript strict mode for type safety

## 📋 Adding New Actions Checklist

When adding a new action:

1. ✅ Create directory at repository root
2. ✅ Add `package.json` with standard scripts
3. ✅ Create `action.yml` with proper metadata
4. ✅ Implement `src/index.ts` with error handling
5. ✅ Add tests in `src/*.test.ts`
6. ✅ Configure TypeScript with `tsconfig.json`
7. ✅ Build and verify `dist/` output
8. ✅ Add smoke test to CI workflow
9. ✅ Update root README.md documentation
10. ✅ Create changeset for version tracking

## 🚨 Common Pitfalls to Avoid

1. **Action Placement**: Don't put actions in subdirectories
2. **Permissions**: Don't forget to set workflow permissions
3. **Git Operations**: Handle detached HEAD state in CI
4. **Template Variables**: Use built-in variables, not environment references
5. **Build Artifacts**: Don't forget to commit `dist/` directories
6. **Caching**: Use tool-cache for external binary downloads
7. **Concurrency**: Add concurrency control to release workflows
8. **Format Checking**: Exclude build artifacts from Prettier

## 📚 External Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Turborepo Documentation](https://turbo.build/)
- [Changesets Documentation](https://github.com/changesets/changesets)
- [github-comment Tool](https://suzuki-shunsuke.github.io/github-comment/)
- [@vercel/ncc Documentation](https://github.com/vercel/ncc)

---

**Last Updated**: Generated automatically during PR development
**Maintainer**: @KengoTODA