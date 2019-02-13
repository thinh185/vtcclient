import React from 'react'
import { StatusBar, TouchableOpacity, Image, ScrollView } from 'react-native'
import {
  Container,
  StartColumnContainer,
  RowContainer,
  SHeading,
  SInput,
  SLabel,
  STextButton,
} from 'components/common/SComponent'
import navigator from 'navigations/customNavigator'
import { connect } from 'react-redux'
import { loginAction } from 'actions/userActions'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { styleAuthen } from '../screens_old/styles'

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
        <Container marginHorizontal="20">
          <StatusBar barStyle="dark-content" />
          <StartColumnContainer>
            <RowContainer alignItems="center" justifyContent="center">
              <Image
                style={styleAuthen.image}
                source={require('../assets/logo.png')}
              />
            </RowContainer>
            <SHeading>LOGIN</SHeading>
            <StartColumnContainer>
              <SLabel>Username</SLabel>
              <SInput
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
              />
              <SLabel>Password</SLabel>
              <SInput
                secureTextEntry
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
            </StartColumnContainer>
            <StartColumnContainer
              alignItems="center"
              style={{ marginTop: 40 }}
            >
              <TouchableOpacity onPress={this.log}>
                <STextButton> Login </STextButton>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { navigator.navigate('Register') }}>
                <STextButton> Register </STextButton>
              </TouchableOpacity>
            </StartColumnContainer>
            <KeyboardSpacer />

          </StartColumnContainer>
        </Container>
      </ScrollView>

    )
  }
}

export default connect(null, {
  loginAction,
})(LoginScreen)
