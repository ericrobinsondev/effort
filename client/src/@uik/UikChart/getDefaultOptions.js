/**
 * These are options for chart.js
 */

export default valueFormatter => ({
  animation: false,
  hover: {
    mode: 'label',
  },
  responsive: true,
  maintainAspectRatio: false,
  tooltips: {
    enabled: false,
    mode: 'index',
    intersect: false,
    position: 'nearest',
    callbacks: {
      labelColor: (tooltipItem, chartInstance) => {
        const meta = chartInstance.getDatasetMeta(tooltipItem.datasetIndex)
        const activeElement = meta.data[tooltipItem.index]
        const view = activeElement._view // eslint-disable-line
        return {
          borderColor: 'transparent',
          backgroundColor: view.backgroundColor,
        }
      },
    },
  },
  legend: {
    display: false,
  },
  scales: {
    yAxes: [{
      stacked: false,
      gridLines: {
        zeroLineWidth: 1,
        zeroLineColor: '#EAEDF3',
        color: '#EAEDF3',
      },
      ticks: {
        beginAtZero: true,
        callback: valueFormatter,
        maxTicksLimit: 5,
        fontColor: '#9EA0A5',
      },
    }],
    xAxes: [{
      stacked: false,
      gridLines: {
        color: 'transparent',
        zeroLineWidth: 2,
        drawBorder: false,
      },
      ticks: {
        fontColor: '#9EA0A5',
      },
      barPercentage: 0.7,
      maxBarThickness: 12,
    }],
  },
})
