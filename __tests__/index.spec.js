const { assert } = require('chai');
const { argv: { watch_mode: inWatchMode=false } } = require('yargs');
const s = require('./selectors');

describe('Integration Tests', function integrationTests() {
    before(async () => {
        const { browser, page } = await require("./getPuppeteerModules");

        global.browser = browser;
        global.page = page;

        await global.page.goto('http://127.0.0.1:3002', {
            waitUntil: ['load'],
            timeout: 0
        });
    });

    describe('Visiting each section and ensuring content exists', () => {
        it('begins at "About" and sees that content has rendered', async () => {
            const { page } = global;
            const content = await page.waitForSelector(
                s.page.content(),
                { visible: true }
            );
            assert.exists(content);
        });

        it('Clicks the "projects" button and ends ' +
        'up at the projects page', async () => {
            const { page } = global;
            const navButton = await page.waitForSelector(
                s.appBar.sectionButton('projects'),
                { visible: true }
            );

            await Promise.all([
                navButton.click(),
                page.waitForNavigation({ waitUntil: 'networkidle0' })
            ]);

            assert.match(page.url(), /.*\/+projects/g);
        });

        it('Sees that content on the projects page has rendered', async () => {
            const { page } = global;
            await page.waitForSelector(
                s.page.content(),
                { visible: true }
            );

            const content = page.$(s.page.content());
            assert.exists(content);
        });

        it('Clicks the "misc" button and ends up on the ' +
        'miscellaneous section', async () => {
            const { page } = global;
            const navButton = await page.waitForSelector(
                s.appBar.sectionButton('misc'),
                { visible: true }
            );

            await Promise.all([
                navButton.click(),
                page.waitForNavigation({ waitUntil: 'networkidle0' })
            ]);

            assert.match(page.url(), /.*\/+misc/g);
        });


        it('Sees that content on the misc page has rendered', async () => {
            const { page } = global;
            await page.waitForSelector(
                s.page.content(),
                { visible: true }
            );

            const content = page.$(s.page.content());
            assert.exists(content);
        });

        it('Clicks the CV button and ends ' +
        'up at the resume page', async () => {
            const { page } = global;
            const navButton = await page.waitForSelector(
                s.appBar.sectionButton('cv'),
                { visible: true }
            );

            await Promise.all([
                navButton.click(),
                page.waitForNavigation({ waitUntil: 'networkidle0' })
            ]);

            assert.match(page.url(), /.*\/+cv/g);
        });


        it('Sees that content on the cv page has rendered', async () => {
            const { page } = global;
            await page.waitForSelector(
                s.page.content(),
                { visible: true }
            );

            const content = page.$(s.page.content());
            assert.exists(content);
        });

        it('Clicks the Welcome button and ends ' +
        'up at the about page again', async () => {
            const { page } = global;
            const navButton = await page.waitForSelector(
                s.appBar.sectionButton('about'),
                { visible: true }
            );

            await Promise.all([
                navButton.click(),
                page.waitForNavigation({ waitUntil: 'networkidle0' })
            ]);

            assert.match(page.url(), /[0-9]+.*\//g);
        });

        it('Sees that content on the about page has rendered', async () => {
            const { page } = global;
            await page.waitForSelector(
                s.page.content(),
                { visible: true }
            );

            const content = page.$(s.page.content());
            assert.exists(content);
        });
    });

    after(async function afterAll() {
        if(!inWatchMode) {
            await global.page.close();
            await global.browser.close();
        }
    });
});
