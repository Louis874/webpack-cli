const { run } = require('../utils/test-utils');
const { red } = require('colorette');

describe('unknown behaviour', () => {
    it('warns the user if an unknown flag is passed in', () => {
        const { stderr, exitCode } = run(__dirname, ['--unknown']);
        expect(stderr).toBeTruthy();
        expect(stderr).toContain(`${red('Unknown argument: --unknown')}`);
        expect(exitCode).toBe(2);
    });

    it('throws error for unknow flag and respect --no-color', () => {
        const { stderr, exitCode } = run(__dirname, ['--unknown', '--no-color']);
        expect(stderr).toBeTruthy();
        expect(stderr).not.toContain(`${red('Unknown argument: --unknown')}`);
        expect(stderr).toContain('Unknown argument: --unknown');
        expect(exitCode).toBe(2);
    });

    it('suggests the closest match to an unknown flag', () => {
        const { stderr, stdout, exitCode } = run(__dirname, ['--entyr', './a.js']);
        expect(stderr).toContain('Unknown argument: --entyr');
        expect(stdout).toContain('Did you mean --entry?');
        expect(exitCode).toBe(2);
    });
});
