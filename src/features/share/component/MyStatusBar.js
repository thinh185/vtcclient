import React from 'react'
import { StatusBar, StyleSheet, View, Platform } from 'react-native'

export const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View
    style={[
      styles.statusBar,
      {
        backgroundColor,
      },
    ]}
  >
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
})
