const { assert } = require('chai');
const { argv: { watch_mode: inWatchMode=false } } = require('yargs');

describe('Integration Tests', function integrationTests() {
    before(async () => {
        const { browser, page } = await require("./getPuppeteerModules");

        global.browser = browser;
        global.page = page;

        await global.page.goto('http://127.0.0.1:3002', {
            waitUntil: ['networkidle2']
        });
    });

    it('does things', async () => {
        assert.equal(true, true);
    });

    after(async function afterAll() {
        if(!inWatchMode) {
            await global.page.close();
            await global.browser.close();
        }
    });
});
