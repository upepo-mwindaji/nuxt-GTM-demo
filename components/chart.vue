<template>
  <div class="chart">
    <chart :options="bars"></chart>
  </div>
</template>

<script>
import chart from '~/node_modules/vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import Data from './echartData'

export default {
  components: { chart },
  data () {
    return {
      bars: new Data(20)
    }
  },
  mounted () {

    let runner =  () => {
      this.bars.pushData([
        { name: 'hover', value: Math.floor(Math.random()*100) },
        { name: 'click', value: Math.floor(Math.random()*100) },
        { name: 'newevent', value: Math.floor(Math.random()*100) }
      ])
      setTimeout(function() {
        runner();
      }, 2000);
    }
    runner();

  }

}

</script>
<style>
.chart {
  width: 100%;
  height: 100%;
  position: relative;
}
.echarts {
  width: 100% !important;
  height: 100% !important;
}
</style>
