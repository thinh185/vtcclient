import { TouchableOpacity, StyleSheet } from 'react-native'
import IIcon from 'react-native-vector-icons/Ionicons'
import React from 'react'
import theme from 'config/theme'

export default ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.iconContainer} onPress={() => onPress()}>
      <IIcon name="ios-expand" size={28} color={theme.black} style={{ backgroundColor: 'transparent' }} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: 130,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.bgIconColor,
    zIndex: 10,
  },
})
