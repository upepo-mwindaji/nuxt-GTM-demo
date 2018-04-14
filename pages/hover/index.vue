<template>
  <div>
    <section class="header">
      <nuxt-link to="/" class="button--home">Home</nuxt-link>
    </section>
    <section class="container">
      <div>
        <h2 class="subtitle">
          Fire Hover Events
        </h2>
        <div >
          <button class="button--grey" @mouseenter="gtmStandardEvent(true, 'Buttons', 'Hover', title, 0)">Hover</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  data() {
    return {
      title: 'Hover Demo'
    }
  },
  head() {
    return {
      title: `Nuxt GTM | ${this.title}`
    }
  }
}
</script>
