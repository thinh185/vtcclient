import React from 'react'
import { View, Button, StatusBar } from 'react-native'
import Utils from '../Utils'

export default class HomeScreen extends React.Component {
  render() {
    console.log('====================================')
    console.log('why not')
    console.log('====================================')
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Button
          style={styles.button}
          title="user1"
          onPress={() => {
            Utils.setUserId('user1')
            this.props.navigation.navigate('List')
          }}
        />
        <Button
          style={styles.button}
          title="user2"
          onPress={() => {
            Utils.setUserId('user2')
            this.props.navigation.navigate('List')
          }}
        />
        <Button
          style={styles.button}
          title="user3"
          onPress={() => {
            Utils.setUserId('user3')
            this.props.navigation.navigate('List')
          }}
        />
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginHorizontal: 20,
  },
}
