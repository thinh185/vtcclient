import React from 'react'
import { Image } from 'react-native'
import { SInputContainer, SIconContainer, STextForm } from './SComponent'

export default ({ icon, text }) => {
  return (
    <SInputContainer>
      <SIconContainer>
        <Image source={icon} />
      </SIconContainer>
      <STextForm>
        {text}
      </STextForm>
    </SInputContainer>
  )
}
