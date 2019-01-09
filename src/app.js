import React from 'react'
import { PermissionsAndroid } from 'react-native'
import AppContainer from './Router'

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
    return <AppContainer />
  }
}
