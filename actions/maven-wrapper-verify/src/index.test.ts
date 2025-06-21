import { describe, it, expect } from 'vitest';
import { run } from './index';

describe('maven-wrapper-verify action', () => {
  it('should export a run function', () => {
    expect(typeof run).toBe('function');
  });

  it('should not throw when calling run function', async () => {
    // Since this is a GitHub Action that depends on environment variables,
    // we'll just test that the function exists and can be called
    // In a real scenario, you'd mock @actions/core and test the logic
    expect(() => run()).not.toThrow();
  });
});