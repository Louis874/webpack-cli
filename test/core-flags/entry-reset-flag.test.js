'use strict';

const { run } = require('../utils/test-utils');

describe('--entry-reset flag', () => {
    it('should reset entry correctly', () => {
        const { stderr, stdout, exitCode } = run(__dirname, ['--entry-reset', '--entry', './src/entry.js']);

        expect(stderr).toBeFalsy();
        expect(exitCode).toBe(0);
        expect(stdout).toContain('src/entry.js');
        expect(stdout).not.toContain('src/main.js');
    });

    it('should thorw error if entry is an emtry array', () => {
        const { stderr, stdout, exitCode } = run(__dirname, ['--entry-reset']);

        expect(stderr).toContain('configuration.entry should be an non-empty array');
        expect(exitCode).toBe(2);
        expect(stdout).toBeFalsy();
    });
});
