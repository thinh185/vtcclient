import FCM from 'react-native-fcm'

export const showLocalNotification = (notify) => {
  if (notify.fcm_notification) {
    const notifyContent = JSON.parse(notify.fcm_notification)
    FCM.presentLocalNotification({
      id: '123456789',
      title: notifyContent.title,
      body: notifyContent.body,
      sound: 'default',
      priority: 'high',
      badge: 0,
      number: 10,
      auto_cancel: true,
      vibrate: 300,
      wake_screen: true,
      lights: true,
      show_in_foreground: true,
      object_data: notify.object_data,
    })
  }
}
