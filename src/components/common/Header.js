import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import navigator from 'navigations/customNavigator'

export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigator.goBack()}
        >
          <Image
            source={require('assets/logout.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContents: 'flex-end',
    marginHorizontal: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
})
