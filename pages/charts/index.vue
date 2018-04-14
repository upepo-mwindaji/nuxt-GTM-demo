<template>
  <div>
    <section class="header">
      <nuxt-link to="/" class="button--home">Home</nuxt-link>
    </section>
    <section class="container outerchart">
      <div class="chartcontainer">
        <rtchart :options="events"></rtchart>
      </div>
    <!-- </section> -->
    <!-- <section class="container"> -->
      <div class="chartcontainer">
        <rtchart :options="pages"></rtchart>
      </div>
    </section>
  </div>
</template>

<script>
import rtchart from '~/components/chart'
import Data from '~/components/realtimeCharts'

const endpoints = {
  events: {
    localhost: 'https://nuxt-gtm-demo-superproxy.appspot.com/query?id=ahpwfm51eHQtZ3RtLWRlbW8tc3VwZXJwcm94eXIVCxIIQXBpUXVlcnkYgICAgLyhggoM',
    ghpages: 'https://nuxt-gtm-demo-superproxy.appspot.com/query?id=ahpwfm51eHQtZ3RtLWRlbW8tc3VwZXJwcm94eXIVCxIIQXBpUXVlcnkYgICAgICAgAoM'
  },
  pages: {
    localhost: 'https://nuxt-gtm-demo-superproxy.appspot.com/query?id=ahpwfm51eHQtZ3RtLWRlbW8tc3VwZXJwcm94eXIVCxIIQXBpUXVlcnkYgICAgJnShQoM',
    ghpages: 	'https://nuxt-gtm-demo-superproxy.appspot.com/query?id=ahpwfm51eHQtZ3RtLWRlbW8tc3VwZXJwcm94eXIVCxIIQXBpUXVlcnkYgICAgN6QgQoM'
  }
}

export default {
  components: { rtchart },
  data () {
    return {
      events: new Data('events'),
      pages: new Data('pages')
    }
  },
  mounted () {
    let eventsUrl, pagesUrl
    if (window.location.href.indexOf('localhost') >=0) {
      eventsUrl = endpoints.events.localhost
      pagesUrl = endpoints.pages.localhost
    } else {
      eventsUrl = endpoints.events.ghpages
      pagesUrl = endpoints.pages.ghpages
    }
    let runner = async () => {
      let rawEvents = await this.$axios.$get(eventsUrl)
      this.events.updateChart(rawEvents)
      let rawPages = await this.$axios.$get(pagesUrl)
      this.pages.updateChart(rawPages)
      setTimeout(function() {
        runner();
      }, 30000);
    }
    runner();
  }
}
</script>

<style>
.chartcontainer {
  height: 40vh;
  width: 100vw;
}

.outerchart {
  flex-direction: column;
}

</style>
