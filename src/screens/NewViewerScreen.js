import React from 'react'
import { StatusBar, TextInput, TouchableOpacity, Image, View, Text } from 'react-native'
import {
  Container,
  StartColumnContainer,
  RowContainer,
} from 'components/common/SComponent'
import navigator from 'navigations/customNavigator'
import { connect } from 'react-redux'
import { loginAction } from 'actions/userActions'
import FloatingHearts from 'components/FloatingHearts'
// import { NodePlayerView } from 'react-native-nodemediaclient'
import { styleAuthen, stylesLive } from './styles'

class NewViewerScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countHeart: 0,
    }
  }

  render() {
    const { countHeart } = this.state
    return (
      <Container>
        <StatusBar barStyle="dark-content" />
        <StartColumnContainer style={styleAuthen.container}>
          <RowContainer
            alignItems="center"
            justifyContent="flex-start"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 2,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigator.goBack()
              }}
            >
              <Image
                source={require('../assets/ico_cancel.png')}
                style={{ width: 20, height: 20, tintcolor: 'white' }}
              />
            </TouchableOpacity>
            <Text style={{ paddingHorizontal: 10, paddingVertical: 5, borderRadiusL: 8 }}>
              10
            </Text>
          </RowContainer>
          <View style={{
            flex: 1,
            backgroundColor: 'white',
          }}
          />
          {/* <NodePlayerView
            // style={stylesLive.streamerCameraView}
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
              marginHorizontal: 5,
            }}
          >
            <FloatingHearts count={countHeart} />

            <TextInput
              style={stylesLive.textInput}
            />
            <TouchableOpacity>
              <Image
                source={require('../assets/ico_send.png')}
                style={stylesLive.iconSend}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.setState((prev) => { this.setState({ countHeart: prev.countHeart + 1 }) })
            }
            }
            >
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
