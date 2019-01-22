import React from 'react'
import { PermissionsAndroid, AsyncStorage } from 'react-native'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'
import theme from 'config/theme'
import navigator from 'navigations/customNavigator'
import configureStore from './store'
import AppContainer from './navigations/Router'
import Bootstrap from './Bootstrap'
import Utils from './Utils'

const { store, persistor } = configureStore()

import SocketUtils from './SocketUtils'

SocketUtils.connect(store)
SocketUtils.handleOnConnect()
SocketUtils.handleOnClientJoin()
SocketUtils.handleOnSendHeart()
SocketUtils.handleOnSendMessage()
SocketUtils.handleOnLeaveClient()
SocketUtils.onNewVideoLiveStream()
SocketUtils.onVideoLiveStreamFinish()

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      initialRouteName: null,
    }
  }

  componentDidMount() {
    this.requestVideoCallPermission()
    AsyncStorage.getItem('persist:livestreamapp').then((result) => {
      const storage = JSON.parse(result)
      const { user } = JSON.parse(storage.user)

      if (!user.username) this.setState({ initialRouteName: 'AuthenStack' })
      else this.setState({ initialRouteName: 'HomeStack' })
    }).catch((err) => {
      console.log(`error ${err}`)
      this.setState({ initialRouteName: 'AuthenStack' })
    })
  }

  requestVideoCallPermission = async () => {
    try {
      const cameraGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
      const recordAudioGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      )
      return (
        cameraGranted === PermissionsAndroid.RESULTS.GRANTED
        && recordAudioGranted === PermissionsAndroid.RESULTS.GRANTED
      )
    } catch (err) {
      console.warn(err)
      return false
    }
  }

  render() {
    const { initialRouteName } = this.state

    const RootRouter = AppContainer({ initialRouteName })
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Bootstrap ref={boot => Utils.setContainer(boot)}>
              {initialRouteName
                && (
                <RootRouter ref={(navigatorRef) => { navigator.setContainer(navigatorRef) }} />
                )
              }
            </Bootstrap>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    )
  }
}
