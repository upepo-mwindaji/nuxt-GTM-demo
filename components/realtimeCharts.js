const formatResponse = (rawData) => {
  if (rawData.totalResults > 0) {
    return rawData.rows.map(function(row){
      let obj = {}
      rawData.columnHeaders.forEach(function(columnHeader,index){
        obj[columnHeader.name] = row[index]
      })
      return obj
    })
  } else {
    return []
  }
}

const formatData = function(data, dimension, metric) {
  let groupedByAction = _.groupBy(data, (obj) => {return obj[dimension]})
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
        serie.data.push(obj[metric])
      } else {
        serie.data.push(0)
      }
    }
    series.push(serie)
  })
  return series
}

const types = {
  events: {
    yaxis: 'Events',
    dimension: 'rt:eventAction',
    metric: 'rt:totalEvents'
  },
  pages: {
    yaxis: 'Pageviews',
    dimension: 'rt:pageTitle',
    metric: 'rt:pageviews'
  }
}

export default class Data {

  constructor (type) {
    this.N = 30
    this.type = type

    this.animation = false

    this.tooltip = {
      trigger: 'axis',
      axisPointer : { type : 'shadow' }
    }

    this.xAxis = [
      {
        type : 'category',
        name : 'Minutes Ago',
        nameLocation: 'center',
        nameGap: 30,
        data : Array(this.N).fill().map((e,i)=> -i)
      }
    ]

    this.yAxis = [
      {
        type : 'value',
        name : types[this.type]['yaxis']
      }
    ]

    this.series = []

  }

  updateChart (d) {
    console.log('updating ', types[this.type]['yaxis'])
    this.series = formatData(formatResponse(d), types[this.type]['dimension'], types[this.type]['metric'])
  }

  updateEventsData (d) {
    console.log('updating events')
    this.series = formatData(formatResponse(d), 'rt:eventAction', 'rt:totalEvents')
  }

  updatePagesData (d) {
    console.log('updating ages')
    this.series = formatData(formatResponse(d), 'rt:pageTitle', 'rt:pageviews')
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
