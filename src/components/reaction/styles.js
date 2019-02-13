import { Dimensions, Platform, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window')

const metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === 'ios' ? 54 : 66,
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 30,
    backgroundColor: 'rgb(201, 207, 216)',
  },
  list: {
    overflow: 'visible',
  },
  reactView: {
    width: (metrics.screenWidth - 24) / 6,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reaction: {
    width: 40,
    height: 40,
    marginBottom: 4,
  },
})

export default styles
