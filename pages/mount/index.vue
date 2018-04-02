<template>
  <div>
    <section class="header">
      <nuxt-link to="/" class="button--purple">Home</nuxt-link>
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
