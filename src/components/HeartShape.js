import React from 'react'
import { Image } from 'react-native'

/**
 * @class HeartShape
 */

const HeartShape = ({ color }) => {
  return (
    <Image
      source={require('../assets/ico_heart.png')}
      style={{
        tintColor: color,
        width: 42,
        height: 42,
      }}
    />
  )
}

export default HeartShape
