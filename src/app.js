import React from 'react'
import { PermissionsAndroid } from 'react-native'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'
import theme from 'config/theme'
import navigator from 'navigations/customNavigator'
import configureStore from './store'
import AppContainer from './navigations/Router'
import Bootstrap from './Bootstrap'

const { store, persistor } = configureStore()

export default class App extends React.Component {
  componentDidMount() {
    this.requestVideoCallPermission()
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
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Bootstrap>
              <AppContainer ref={navigatorRef => navigator.setContainer(navigatorRef)} />
            </Bootstrap>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    )
  }
}
