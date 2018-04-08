const path = require('path')

module.exports = function nuxtTagManager(_options) {
  const options = _options || {}
  let currentOptions = {
    id: options.id || null,
    layer: options.layer || 'dataLayer',
    env: {
      gtm_auth: options.env && options.env.gtm_auth || null,
      gtm_preview: options.env && options.env.gtm_preview || null,
      gtm_cookies_win: options.env && options.env.gtm_cookies_win || 'x'
    },
    allowDev : false || options.allowDev
  }

  // Don't include when no GTM id is given OR on dev mode
  if(!currentOptions.id || (this.options.dev && !currentOptions.allowDev && process.env.NODE_ENV !== 'production')) {
    return
  }

  // Build the <script> URL
  let queryParams    = currentOptions.env.gtm_auth && currentOptions.env.gtm_preview ? currentOptions.env : {}
      queryParams.id = currentOptions.id
  if (currentOptions.layer)
      queryParams.l  = currentOptions.layer

  let queryString = Object.keys(queryParams).map(function (key) {
    let val = queryParams[key]
    return (val !== null && val !== undefined) ? key + '=' + val : ''
  }).filter(e => e).join('&')

  // Add google tag manager script to head
  this.options.head.script.push({
    src: (currentOptions.scriptURL || 'https://www.googletagmanager.com/gtm.js') + '?' + queryString,
    async: true
  })

  // Store options attributes in meta field to use for dataLayer push
  // this.options.head.meta.push({
  //   hid: 'GTM-dataLayer', name: 'GTM-dataLayer', content: currentOptions.layer
  //   hid: 'GTM-container', name: 'GTM-container', content: currentOptions.id
  // })

  // push dataLayer event on head change
  this.options.head.changed = function(newInfo) {
    let dataLayer = newInfo.meta.find((meta)=>{ return meta.name === 'GTM-dataLayer'}).content
    let container = newInfo.meta.find((meta)=>{ return meta.name === 'GTM-container'}).content
    // to debounce the event which can be fired multiple times per page mount
    if (window.google_tag_manager) {
      let isRouteOpen =  (window.google_tag_manager[container].dataLayer.get('nuxtHeadChange') === 'open')
      if (isRouteOpen) {
        window[dataLayer].push({
          'event': 'nuxtHeadChange',
          'pageTitle': newInfo.title,
          'nuxtHeadChange': 'closed'
        })
      }
    }
    console.warn('failed to load google tag manager')
  }

  // Register plugin
  this.addPlugin({src: path.resolve(__dirname, 'plugin.js'), ssr: false, options: currentOptions})
}

// module.exports.meta = require('./package.json')
