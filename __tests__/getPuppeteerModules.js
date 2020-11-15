// inject any .env variables for overrideable local configs
const puppeteer = require('puppeteer');
const { argv: { watch_mode: inWatchMode=false } } = require('yargs');
let page;
let browser;

/**
 * returns instantiation of puppeteer page and browser
 * if necessary, then return those when
 * ready
 *
 * @returns async {{ page, browser }}
 */
module.exports = (async function getPuppeteerModules() {
    if(browser === undefined) {
        browser = await puppeteer.launch({
            slowMo: inWatchMode ? 10 : 0,
            headless: !inWatchMode,
            defaultViewport: null,
            args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox']
        });
    }

    if(page === undefined) {
        page = await browser.newPage();
    }

    return { page, browser };
}());
