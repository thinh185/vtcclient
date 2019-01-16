import React from 'react'
import { StatusBar, TextInput, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import {
  Container,
  StartColumnContainer,
  RowContainer,
} from 'components/common/SComponent'
import navigator from 'navigations/customNavigator'
import { registerAction } from 'actions/userActions'
import { connect } from 'react-redux'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { styleAuthen } from './styles'

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
        <Container style={[styleAuthen.container, { marginHorizontal: 20 }]}>
          <StatusBar barStyle="dark-content" />
          <StartColumnContainer>
            <RowContainer alignItems="center" justifyContent="center">
              <Image
                style={styleAuthen.image}
                source={require('../assets/logo.png')}
              />
            </RowContainer>
            <Text style={{ fontSize: 25, paddingVertical: 15, fontWeight: '500' }}>REGISTER</Text>

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
              <TouchableOpacity onPress={this.register}>
                <Text style={styleAuthen.textButton}> Register </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { navigator.navigate('Login') }}>
                <Text style={styleAuthen.textMore}> Login </Text>
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
  registerAction,
})(RegisterScreen)
