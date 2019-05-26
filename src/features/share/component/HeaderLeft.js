import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default class HeaderLeft extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.goBack()}>
        <Icon name="ios-arrow-back" size={20} style={{ color: 'blue' }} />
        <Text style={styles.text}> Back </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    marginLeft: 8,
    fontSize: 14,
    color: 'blue',
    textDecorationLine: 'underline',
  },
})
