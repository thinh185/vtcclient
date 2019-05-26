import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { StartColumnContainer, RowContainer } from 'features/share/component/SComponent'
import { ScrollView } from 'react-native-gesture-handler'
import AreaChart from 'features/chart/component/AreaChart'
import BarChart from 'features/chart/component/BarChart'
import LineChart from 'features/chart/component/LineChart'
import PieChart from 'features/chart/component/PieChart'
import StackAreaChart from 'features/chart/component/StackedAreaChart'
import StackBarChart from 'features/chart/component/StackedBarChart'
import XAxis from 'features/chart/component/XAxis'
import YAxis from 'features/chart/component/YAxis'
import PartialAreaChart from 'features/chart/component/PartialAreaChart'
import PieChartCenterLabel from 'features/chart/component/PieChartCenterLabel'
import PieChartArcs from 'features/chart/component/PieChartArcs'
import GradientLine from 'features/chart/component/GradientLine'
import PieLabelCircle from 'features/chart/component/PieLabelCircle'

class AreaChartExample extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      points: 30,
    }
  }

  render() {
    return (
      <StartColumnContainer>
        <ScrollView>
          <Text>Points {this.state.points}</Text>
          <RowContainer justifyContent="space-between" alignItems="center">
            <TouchableOpacity onPress={() => this.setState({ points: 30 })}>
              <Text style={styles.button}>30</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ points: 40 })}>
              <Text style={styles.button}>40</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ points: 50 })}>
              <Text style={styles.button}>50</Text>
            </TouchableOpacity>
          </RowContainer>
          <PieLabelCircle />
          <PieChartArcs />
          <PieChartCenterLabel />
          <GradientLine />
          <LineChart />
          <AreaChart point={this.state.points} />
          <BarChart />
          <PieChart point={this.state.points} />
          <StackAreaChart />
          <StackBarChart />
          <XAxis />
          <YAxis />
          <PartialAreaChart />
        </ScrollView>

      </StartColumnContainer>

    )
  }
}

export default AreaChartExample

const styles = StyleSheet.create({
  heightArea: { height: 200 },
  contentInset: { top: 30, bottom: 30 },
  button: { paddingVertical: 10, paddingHorizontal: 10, borderWidth: 1, borderRadius: 10 },
  stackArea: { height: 200, paddingVertical: 16 },
})
