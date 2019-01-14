import React from 'react'
import { StatusBar, TextInput, TouchableOpacity, Image } from 'react-native'
import {
  Container,
  StartColumnContainer,
  RowContainer,
} from 'components/common/SComponent'
import navigator from 'navigations/customNavigator'
import { connect } from 'react-redux'
import { loginAction } from 'actions/userActions'
import { NodePlayerView } from 'react-native-nodemediaclient'
import { styleAuthen, stylesLive } from './styles'

class NewViewerScreen extends React.Component {
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
      <Container style={[styleAuthen.container, { backgroundColor: 'red' }]}>
        <StatusBar barStyle="dark-content" />
        <StartColumnContainer style={[styleAuthen.container, { backgroundColor: 'red' }]}>
          <RowContainer alignItems="flex-start" justifyContent="center">
            <TouchableOpacity
              style={stylesLive.buttonCloseModal}
            >
              <Image
                source={require('../assets/ico_cancel.png')}
                style={stylesLive.iconCancel}
              />
            </TouchableOpacity>

          </RowContainer>
          {/* <NodePlayerView
            style={stylesLive.streamerCameraView}
            ref={(vb) => {
              this.vbViewer = vb
            }}
            // inputUrl={Utils.getRtmpPath() + this.props.navigation.getParam('pathStream')}
            scaleMode="ScaleAspectFit"
            bufferTime={300}
            maxBufferTime={1000}
            autoplay
          /> */}

          <RowContainer
            justifyContent="flex-start"
            alignItems="center"
            style={{
              position: 'absolute',
              bottom: 10,
              left: 0,
              zIndex: 2,
            }}
          >
            <TextInput
              style={stylesLive.textInput}
            />
            <TouchableOpacity>
              <Image
                source={require('../assets/ico_send.png')}
                style={stylesLive.iconSend}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigator.navigate('Register') }}>
              <Image
                source={require('../assets/ico_heart.png')}
                style={stylesLive.iconHeart}
              />
            </TouchableOpacity>
          </RowContainer>
        </StartColumnContainer>
      </Container>

    )
  }
}

export default connect(null, {
  loginAction,
})(NewViewerScreen)
