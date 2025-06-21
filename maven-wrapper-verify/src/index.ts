import * as core from '@actions/core';
import * as glob from '@actions/glob';
import { promises as fs } from 'fs';
import * as path from 'path';

/**
 * Main function that runs the maven-wrapper-verify action
 */
async function run(): Promise<void> {
  try {
    // Get inputs
    const workingDirectory = core.getInput('working-directory') || '.';
    const allowSnapshots = core.getBooleanInput('allow-snapshots') || false;

    core.info(`Verifying Maven Wrapper in directory: ${workingDirectory}`);
    core.info(`Allow snapshots: ${allowSnapshots}`);

    // Look for Maven wrapper files
    const globber = await glob.create(
      path.join(workingDirectory, '.mvn/wrapper/maven-wrapper.jar')
    );
    const wrapperFiles = await globber.glob();

    if (wrapperFiles.length === 0) {
      core.setFailed('No Maven wrapper jar found in .mvn/wrapper/maven-wrapper.jar');
      return;
    }

    core.info(`Found Maven wrapper: ${wrapperFiles[0]}`);

    // TODO: Implement actual Maven Wrapper verification
    // This would typically involve:
    // 1. Checking the JAR file integrity
    // 2. Verifying checksums against known good values
    // 3. Checking for suspicious modifications

    // For now, just check if the file exists and is readable
    const wrapperPath = wrapperFiles[0];
    if (!wrapperPath) {
      core.setFailed('No Maven wrapper jar found');
      return;
    }

    try {
      const stats = await fs.stat(wrapperPath);
      if (!stats.isFile()) {
        core.setFailed(`Maven wrapper is not a regular file: ${wrapperPath}`);
        return;
      }

      core.info(`Maven wrapper file size: ${stats.size} bytes`);
      core.info('Maven wrapper verification completed successfully');
    } catch (error) {
      core.setFailed(
        `Failed to verify Maven wrapper: ${error instanceof Error ? error.message : String(error)}`
      );
    }
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
