import React, { useState } from 'react'
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native'
import { SInputContainer, SIconContainer, STextInput } from './SComponent'

const iconEdit = require('assets/icons/edit.png')

const iconEditColor = require('assets/icons/edit-color.png')

export default ({ icon, placeholder, onChangeText, defaultText }) => {
  const [edit, setEdit] = useState(false)
  const [input, setInput] = useState(null)

  const handleOnFocus = () => {
    setEdit(true)
  }
  const handleOnBlur = () => {
    setEdit(false)
  }

  return (
    <View style={styles.editContainer}>
      <SInputContainer style={styles.inputContainer}>
        <SIconContainer>
          <Image source={icon} />
        </SIconContainer>
        <STextInput
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          style={styles.inputContainer}
          placeholder={placeholder}
          onChangeText={text => onChangeText(text)}
          maxLength={40}
          ref={(c) => { setInput(c) }}
        >{defaultText}
        </STextInput>
      </SInputContainer>
      <SIconContainer>
        <TouchableOpacity onPress={() => input.focus()}>
          <Image source={edit ? iconEditColor : iconEdit} />
        </TouchableOpacity>
      </SIconContainer>
    </View>
  )
}
const styles = StyleSheet.create({
  editContainer: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
  },
})
