import { Toast } from 'native-base'

export const showSuccess = (text = 'Action successfully!', duration = 3000, buttonText = null) => {
  Toast.show({
    text,
    buttonText,
    type: 'success',
    duration,
    position: 'top',
  })
}

export const showWarning = (text = 'Unexpected error!', duration = 3000, buttonText = null) => {
  Toast.show({
    text,
    buttonText,
    type: 'warning',
    duration,
    position: 'bottom',
  })
}
