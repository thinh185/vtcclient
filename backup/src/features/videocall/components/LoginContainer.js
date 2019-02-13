import React, { Component } from 'react'
import { Button, Dimensions, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import { socket } from '../socketConfig'
import { connect } from 'react-redux'
import { loginSocketSuccess, setFriendList } from '../../authentication/AuthenAction'
import { LOGIN } from "../constains";

const { width } = Dimensions.get('window')
class LoginContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      message: '',
    }
  }

  componentDidMount() {
    const temp = this
    socket.on('message', function(data) {
      switch (data.type) {
        case LOGIN:
          temp.onLogin(data)
          break
        default:
          break
      }
    })
    this.navListenerFocus = this.props.navigation.addListener(
      'willFocus',
      () => {
        if (this.props.me && this.props.me.id) {
          this.props.navigation.navigate('ListFriend')
        }
      },
    )
  }

  componentWillUnmount() {
    this.navListenerFocus.remove()
  }

  onPressLogin() {
    let username = this.state.username
    if (!username || username.trim() === '') {
      this.setState({ message: 'Please enter Username' })
    } else {
      const temp = this
      socket.send({
        type: LOGIN,
        user: {
          id: Math.round(Math.random() * 10000),
          username: username.trim(),
          notificationToken: temp.props.notificationToken,
          active: true,
        },
      })
    }
  }

  onLogin(data) {
    if (data.success === false) {
      this.setState({ message: 'oops...try a different username' })
    } else {
      const user = data.user
      this.props.loginSocketSuccess(user)
      this.props.setFriendList(data.users)
      this.props.navigation.navigate('ListFriend')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.toolbar}>
          <Text style={styles.toolbarButton} />
          <Text style={styles.toolbarTitle} />
          <Text style={styles.toolbarButton} />
        </View>
        <View style={styles.container}>
          <Text style={styles.instructions}>Enter User Name :</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({ username: text })}
            value={this.state.username}
          />
          <Button onPress={() => this.onPressLogin()} title="Login" color="#81c04d" />
          <Text style={styles.instructions}>{this.state.message}</Text>
        </View>
      </View>
    )
  }
}

const lightWhite = '#F5FCFF'
const white = '#fff'
const green = '#81c04d'
const gray = 'gray'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightWhite,
  },
  instructions: {
    textAlign: 'center',
    marginBottom: 5,
  },
  toolbar: {
    backgroundColor: green,
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  toolbarButton: {
    width: 55,
    color: white,
    textAlign: 'center',
  },
  toolbarTitle: {
    color: white,
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
  },
  textInput: {
    padding: 5,
    alignSelf: 'center',
    height: 40,
    width: (width * 80) / 100,
    borderColor: gray,
    borderWidth: 1,
  },
})

const mapStateToProps = (state) => ({
  notificationToken: state.authSocket.notificationToken,
  me: state.authSocket.user,
})

export default connect(
  mapStateToProps,
  {
    loginSocketSuccess,
    setFriendList,
  }
)(LoginContainer)
