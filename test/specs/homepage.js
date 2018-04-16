const { expect } = require('chai');
const { test } = require('../setup/browser');

describe('sample homepage test', () => {
  let page

  before (test(async (browser, opts) => {
    page = await browser.newPage();
    await page.goto(`${opts.testUrl}/`);
  }));

  after (async function () {
    await page.close();
  });

  it('should have the correct page title', async function () {
    expect(await page.title()).to.eql('Nuxt GTM Demo | Homepage');
  });

  it('should have a heading', async function () {
    let heading;
    await page.waitFor('h1');
    heading = await page.$eval('h1', heading => heading.innerText);
    expect(heading).to.eql('nuxt-gtm-demo');
  });

});
