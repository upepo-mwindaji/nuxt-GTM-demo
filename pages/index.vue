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

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
