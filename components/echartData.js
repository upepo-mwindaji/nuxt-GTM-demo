
export default class Data {

  constructor (N) {
    this.N = N

    this.animation = false

    this.tooltip = {
      trigger: 'axis',
      axisPointer : { type : 'shadow' }
    }

    this.xAxis = [
      {
        type : 'category',
        data : Array(N).fill().map((e,i)=> -i-1)
      }
    ]

    this.yAxis = [
      {
        type : 'value'
      }
    ]

    this.series = []

  }

  pushData (d) {
    let series = this.series
    let N = this.N
    d.forEach(function(newData) {
      let checkFound = false
      let serie = series.find(function(serie) {
        return (serie.name === newData.name)
      })
      if (serie) {
        serie.data.pop()
        serie.data.unshift(newData.value)
      } else {
        let seriedata = new Array(N).fill(0)
        seriedata[0] = newData.value
        series.push({
          name: newData.name,
          type: 'bar',
          stack: 'mainStack',
          data: seriedata
        })
      }
    })
  }

}
