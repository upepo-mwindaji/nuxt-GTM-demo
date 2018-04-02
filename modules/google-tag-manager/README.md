# Google Tag Manager

> Add Google Tag Manager (GTM) to your nuxt.js application.
This plugins automatically sends first page and route change events to GTM.

**Note:** by default google tag manager is not enabled in dev mode.
You can set option `allowDev: true` for testing in dev mode.

## Setup
- Add `@nuxtjs/google-tag-manager` dependency using yarn or npm to your project
- Add `@nuxtjs/google-tag-manager` to `modules` section of `nuxt.config.js`
```js
  modules: [
   ['@nuxtjs/google-tag-manager', { id: 'GTM-XXXXXXX' }],
  ]
```

## Options

### `id`
- Required
Should be in form of `GTM-XXXXXXX`

### `allowDev`
- Optional
Use `true` to allow GTM tags to fire in development

### Other options
```js
{
  layer: 'dataLayer',
  env: {
    gtm_auth:        '...',
    gtm_preview:     '...',
    gtm_cookies_win: '...'
  },
  scriptURL: '//example.com'
}
```

## Event Handling
- use `$gtmPush(object)` to push custom events / variables object to the data layer

example:

```js
<template>
  <div class="grid">
    <div
    v-for="item in items"
    :key="item.id"
    v-on:click="$gtmPush({'event':'item click', 'item name': item.name})">
      <img src='item.image'>
    </div>
  </div>
</template>
```

- use `$gtmStandardEvent(interaction, category, action, label, value)` to push standardized events object to the data layer

  The method accepts a list of arguments in order:  
  `interaction`: (required boolean) true if this is an interaction, false otherwise  
  `category`: (required string or null) event category  
  `action`: (required string or null) event action  
  `label`: (optional string or null) event label  
  `value`: (optional number or null) event value  

example:  

  ```js
  <template>
    <div class="grid">
      <div
      v-for="item in items"
      :key="item.id"
      v-on:click="$gtmStandardEvent(true, 'Items', 'Click', item.name, null )">
        <img src='item.image'>
      </div>
    </div>
  </template>
  ```  

  The method can also accept an object  

  example:  

```js
<template>
  <div class="grid">
    <div
    v-for="item in items"
    :key="item.id"
    v-on:click="handleClick(item.name)">
      <img src='item.image'>
    </div>
  </div>
</template>

<script>
export default {
  props: ['items'],
  methods: {
    handleClick: function (item) {
      this.$gtmStandardEvent({
        interaction: true
        category: 'Cards'
        action: 'Click'
        label: item
      })
    }
  }
}
</script>
```
