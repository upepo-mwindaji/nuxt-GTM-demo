<template>
  <chart :options="options"></chart>
</template>

<script>
import chart from '~/node_modules/vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'


export default {
  components: { chart },
  props: ['options'],
  data() {
    return {
      title: 'Real-time Charts'
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
.echarts {
  width: 100% !important;
  height: 100% !important;
}
</style>
