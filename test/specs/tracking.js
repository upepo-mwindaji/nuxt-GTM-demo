const { expect } = require('chai');
const { _ } = require('lodash')
const { test } = require('../setup/browser');
const querystring = require('querystring')
const gaParams = require('../setup/gaParams')


describe('sample tracking test', () => {
  let page, baseUrl
  let queue = []

  before (test(async (browser, opts) => {
    page = await browser.newPage()
    baseUrl = opts.testUrl
    await page.setRequestInterception(true);
    page.on('request', interceptedRequest => {
      if (interceptedRequest.url().includes('google-analytics.com/collect')){
        queue.push( querystring.parse( interceptedRequest.url() ) )
        interceptedRequest.abort()
      } else {
        interceptedRequest.continue()
      }
    });
  }));

  after (async function () {
    await page.close()
  });

  it('should send a pageview with a title', async function () {
    await page.goto(`${baseUrl}/`)
    let title = await page.title()
    expect(title).to.not.have.lengthOf(0)
    await page.waitFor(2000)
    expect(_.some(queue, { 't': 'pageview', 'dt': title })).to.be.true
  });

  it('should send a click event', async function () {
    await page.goto(`${baseUrl}/click`)
    await page.waitForSelector('.container button')
    await page.click('.container button')
    await page.waitFor(1000)
    expect(_.some(queue,
      { t: 'event',
        ec: 'Buttons',
        ea: 'Click',
        el: 'Click Demo'
      })).to.be.true
  });

  it('should send a mounted event', async function () {
    await page.goto(`${baseUrl}/mount`)
    await page.waitFor(1000)
    expect(_.some(queue,
      { t: 'event',
        ec: 'Mounts',
        ea: 'mounted',
        el: 'mounted demo component'
      })).to.be.true
  });

  it('should send a hover event', async function () {
    await page.goto(`${baseUrl}/hover`)
    await page.waitForSelector('.container button')
    await page.hover('.container button')
    await page.waitFor(1000)
    expect(_.some(queue,
      { t: 'event',
        ec: 'Buttons',
        ea: 'Hover',
        el: 'Hover Demo'
      })).to.be.true
  });

});
