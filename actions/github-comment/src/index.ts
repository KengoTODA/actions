import * as core from '@actions/core';
import * as exec from '@actions/exec';

/**
 * Main function that runs the github-comment action
 */
async function run(): Promise<void> {
  try {
    // Get inputs
    const version = core.getInput('version') || 'latest';
    const configPath = core.getInput('config-path');
    const template = core.getInput('template');
    const vars = core.getInput('vars');

    core.info(`Running github-comment version: ${version}`);

    // TODO: Implement github-comment tool execution
    // This is a placeholder implementation that runs the github-comment tool
    // from https://suzuki-shunsuke.github.io/github-comment/

    const args: string[] = [];

    if (configPath) {
      args.push('--config', configPath);
    }

    if (template) {
      args.push('--template', template);
    }

    if (vars) {
      args.push('--vars', vars);
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
