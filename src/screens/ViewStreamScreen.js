import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
  ScrollView,
  LayoutAnimation,
  WebView,
  Modal,
  StatusBar,
} from 'react-native'
import KeyboardAccessory from 'react-native-sticky-keyboard-accessory'
import { NodePlayerView } from 'react-native-nodemediaclient'
import FloatingHearts from 'components/FloatingHearts'
import { connect } from 'react-redux'
import SocketUtils from '../SocketUtils'
import Utils from '../Utils'
import { stylesLive } from './styles'


class ViewStreamScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props)
    this.state = {
      countViewer: 0,
      countHeart: 0,
      message: '',
      visibleListMessages: true,
      listMessages: [],
      keyboardHeight: 0,
      productId: null,
      productUrl: null,
      productImageUrl: null,
      modalVisible: false,
      roomName: '',
    }
  }

  componentDidMount = () => {
    let keyboardShowEvent = 'keyboardWillShow'
    let keyboardHideEvent = 'keyboardWillHide'
    const { user } = this.props
    if (Platform.OS === 'android') {
      keyboardShowEvent = 'keyboardDidShow'
      keyboardHideEvent = 'keyboardDidHide'
    }
    this.keyboardShowListener = Keyboard.addListener(keyboardShowEvent, e => this.keyboardShow(e))
    this.keyboardHideListener = Keyboard.addListener(keyboardHideEvent, e => this.keyboardHide(e))
    const roomName = this.props.navigation.getParam('roomName')
    this.setState({ roomName })
    SocketUtils.emitJoinServer(roomName, user._id)
  };

  alertStreamerNotReady = () => {
    return Alert.alert('Alert', 'Streamer not ready to live stream yet', [
      {
        text: 'Close',
        onPress: () => {
          SocketUtils.emitLeaveServer(this.state.roomName, this.props.user._id)
          this.props.navigation.goBack()
        },
      },
    ])
  };

  keyboardShow(e) {
    LayoutAnimation.easeInEaseOut()
    this.setState({
      keyboardHeight: e.endCoordinates.height,
    })
  }

  keyboardHide() {
    LayoutAnimation.easeInEaseOut()
    this.setState({
      keyboardHeight: 0,
    })
  }

  onPressHeart = () => {
    this.setState({ countHeart: this.state.countHeart + 1 })
    SocketUtils.emitSendHeart(this.state.roomName)
  };


  onChangeMessageText = (text) => {
    this.setState({ message: text })
  };

  onPressSend = () => {
    const {
      message,
      listMessages,
      productId,
      productImageUrl,
      productUrl,
    } = this.state
    const { user } = this.props
    if (productId !== null && productUrl !== null && productImageUrl !== null) {
      this.setState({ message: '' })
      Keyboard.dismiss()
      const newListMessages = listMessages.slice()
      newListMessages.push({
        userId: user._id,
        message,
        productId,
        productImageUrl,
        productUrl,
      })
      this.setState({
        listMessages: newListMessages,
        visibleListMessages: true,
        productId: null,
        productUrl: null,
        productImageUrl: null,
      })
      SocketUtils.emitSendMessage(
        this.state.roomName,
        user._id,
        message,
        productId,
        productImageUrl,
        productUrl,
      )
    } else if (message !== '') {
      this.setState({ message: '' })
      Keyboard.dismiss()
      const newListMessages = listMessages.slice()
      newListMessages.push({ userId: user._id, message })
      this.setState({
        listMessages: newListMessages,
        visibleListMessages: true,
      })
      SocketUtils.emitSendMessage(
        this.state.roomName,
        user._id,
        message,
      )
    }
  };

  onPressCloseModal = () => {
    this.setState({
      productId: null,
      productUrl: null,
      productImageUrl: null,
      modalVisible: false,
    })
  };

  onPressCancelViewer = () => {
    if (this.vbViewer !== null && this.vbViewer !== undefined) {
      this.vbViewer.stop()
      this.props.navigation.goBack()
    }

    SocketUtils.emitLeaveServer(this.state.roomName, this.props.user._id)
  };

  renderCancelViewerButton = () => {
    return (
      <TouchableOpacity
        style={stylesLive.buttonCancel}
        onPress={this.onPressCancelViewer}
      >
        <Image
          source={require('../assets/ico_cancel.png')}
          style={stylesLive.iconCancel}
        />
      </TouchableOpacity>
    )
  };

  renderGroupInput = () => {
    const { message } = this.state
    if (Platform.OS === 'android') {
      return (
        <View
          style={{
            flex: 1,
            height: this.state.keyboardHeight,
            zIndex: 2,
          }}
        >
          <View style={stylesLive.wrapBottom}>

            <View style={stylesLive.wrapInputAndActionButton}>
              <TextInput
                style={stylesLive.textInput}
                placeholder="Comment input"
                underlineColorAndroid="transparent"
                onChangeText={this.onChangeMessageText}
                value={message}
                onEndEditing={this.onPressSend}
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => {
                  this.setState({ visibleListMessages: false })
                }}

              />
              <TouchableOpacity
                style={stylesLive.wrapIconSend}
                onPress={this.onPressSend}
                activeOpacity={0.6}
              >
                <Image
                  source={require('../assets/ico_send.png')}
                  style={stylesLive.iconSend}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={stylesLive.wrapIconHeart}
                onPress={this.onPressHeart}
                activeOpacity={0.6}
              >
                <Image
                  source={require('../assets/ico_heart.png')}
                  style={stylesLive.iconHeart}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
    return (
      <KeyboardAccessory backgroundColor="transparent">
        <View style={stylesLive.wrapBottomIOS}>
          <View style={stylesLive.col}>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                height: 45,
                marginHorizontal: 10,
                marginBottom: 10,
                borderRadius: 10,
                alignItems: 'center',
              }}
              onLayout={this.setDropZoneValues}
            >
              <TextInput
                style={stylesLive.textInput}
                placeholder="Comment input"
                underlineColorAndroid="transparent"
                onChangeText={this.onChangeMessageText}
                value={message}
                onEndEditing={this.onPressSend}
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => {
                  this.setState({ visibleListMessages: false })
                }}
              />
              <TouchableOpacity
                style={stylesLive.wrapIconSend}
                onPress={this.onPressSend}
                activeOpacity={0.6}
              >
                <Image
                  source={require('../assets/ico_send.png')}
                  style={stylesLive.iconSend}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={stylesLive.wrapIconHeart}
                onPress={this.onPressHeart}
                activeOpacity={0.6}
              >
                <Image
                  source={require('../assets/ico_heart.png')}
                  style={stylesLive.iconHeart}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAccessory>
    )
  };

  renderListMessages = () => {
    const { listMessages, visibleListMessages } = this.state
    if (!visibleListMessages) {
      return null
    }
    return (
      <View style={stylesLive.wrapListMessages}>
        <ScrollView
          ref={(ref) => { this.scrollView = ref }}
          onContentSizeChange={() => {
            this.scrollView.scrollToEnd({ animated: true })
          }}
        >
          {listMessages.length > 0
            && listMessages.map((item) => {
              const {
                productId,
                productUrl,
                productImageUrl,
                userId,
                message,
              } = item
              return (
                <View style={stylesLive.chatItem}>
                  <View style={stylesLive.wrapAvatar}>
                    {item.avatar ? (
                      <Image source={item.avatar} style={stylesLive.iconAvatar} />
                    ) : (
                      <Image
                        source={require('../assets/ico_heart.png')}
                        style={stylesLive.iconAvatar}
                      />
                    )}
                  </View>
                  <View style={stylesLive.messageItem}>
                    {!Utils.isNullOrUndefined(productId)
                      && !Utils.isNullOrUndefined(productUrl)
                      && !Utils.isNullOrUndefined(productImageUrl) && (
                        <TouchableWithoutFeedback
                          onPress={() => this.onPressProduct(item)}
                        >
                          <View style={stylesLive.wrapSeeDetail}>
                            <Image
                              source={{ uri: productImageUrl }}
                              style={stylesLive.iconProduct}
                            />
                            <Text style={stylesLive.textShowDetail}>
                              Click here to see detail
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                    )}

                    <Text style={stylesLive.name}>{userId}</Text>
                    <Text style={stylesLive.content}>{message}</Text>
                  </View>
                </View>
              )
            })}
        </ScrollView>
      </View>
    )
  };

  renderViewerUI = () => {
    const { countViewer, countHeart } = this.state

    return (
      <View style={stylesLive.container}>
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
        <NodePlayerView
          style={stylesLive.streamerCameraView}
          ref={(vb) => {
            this.vbViewer = vb
          }}
          inputUrl={Utils.getRtmpPath() + this.props.navigation.getParam('pathStream')}
          scaleMode="ScaleAspectFit"
          bufferTime={300}
          maxBufferTime={1000}
          autoplay
        />

        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss()
            this.setState({ visibleListMessages: true })
          }}
          accessible={false}
          style={stylesLive.viewDismissKeyboard}
        >
          <View style={stylesLive.container}>
            {this.renderCancelViewerButton()}
            <View style={stylesLive.wrapIconView}>
              <Image
                source={require('../assets/ico_view.png')}
                style={stylesLive.iconView}
              />
              <View style={stylesLive.wrapTextViewer}>
                <Text style={stylesLive.textViewer}>{countViewer}</Text>
              </View>
            </View>
            <FloatingHearts
              count={countHeart}
              style={stylesLive.wrapGroupHeart}
            />
          </View>
        </TouchableWithoutFeedback>
        {this.renderGroupInput()}
        {this.renderListMessages()}
        <Modal
          animationType="slide"
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert('Modal has been closed.')
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.6)',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              style={stylesLive.buttonCloseModal}
              onPress={this.onPressCloseModal}
            >
              <Image
                source={require('../assets/ico_cancel.png')}
                style={stylesLive.iconCancel}
              />
            </TouchableOpacity>
            <View style={stylesLive.wrapWebview}>
              <WebView source={{ uri: this.state.productUrl }} />
            </View>
          </View>
        </Modal>
      </View>
    )
  };

  render() {
    return this.renderViewerUI()
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
})

export default connect(mapStateToProps)(ViewStreamScreen)
