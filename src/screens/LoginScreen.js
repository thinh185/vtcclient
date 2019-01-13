import React from 'react'
import { StatusBar, TextInput, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import {
  Container,
  StartColumnContainer,
  RowContainer,
} from 'components/common/SComponent'
import navigator from 'navigations/customNavigator'
import { connect } from 'react-redux'
import { loginAction } from 'actions/userActions'
import { styleAuthen } from './styles'

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password: null,
      username: null,
    }
  }

  log = () => {
    const { username, password } = this.state
    this.props.loginAction({ username, password })
  }

  render() {
    return (
      <ScrollView>
        <Container style={styleAuthen.container}>
          <StatusBar barStyle="dark-content" />
          <StartColumnContainer>
            <RowContainer alignItems="center" justifyContent="center">
              <Image
                style={styleAuthen.image}
                source={require('../assets/logo.png')}
              />
            </RowContainer>
            <Text style={{ fontSize: 25, paddingVertical: 15, fontWeight: '500' }}>LOGIN</Text>
            <StartColumnContainer style={styleAuthen.item}>
              <Text style={styleAuthen.label}>Username</Text>
              <TextInput
                style={styleAuthen.textInput}
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
              />
              <Text style={styleAuthen.label}>Password</Text>
              <TextInput
                style={styleAuthen.textInput}
                secureTextEntry
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
            </StartColumnContainer>
            <StartColumnContainer style={{ alignItems: 'center', marginTop: 40 }}>
              <TouchableOpacity onPress={this.log}>
                <Text style={styleAuthen.textButton}> Login </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { navigator.navigate('Register') }}>
                <Text style={styleAuthen.textMore}> Register </Text>
              </TouchableOpacity>
            </StartColumnContainer>
          </StartColumnContainer>
        </Container>
      </ScrollView>

    )
  }
}

export default connect(null, {
  loginAction,
})(LoginScreen)
