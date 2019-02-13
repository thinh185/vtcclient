import { TouchableOpacity, StyleSheet } from 'react-native'
import IIcon from 'react-native-vector-icons/Ionicons'
import React from 'react'
import theme from 'config/theme'

export default ({ pressSwitchCamera }) => {
  return (
    <TouchableOpacity style={styles.iconContainer} onPress={() => pressSwitchCamera()}>
      <IIcon name="ios-reverse-camera" size={40} color={theme.white} style={{ backgroundColor: 'transparent' }} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.bgIconColor,
    zIndex: 10,
  },
})
