import _ from 'lodash'

const formatData = function(data) {
  let groupedByAction = _.groupBy(data, (obj) => {return obj['rt:eventAction']})
  let series = []
  _.forOwn(groupedByAction, function(arr, action) {
    let serie = {
      name: action,
      type: 'bar',
      stack: 'mainStack',
      data: []
    }
    for (var i=0; i<30; i++) {
      let minAgo = (i < 10 ? "0" : "") + i
      let obj = _.find(arr,function(obj){
        return obj['rt:minutesAgo'] === minAgo
      })
      if (obj) {
        serie.data.push(obj['rt:totalEvents'])
      } else {
        serie.data.push(0)
      }
    }
    series.push(serie)
  })
  return series
}

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
        data : Array(N).fill().map((e,i)=> -i)
      }
    ]

    this.yAxis = [
      {
        type : 'value'
      }
    ]

    this.series = []

  }

  updateData (d) {
    console.log('updating')
    this.series = formatData(d)
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
