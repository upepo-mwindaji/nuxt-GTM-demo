<template>
  <div>
    <section class="header">
      <nuxt-link to="/" class="button--grey">Home</nuxt-link>
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

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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

button {
  font-size: 42px;
  cursor:pointer;
}


</style>
