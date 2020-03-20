export function buildLineConfig (xAxis, dataConfirm, dataDead, dataHeal) {
  return {
    title: {
      text: '全国累计趋势(人)'
    },
    legend: {
      data: ['累计确诊', '累计治愈', '累计死亡'],
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

export function buildTodayConfig (xAxis, dataConfirm, dataSuspect) {
  return {
    title: {
      text: '现有确诊和疑似趋势(人)'
    },
    legend: {
      data: ['现有确诊', '现有疑似'],
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
        name: '现有确诊',
        type: 'line',
        smooth: true,
        data: dataConfirm
      },

      {
        name: '现有疑似',
        type: 'line',
        smooth: true,
        data: dataSuspect
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

export function buildLineAdd (xAxis, dataConfirm, dataSuspect, dataDead, dataHeal) {
  return {
    title: {
      text: '全国疫情每日变化（人）'
    },
    legend: {
      data: ['确诊', '疑似', '治愈', '死亡'],
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
        name: '确诊',
        type: 'line',
        smooth: true,
        data: dataConfirm
      },
      {
        name: '疑似',
        type: 'line',
        smooth: true,
        data: dataSuspect
      },
      {
        name: '治愈',
        type: 'line',
        smooth: true,
        data: dataHeal
      },
      {
        name: '死亡',
        type: 'line',
        smooth: true,
        data: dataDead
      }

    ]
  }
}
export function buildLineAHubei (xAxis, all, hubei, notHubei) {
  return {
    title: {
      text: '全国/湖北/湖北累计确诊增量'
    },
    legend: {
      data: ['全国', '湖北', '非湖北'],
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
        name: '全国',
        type: 'line',
        smooth: true,
        data: all
      },
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

export function buildAddHubei (xAxis, all, hubei, notHubei) {
  return {
    title: {
      text: '全国/湖北/非湖北每日确诊增量'
    },
    legend: {
      data: ['全国', '湖北', '非湖北'],
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
        name: '全国',
        type: 'line',
        smooth: true,
        data: all
      },
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

export function buildDeadHubei (xAxis, all, hubei, notHubei) {
  return {
    title: {
      text: '全国/湖北/非湖北死亡病例'
    },
    legend: {
      data: ['全国', '湖北', '非湖北'],
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
        name: '全国',
        type: 'line',
        smooth: true,
        data: all
      },
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

export function buildHealHubei (xAxis, all, hubei, notHubei) {
  return {
    title: {
      text: '全国/湖北/非湖北治愈病例'
    },
    legend: {
      data: ['全国', '湖北', '非湖北'],
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
        name: '全国',
        type: 'line',
        smooth: true,
        data: all
      },
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
      data: ['确诊', '治愈', '死亡'],
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
        name: '确诊',
        type: 'line',
        smooth: true,
        data: dataConfirm
      },
      {
        name: '疑似',
        type: 'line',
        smooth: true,
        data: dataHeal
      },
      {
        name: '死亡',
        type: 'line',
        smooth: true,
        data: dataDead
      }
    ]
  }
}