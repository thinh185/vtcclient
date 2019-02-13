// Bootstrap services need to run first
import React from 'react'
import { connect } from 'react-redux'
import { setCallStatus } from 'features/authentication/AuthenAction'
import navigator from './navigation/CustomNavigator'
import FCM, {
  FCMEvent,
  NotificationType,
  RemoteNotificationResult,
  WillPresentNotificationResult,
} from 'react-native-fcm'
import { Platform } from 'react-native'
import { setDeviceToken } from 'features/authentication/AuthenAction'
import { showLocalNotification } from './features/videocall/components/NotificationListeners'
import { CALLING, WAITING } from "./features/videocall/constains";

class Bootstrap extends React.Component {
  componentDidMount() {
    this.compoDidMountNotifi()
  }

  componentWillUnmount() {
    this.notificationListener.remove()
    this.refreshToken.remove()
  }

  // Notification
  compoDidMountNotifi() {
    this.requestPermission()
    // FCM.createNotificationChannel is mandatory for Android targeting >=8. Otherwise you won't see any notification
    FCM.createNotificationChannel({
      id: 'video_call',
      name: 'Video Call',
      description: 'Notifies when action with video call',
      priority: 'max',
    })
    this.notificationListener = FCM.on(FCMEvent.Notification, this.processIncomingNotification)
    FCM.getFCMToken().then((token) => {
      this.props.setDeviceToken(token)
    })

    this.refreshToken = FCM.on(FCMEvent.RefreshToken, (token) => {
      this.props.setDeviceToken(token)
    })
  }

  async requestPermission() {
    try {
      const result = await FCM.requestPermissions({
        badge: false,
        sound: true,
        alert: true,
      })
    } catch (e) {
      console.log(e.message)
    }
  }

  processIncomingNotification = (notif) => {
    try {
      const notifyItem = JSON.parse(notif.object_data)

      if (notif.opened_from_tray && notifyItem) {
        if (notifyItem.object_type === CALLING) {
          this.props.setCallStatus(WAITING)
          navigator.navigate('Receive', { data: notifyItem })
        } else {
        }
      }

      if (Platform.OS === 'ios') {
        switch (notif._notificationType) {
          case NotificationType.Remote:
            notif.finish(RemoteNotificationResult.NewData)
            break
          case NotificationType.NotificationResponse:
            notif.finish()
            break
          case NotificationType.WillPresent:
            notif.finish(WillPresentNotificationResult.All)
            break
          default:
        }
      } else {
        showLocalNotification(notif)
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  render() {
    return this.props.children
  }
}

const mapStateToProps = (state) => ({
  notificationToken: state.authSocket.notificationToken,
})
export default connect(
  mapStateToProps,
  {
    setCallStatus,
    setDeviceToken,
  }
)(Bootstrap)
