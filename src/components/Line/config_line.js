export function buildLineConfig (xAxis, dataConfirm, dataSuspect, dataDead) {
  return {
    title: {
      text: '疫情累计趋势(人)'
    },
    legend: {
      data: ['累计确诊', '累计疑似', '累计死亡'],
      top: '25',
      left: '0'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: xAxis
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    tooltip : {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    series: [
      {
        name: '累计确诊',
        type: 'line',
        smooth: true,
        data: dataConfirm
      },
      {
        name: '累计疑似',
        type: 'line',
        smooth: true,
        data: dataSuspect
      },
      {
        name: '累计死亡',
        type: 'line',
        smooth: true,
        data: dataDead
      }
    ]
  }
}

export function buildHealConfig (xAxis, dataHeal, dataDead) {
  return {
    title: {
      text: '疫情死亡和治愈趋势(人)'
    },
    legend: {
      data: ['累计治愈', '累计死亡'],
      top: '25',
      left: '0'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: xAxis
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    tooltip : {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    series: [
      {
        name: '累计治愈',
        type: 'line',
        smooth: true,
        data: dataHeal
      },

      {
        name: '累计死亡',
        type: 'line',
        smooth: true,
        data: dataDead
      }
    ]
  }
}

export function buildLineAdd (xAxis, dataConfirm, dataSuspect, dataDead) {
  return {
    title: {
      text: '全国疫情每日增加（人）'
    },
    legend: {
      data: ['每日确诊', '每日疑似', '每日死亡'],
      top: '25',
      left: '0'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: xAxis
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    tooltip : {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    series: [
      {
        name: '每日确诊',
        type: 'line',
        smooth: true,
        data: dataConfirm
      },
      {
        name: '每日疑似',
        type: 'line',
        smooth: true,
        data: dataSuspect
      },
      {
        name: '每日死亡',
        type: 'line',
        smooth: true,
        data: dataDead
      }
    ]
  }
}
export function buildLineAHubei (xAxis, hubei, notHubei) {
  return {
    title: {
      text: '湖北、非湖北累计确诊增量'
    },
    legend: {
      data: ['湖北', '非湖北'],
      top: '25',
      left: '0'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: xAxis
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    tooltip : {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    series: [
      {
        name: '湖北',
        type: 'line',
        smooth: true,
        data: hubei
      },
      {
        name: '非湖北',
        type: 'line',
        smooth: true,
        data: notHubei
      }
    ]
  }
}

export function buildAddHubei (xAxis, hubei, notHubei) {
  return {
    title: {
      text: '湖北、非湖北每日确诊增量'
    },
    legend: {
      data: ['湖北', '非湖北'],
      top: '25',
      left: '0'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: xAxis
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    tooltip : {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    series: [
      {
        name: '湖北',
        type: 'line',
        smooth: true,
        data: hubei
      },
      {
        name: '非湖北',
        type: 'line',
        smooth: true,
        data: notHubei
      }
    ]
  }
}

export function buildLineProvince (xAxis, dataConfirm, dataHeal, dataDead) {
  return {
    title: {
      text: '疫情新增趋势(人)'
    },
    legend: {
      data: ['新增确诊', '新增治愈', '新增死亡'],
      top: '25',
      left: '0'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: xAxis
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    tooltip : {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    series: [
      {
        name: '新增确诊',
        type: 'line',
        smooth: true,
        data: dataConfirm
      },
      {
        name: '新增疑似',
        type: 'line',
        smooth: true,
        data: dataHeal
      },
      {
        name: '新增死亡',
        type: 'line',
        smooth: true,
        data: dataDead
      }
    ]
  }
}