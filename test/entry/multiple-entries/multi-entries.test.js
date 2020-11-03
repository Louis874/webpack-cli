'use strict';

const { run } = require('../../utils/test-utils');
const { stat, readFile } = require('fs');
const { resolve, join } = require('path');
const rimraf = require('rimraf');

describe(' multiple entries', () => {
    beforeEach((done) => {
        rimraf(join(__dirname, './bin/*'), () => {
            done();
        });
    });

    it('should allow multiple entry files', (done) => {
        const { stderr, stdout, exitCode } = run(__dirname, ['./src/a.js', './src/b.js']);

        expect(exitCode).toBe(0);
        expect(stderr).toBeFalsy();
        expect(stdout).toBeTruthy();

        stat(resolve(__dirname, './bin/main.js'), (err, stats) => {
            expect(err).toBe(null);
            expect(stats.isFile()).toBe(true);
            done();
        });
        readFile(resolve(__dirname, './bin/main.js'), 'utf-8', (err, data) => {
            expect(err).toBe(null);
            expect(data).toContain('Hello from a.js');
            expect(data).toContain('Hello from b.js');
            done();
        });
    });

    it('should allow multiple entry flags', (done) => {
<<<<<<< HEAD
        const { stderr, stdout, exitCode } = run(__dirname, ['--entry', './src/a.js', '--entry', './src/b.js']);

        expect(exitCode).toBe(0);
=======
        const { stderr, stdout } = run(__dirname, ['--entry', './src/a.js', '--entry', './src/b.js']);
>>>>>>> tests: clear old output files before each test
        expect(stderr).toBeFalsy();
        expect(stdout).toBeTruthy();

        stat(resolve(__dirname, './bin/main.js'), (err, stats) => {
            expect(err).toBe(null);
            expect(stats.isFile()).toBe(true);
            done();
        });
        readFile(resolve(__dirname, './bin/main.js'), 'utf-8', (err, data) => {
            expect(err).toBe(null);
            expect(data).toContain('Hello from a.js');
            expect(data).toContain('Hello from b.js');
            done();
        });
    });
});
