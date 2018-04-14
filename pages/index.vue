<template>
  <section class="container">
    <div>
      <div class="links">
        <nuxt-link to="click"
          class="button--green">Click Event</nuxt-link>
        <nuxt-link to="mount"
          class="button--grey">Mount Event</nuxt-link>
        <nuxt-link to="hover"
          class="button--purple">Hover Event</nuxt-link>
      </div>
      <div class="links">
        <h1 class="title">
          nuxt-gtm-demo
        </h1>
        <h2 class="subtitle">
          Demo using GTM module with Nuxt
        </h2>
        <a :href="previewUrl" target="_blank" class="button--blue" >Activate Debug</a>

      </div>
    </div>
  </section>
</template>

<script>
const previewUrlBase = 'https://www.googletagmanager.com/start_preview/gtm?uiv2&id=GTM-TWMCBFD&gtm_auth=a-0uanYFkML7e3v7Vmxpwg&gtm_preview=env-8&gtm_debug=x&url='

export default {
  data() {
    return {
      title: 'Homepage',
      previewUrl: ''
    }
  },
  head() {
    return {
      title: `Nuxt GTM Demo | ${this.title}`
    }
  },
  mounted () {
    this.previewUrl = (previewUrlBase + window.location.href )
  }

}
</script>
