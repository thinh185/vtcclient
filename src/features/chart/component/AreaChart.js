import React from 'react'
import { AreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

const random = (length) => {
  const res = []
  for (let i = 0; i < length; i++) res.push(Math.floor((Math.random() * 2 - 1) * 100))
  return res
}


class AreaChartComponent extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      data: [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80],
    }
  }

  componentDidMount = () => {
    setInterval(() => {
      this.setState({ data: random(this.props.points || 5) })
    }, 5000)
  }

  render() {
    const { data } = this.state

    return (
      <AreaChart
        style={{ height: 200 }}
        data={data}
        contentInset={{ top: 30, bottom: 30 }}
        curve={shape.curveNatural}
        svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
        animate
        animationDuration={2000}
      />
    )
  }
}

export default AreaChartComponent
