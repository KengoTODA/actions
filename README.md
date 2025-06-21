# GitHub Actions Monorepo

This repository contains a collection of GitHub Actions organized as a monorepo using Turborepo for efficient build and development workflows.

## 🏗️ Monorepo Structure

```
├── actions/                    # Individual GitHub Actions
│   ├── github-comment/         # GitHub comment posting action
│   └── maven-wrapper-verify/   # Maven wrapper verification action
├── .github/workflows/          # CI/CD workflows
├── package.json               # Root package with workspaces
├── turbo.json                 # Turborepo configuration
├── tsconfig.json              # Shared TypeScript configuration
├── .eslintrc.js               # ESLint configuration
├── .prettierrc                # Prettier configuration
├── vitest.config.ts           # Vitest testing configuration
└── README.md                  # This file
```

## 🚀 Available Actions

### github-comment

Runs the [github-comment](https://suzuki-shunsuke.github.io/github-comment/) tool to post comments on GitHub.

**Usage:**

```yaml
- uses: KengoTODA/actions/github-comment@v1
  with:
    version: 'latest'
    config-path: '.github-comment.yml'
    template: 'path/to/template.md'
    vars: 'key1=value1,key2=value2'
```

### maven-wrapper-verify

Verifies Maven Wrapper integrity by checking JAR files and their checksums.

**Usage:**

```yaml
- uses: KengoTODA/actions/maven-wrapper-verify@v1
  with:
    working-directory: '.'
    allow-snapshots: false
```

## 🛠️ Development

### Prerequisites

- Node.js 20 or higher
- npm (comes with Node.js)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/KengoTODA/actions.git
   cd actions
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Scripts

- `npm run build` - Build all actions using Turborepo
- `npm run test` - Run tests for all actions
- `npm run lint` - Lint all TypeScript files
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run clean` - Clean build artifacts

### Building Individual Actions

Each action can be built individually:

```bash
cd actions/github-comment
npm run build
```

This uses `@vercel/ncc` to create a single optimized JavaScript file in the `dist/` directory.

### Testing

Tests are written using Vitest. Run tests for all actions:

```bash
npm run test
```

Or run tests for a specific action:

```bash
cd actions/github-comment
npm run test
```

## 📦 Technology Stack

- **Runtime**: Node.js 20
- **Language**: TypeScript 5.2+
- **Build Tool**: Turborepo
- **Bundler**: @vercel/ncc
- **Testing**: Vitest
- **Linting**: ESLint with TypeScript support
- **Formatting**: Prettier
- **Package Manager**: npm with workspaces

## 🔄 CI/CD

### Pull Request Workflow

The CI workflow (`.github/workflows/ci.yml`) runs on every pull request and:

1. Sets up Node.js 20
2. Installs dependencies
3. Runs linting and formatting checks
4. Performs TypeScript type checking
5. Runs all tests
6. Builds all actions
7. Checks for uncommitted changes and auto-commits if needed

### Release Workflow

The release workflow (`.github/workflows/release.yml`) runs on pushes to main and:

1. Builds all actions
2. Determines the next version from conventional commits
3. Creates a GitHub release with release notes

## 📋 Adding New Actions

To add a new action to this monorepo:

### TODO: Add new Action module here...

1. Create a new directory under `actions/`:

   ```bash
   mkdir actions/your-action-name
   cd actions/your-action-name
   ```

2. Create the package.json:

   ```json
   {
     "name": "@kengotoda/your-action-name",
     "version": "1.0.0",
     "description": "Description of your action",
     "main": "dist/index.js",
     "scripts": {
       "build": "ncc build src/index.ts -o dist --source-map --license licenses.txt",
       "test": "vitest run",
       "test:watch": "vitest",
       "lint": "eslint src/**/*.ts",
       "type-check": "tsc --noEmit",
       "clean": "rm -rf dist"
     },
     "dependencies": {
       "@actions/core": "^1.10.1"
     },
     "devDependencies": {
       "@types/node": "^20.0.0",
       "typescript": "^5.2.0",
       "vitest": "^0.34.0"
     },
     "engines": {
       "node": ">=20.0.0"
     }
   }
   ```

3. Create the action.yml file with your action's metadata

4. Create src/index.ts with your action logic

5. Add tests in src/index.test.ts

6. Build and test your action:
   ```bash
   npm run build
   npm run test
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass and code is properly formatted
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔧 Configuration Files

- **turbo.json**: Turborepo pipeline configuration
- **tsconfig.json**: Shared TypeScript configuration
- **.eslintrc.js**: ESLint rules and configuration
- **.prettierrc**: Prettier formatting rules
- **vitest.config.ts**: Vitest testing configuration
- **.gitignore**: Git ignore patterns

The monorepo is designed to scale efficiently as more actions are added, with shared tooling and consistent development practices across all actions.
