//eslint-disable-next-line node/no-extraneous-require
const { beforeEach } = require('@jest/globals');
//eslint-disable-next-line node/no-unpublished-require
const rimraf = require('rimraf');
const { join } = require('path');

const directories = ['entry/defaults-index', 'entry/flag-entry', 'entry/multiple-entries', 'hot', 'mode/mode-with-config', 'no-hot'];

jest.setTimeout(300000);

beforeEach(async (done) => {
    for (const directory of directories) {
        await rimraf(join(__dirname, `./test/${directory}/bin/*`), () => {
            done();
        });
        await rimraf(join(__dirname, `./test/${directory}/binary/*`), () => {
            done();
        });
        await rimraf(join(__dirname, `./test/${directory}/dist/*`), () => {
            done();
        });
    }
});
