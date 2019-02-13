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
} from ''
import navigator from 'navigation/CustomNavigator'
import { registerAction } from 'actions/userActions'
import { connect } from 'react-redux'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { styleAuthen } from '../screens_old/styles'

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password: null,
      username: null,
    }
  }

  register = () => {
    const { username, password } = this.state

    this.props.registerAction({ username, password })
  }

  render() {
    return (
      <ScrollView>
        <Container marginHorizontal="20">
          <StatusBar barStyle="dark-content" />
          <StartColumnContainer>
            <RowContainer alignItems="center" justifyContent="center">
              <Image style={styleAuthen.image} source={require('../assets/logo.png')} />
            </RowContainer>
            <SHeading>REGISTER</SHeading>
            <StartColumnContainer>
              <SLabel>Username</SLabel>
              <SInput value={this.state.username} onChangeText={username => this.setState({ username })} />
              <SLabel>Password</SLabel>
              <SInput
                secureTextEntry
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
            </StartColumnContainer>
            <StartColumnContainer alignItems="center" style={{ marginTop: 40 }}>
              <TouchableOpacity onPress={this.log}>
                <STextButton> Register </STextButton>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigator.navigate('login')
                }}
              >
                <STextButton style={styleAuthen.textMore}> Login </STextButton>
              </TouchableOpacity>
            </StartColumnContainer>
            <KeyboardSpacer />
          </StartColumnContainer>
        </Container>
      </ScrollView>
    )
  }
}

export default connect(
  null,
  {
    registerAction,
  },
)(RegisterScreen)
