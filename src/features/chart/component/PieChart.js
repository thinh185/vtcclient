import React from 'react'
import { PieChart } from 'react-native-svg-charts'

const random = (length) => {
  const res = []
  for (let i = 0; i < length; i++) res.push(Math.floor((Math.random() * 2 - 1) * 100))
  return res
}

export default class PieChartComponent extends React.PureComponent {
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

    // eslint-disable-next-line no-bitwise
    const randomColor = () => (`#${(Math.random() * 0xFFFFFF << 0).toString(16)}000000`).slice(0, 7)

    const pieData = data
      .filter(value => value > 0)
      .map((value, index) => ({
        value,
        svg: {
          fill: randomColor(),
          onPress: () => console.log('press', index),
        },
        key: `pie-${index}`,
      }))

    return (
      <PieChart
        style={{ height: 200 }}
        data={pieData}
        animate
        animationDuration={2000}
      />
    )
  }
}
