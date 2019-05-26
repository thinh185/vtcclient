import React from 'react'
import { Text } from 'react-native'
import { LineChart } from 'react-native-svg-charts'
import { Defs, LinearGradient, Stop } from 'react-native-svg'
import * as d3 from 'd3-shape'

export default class LineChartCompoent extends React.PureComponent {
  render() {
    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

    const Gradient = () => (
      <Defs>
        <LinearGradient id="gradient" x1="0%" y="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="rgb(134, 65, 244)" stopOpacity={0.8} />
          <Stop offset="100%" stopColor="rgb(134, 65, 244)" stopOpacity={0.2} />
        </LinearGradient>
      </Defs>
    )

    return (
      <LineChart
        style={{ height: 200 }}
        data={data}
        svg={{ stroke: 'rgb(134, 65, 244)', fontSize: 10, color: 'red' }}
        contentInset={{ top: 20, bottom: 20 }}
        curve={d3.curveCatmullRom.alpha(0.5)}
        formatLabel={value => <Text style={{ fontSize: 16, color: 'red' }}>{value}</Text>}
      >
        <Gradient />
      </LineChart>
    )
  }
}
