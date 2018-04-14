<template>
  <div>
    <section class="header">
      <nuxt-link to="/" class="button--home">Home</nuxt-link>
    </section>
    <section class="container">
      <div>
        <h2 class="subtitle">
          Update Variables On Mount
        </h2>
        <div>
          <compo></compo>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import compo from './component.vue'
export default {
  components : { compo },
  data() {
    return {
      title: 'Mount Demo'
    }
  },
  head() {
    return {
      title: `Nuxt GTM Demo | ${this.title}`
    }
  }
}
</script>
