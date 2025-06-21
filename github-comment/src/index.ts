import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as github from '@actions/github';

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

    // For now, just echo the command that would be run
    await exec.exec('echo', ['github-comment', ...args]);

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
