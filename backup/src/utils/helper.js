import { PermissionsAndroid } from "react-native";

export function compareTwoObject(obj1, obj2) {
  return JSON.stringify(obj1) !== JSON.stringify(obj2)
}

export async function requestVideoCallPermission() {
  try {
    const cameraGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
    const recordAudioGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO)
    return (
      cameraGranted === PermissionsAndroid.RESULTS.GRANTED && recordAudioGranted === PermissionsAndroid.RESULTS.GRANTED
    )
  } catch (err) {
    console.warn(err)
    return false
  }
}
