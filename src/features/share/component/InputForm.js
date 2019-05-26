import React from 'react'
import { Image } from 'react-native'
import { SInputContainer, SIconContainer, STextInput } from './SComponent'

export default ({ icon, placeholder, onChangeText, secureTextEntry = false }) => {
  return (
    <SInputContainer>
      <SIconContainer>
        <Image source={icon} />
      </SIconContainer>
      <STextInput
        placeholder={placeholder}
        onChangeText={text => onChangeText(text)}
        maxLength={40}
        secureTextEntry={secureTextEntry}
      />
    </SInputContainer>
  )
}
