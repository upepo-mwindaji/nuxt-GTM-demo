<template>
  <div>
    <section class="header">
      <nuxt-link to="/" class="button--home">Home</nuxt-link>
    </section>
    <section class="container">
      <div>
        <h2 class="subtitle">
          Fire Click Events
        </h2>
        <div>
          <button class="button--green" @click="gtmStandardEvent(true, 'Buttons', 'Click', title, 0)">Click</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  data() {
    return {
      title: 'Click Demo'
    }
  },
  head() {
    return {
      title: `Nuxt GTM | ${this.title}`
    }
  }
}
</script>
