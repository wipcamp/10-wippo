import React from 'react'
import * as Chart from 'react-chartjs'

const data = {
  datasets: [{
    data: [100, 20, 30]
  }],

  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: [
    'Red',
    'Yellow',
    'Blue',

    'Red',
    'Yellow',
    'Blue'
  ]
}

export default () => (
  <div>
    <Chart.Doughnut data={data} width='600' height='500' />
  </div>
)
