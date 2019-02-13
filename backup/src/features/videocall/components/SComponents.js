import Styled from 'styled-components'
import { Button } from "native-base"
export const SGroupButtonContainer = Styled.View`
  position: absolute
  width: 100%
  height: 50
  zIndex: 10
  bottom: 50
  flexDirection: row
  justifyContent: space-around
  alignItems: center
`
export const SActionButton = Styled(Button)`
  height: 36
  border-radius: 18
  padding-vertical: 12
  padding-right: 16
  background-color: ${(props) => props.backgroundColor || 'white'}
  margin-right: 16
  padding-left: ${(props) => (props.iconLeft ? 0 : 16)}
`

export const SActionButtonText = Styled.Text`
  color: ${(props) => props.color || 'white'}
  font-size: 14
`
