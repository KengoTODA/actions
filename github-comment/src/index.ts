import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as github from '@actions/github';
import * as tc from '@actions/tool-cache';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Install github-comment from GitHub releases
 */
async function installGithubComment(version: string): Promise<string> {
  const platform = 'linux';
  const arch = 'amd64';

  // Resolve version if 'latest'
  let resolvedVersion = version;
  if (version === 'latest') {
    core.info('Resolving latest version of github-comment...');
    const latestUrl = 'https://api.github.com/repos/suzuki-shunsuke/github-comment/releases/latest';
    const downloadPath = await tc.downloadTool(latestUrl);
    const releaseData = JSON.parse(fs.readFileSync(downloadPath, 'utf8'));
    resolvedVersion = releaseData.tag_name;
    core.info(`Latest version resolved to: ${resolvedVersion}`);
  }

  // Remove 'v' prefix if present
  const cleanVersion = resolvedVersion.replace(/^v/, '');

  // Check if already cached
  const toolName = 'github-comment';
  let toolPath = tc.find(toolName, cleanVersion);

  if (!toolPath) {
    core.info(`Installing github-comment version ${resolvedVersion}...`);

    // Download the binary
    const downloadUrl = `https://github.com/suzuki-shunsuke/github-comment/releases/download/${resolvedVersion}/github-comment_${cleanVersion}_${platform}_${arch}.tar.gz`;
    core.info(`Downloading from: ${downloadUrl}`);

    const tarPath = await tc.downloadTool(downloadUrl);
    const extractedPath = await tc.extractTar(tarPath);

    // Cache the tool
    toolPath = await tc.cacheDir(extractedPath, toolName, cleanVersion);
    core.info(`github-comment cached at: ${toolPath}`);
  } else {
    core.info(`Using cached github-comment version ${cleanVersion} from: ${toolPath}`);
  }

  const binaryPath = path.join(toolPath, 'github-comment');

  // Make sure the binary is executable
  if (fs.existsSync(binaryPath)) {
    fs.chmodSync(binaryPath, '755');
    core.info(`github-comment binary ready at: ${binaryPath}`);
    return binaryPath;
  } else {
    throw new Error(`github-comment binary not found at: ${binaryPath}`);
  }
}

/**
 * Main function that runs the github-comment action
 */
async function run(): Promise<void> {
  try {
    // Get inputs
    const version = core.getInput('version') || 'latest';
    const configPath = core.getInput('config-path');
    const command = core.getInput('command');

    if (!command) {
      throw new Error('command input is required');
    }

    core.info(`Running github-comment version: ${version}`);

    // Install github-comment
    const githubCommentPath = await installGithubComment(version);

    // Set up environment variables for github-comment
    const repository = github.context.repo;
    const sha = github.context.sha;
    const prNumber = github.context.payload.pull_request?.number;

    // Set environment variables
    core.exportVariable('GH_COMMENT_REPO_ORG', repository.owner);
    core.exportVariable('GH_COMMENT_REPO_NAME', repository.repo);
    core.exportVariable('GH_COMMENT_SHA1', sha);

    if (prNumber) {
      core.exportVariable('GH_COMMENT_PR_NUMBER', prNumber.toString());
    }

    core.info(`Repository: ${repository.owner}/${repository.repo}`);
    core.info(`SHA: ${sha}`);
    if (prNumber) {
      core.info(`PR Number: ${prNumber}`);
    }

    // Build the github-comment command
    const args: string[] = [command];

    if (configPath) {
      args.push('--config', configPath);
    }

    core.info('Executing github-comment with args: ' + args.join(' '));

    // Execute github-comment
    await exec.exec(githubCommentPath, args);

    core.info('github-comment action completed successfully');
  } catch (error) {
    core.setFailed(
      `Action failed with error: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

// Run the action
if (require.main === module) {
  void run();
}

export { run };
