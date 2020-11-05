'use strict';
const { run } = require('../utils/test-utils');
const { stat, readFile } = require('fs');
const { resolve } = require('path');
const { green } = require('colorette');

const successMessage = 'stats are successfully stored as json to stats.json';

describe('json flag', () => {
    it('should return valid json', () => {
        const { stdout, exitCode } = run(__dirname, ['--json']);

        expect(() => JSON.parse(stdout)).not.toThrow();
        expect(exitCode).toBe(0);

        expect(JSON.parse(stdout)['hash']).toBeDefined();
    });

    it('should store json to a file', (done) => {
        const { stdout, exitCode } = run(__dirname, ['--json', 'stats.json']);

        expect(stdout).toContain(`${green(successMessage)}`);
        expect(exitCode).toBe(0);

        stat(resolve(__dirname, './stats.json'), (err, stats) => {
            expect(err).toBe(null);
            expect(stats.isFile()).toBe(true);

            readFile(resolve(__dirname, 'stats.json'), 'utf-8', (err, data) => {
                expect(err).toBe(null);
                expect(JSON.parse(data)['hash']).toBeTruthy();
                expect(JSON.parse(data)['version']).toBeTruthy();
                expect(JSON.parse(data)['time']).toBeTruthy();
                expect(() => JSON.parse(data)).not.toThrow();
                done();
            });
        });
    });

    it('should store json to a file and respect --no-color', (done) => {
        const { stdout, exitCode } = run(__dirname, ['--json', 'stats.json', '--no-color']);

        expect(stdout).not.toContain(`${green(successMessage)}`);
        expect(stdout).toContain(successMessage);
        expect(exitCode).toBe(0);

        stat(resolve(__dirname, './stats.json'), (err, stats) => {
            expect(err).toBe(null);
            expect(stats.isFile()).toBe(true);

            readFile(resolve(__dirname, 'stats.json'), 'utf-8', (err, data) => {
                expect(err).toBe(null);
                expect(JSON.parse(data)['hash']).toBeTruthy();
                expect(JSON.parse(data)['version']).toBeTruthy();
                expect(JSON.parse(data)['time']).toBeTruthy();
                expect(() => JSON.parse(data)).not.toThrow();
                done();
            });
        });
    });

    it('should return valid json with -j alias', () => {
        const { stdout, exitCode } = run(__dirname, ['-j']);
        expect(() => JSON.parse(stdout)).not.toThrow();
        expect(exitCode).toBe(0);

        expect(JSON.parse(stdout)['hash']).toBeDefined();
    });
});
