<template>
  <chart :options="bars"></chart>
</template>

<script>
import chart from '~/node_modules/vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import Data from './echartData'

const endpoints = {
  localhost: 'https://nuxt-gtm-demo-superproxy.appspot.com/query?id=ahpwfm51eHQtZ3RtLWRlbW8tc3VwZXJwcm94eXIVCxIIQXBpUXVlcnkYgICAgLyhggoM',
  ghpages: 'https://nuxt-gtm-demo-superproxy.appspot.com/query?id=ahpwfm51eHQtZ3RtLWRlbW8tc3VwZXJwcm94eXIVCxIIQXBpUXVlcnkYgICAgICAgAoM'
}

export default {
  components: { chart },
  data () {
    return {
      bars: new Data(30)
    }
  },
  mounted () {
    let url
    if (window.location.href.indexOf('localhost') >=0) {
      url = endpoints.localhost
    } else {
      url = endpoints.ghpages
    }
    let runner =  () => {
      let data = this.$axios.$get(url)
      .then((response) => {
        if (response.totalResults > 0) {
          let rtData = response.rows.map(function(row){
            let obj = {}
            response.columnHeaders.forEach(function(columnHeader,index){
              obj[columnHeader.name] = row[index]
            })
            return obj
          })
          this.bars.updateData(rtData)
        }
      })
      setTimeout(function() {
        runner();
      }, 30000);
    }
    runner();
  }

}
</script>

<style>
.echarts {
  width: 100% !important;
  height: 100% !important;
}
</style>
