import React from 'react'
import { PieChart } from 'react-native-svg-charts'

class PieChartWithDifferentArcs extends React.PureComponent {
  render() {
    const data = [
      {
        key: 1,
        value: 50,
        svg: { fill: '#600080' },
        arc: { outerRadius: '130%', cornerRadius: 10 },
      },
      {
        key: 2,
        value: 50,
        svg: { fill: '#9900cc' },
        arc: { outerRadius: '80%', cornerRadius: 10 },

      },
      {
        key: 3,
        value: 40,
        svg: { fill: '#c61aff' },
        arc: { outerRadius: '90%', cornerRadius: 10 },

      },
      {
        key: 4,
        value: 95,
        svg: { fill: 'red' },
      },
      {
        key: 5,
        value: 35,
        svg: { fill: '#ecb3ff' },
        arc: { outerRadius: '150%', cornerRadius: 10 },
      },
    ]


    return (
      <PieChart
        style={{ height: 200 }}
        outerRadius="70%"
        innerRadius={10}
        data={data}
      />
    )
  }
}

export default PieChartWithDifferentArcs
