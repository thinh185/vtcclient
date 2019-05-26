import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import theme from 'config/theme'

export default ({ text, handleClick, style = null, textStyle = null }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={() => handleClick()}>
      <Text style={[styles.text, textStyle]}> {text} </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 41,
    width: '100%',
    borderRadius: 3,
    backgroundColor: theme.mainButtonBC,
    marginVertical: 30,
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    color: 'white',
    textAlign: 'center',
    fontFamily: theme.fontFamily,
  },
})
