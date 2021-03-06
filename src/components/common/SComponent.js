import styled from 'styled-components'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export const lightGrey = 'rgb(170, 170, 170)'
export const lightBlack = 'rgb(71, 71, 71)'
export const lightBlackOpacity = 'rgba(71, 71, 71, 0.75)'
export const lightBlue = 'rgb(24,128,222)'
export const borderColor = '#E7EAEC'
export const boldBlack = 'rgb(34, 34, 34)'
export const activeButtonBackground = 'rgb(23, 128, 222)'
export const defaultButtonBackground = 'rgb(231, 234, 236)'
export const charcoalGrey = 'rgb(48, 49, 55)'
export const whiteTwo = 'rgb(246, 246, 246)'

export const Container = styled.View`
  flex: 1
  flexDirection: ${props => props.direction || 'column'}
  justifyContent: ${props => props.justifyContent || 'flex-start'}
  backgroundColor: ${props => props.backgroundColor || '#fff'}
  marginTop: ${props => props.marginTop || 0}
  marginBottom: ${props => props.marginBottom || 0}
  marginVertical: ${props => props.marginVertical || 0}
  marginHorizontal: ${props => props.marginHorizontal || 0}
  paddingHorizontal: ${props => props.paddingHorizontal || 0}
  paddingVertical: ${props => props.paddingVertical || 0}
`
export const ColumnContainer = styled(Container)`
  flex-direction: column
`
export const StartColumnContainer = styled(Container)`
  flex-direction: column
  justify-content: flex-start
`
export const RowContainer = styled.View`
  flexDirection: row
  justifyContent: ${props => props.justifyContent || 'flex-start'}
  alignItems: ${props => props.alignItems || 'flex-start'}
  paddingRight: ${props => props.paddingRight || 0}
`

export const FlexRowContainer = styled(RowContainer)`
  flex: 1
  backgroundColor: ${props => props.backgroundColor || '#fff'}
  marginTop: ${props => props.marginTop || 0}
  marginBottom: ${props => props.marginBottom || 0}
  marginHorizontal: ${props => props.marginHorizontal || 0}
  paddingHorizontal: ${props => props.paddingHorizontal || 0}
`
export const MainButton = styled.TouchableOpacity`
  background-color: ${props => props.backgroundColor || props.theme.mainButtonBC}
  borderRadius: 25
  border: ${props => props.color || props.theme.mainButtonTC}
`
export const CenterEmptyRowContainer = styled(RowContainer)`
  justify-content: space-between
`
export const Rule = styled.View`
  background-color: ${props => props.backgroundColor || 'rgb(231,234,236)'}
  height: ${props => props.height || 1}
`
export const SpinnerWrapper = styled.View`
  padding-vertical: 10
`
export const SpinnerWrapperFixed = styled.View`
  flex: 1
  position: absolute
  zIndex: 99
  top: 100
  left: 0
  right: 0
`
export const SActionButtonText = styled.Text`
  color: ${props => props.color || 'white'}
  font-size: 14
`
export const AntIcon = styled(AntDesign)`
  padding-horizontal: 10
  color: ${lightBlack}
  font-size: 16
`
export const MaterialIcon = styled(MaterialIcons)`
  padding-horizontal: 10
  color: ${lightBlack}
  font-size: 16
`

export const SScrollViewColumn = styled.ScrollView`
  marginHorizontal: ${props => props.marginHorizontal || 0}
`

export const NoFlexContainer = styled.View`
  flexDirection: ${props => props.direction || 'column'}
  backgroundColor: ${props => props.backgroundColor || '#fff'}
  marginTop: ${props => props.marginTop || 0}
  marginBottom: ${props => props.marginBottom || 0}
  marginHorizontal: ${props => props.marginHorizontal || 0}
  marginVertical: ${props => props.marginVertical || 0}
  paddingVertical: ${props => props.paddingVertical || 0}
  paddingHorizontal: ${props => props.paddingHorizontal || 0}
`

export const NotPostText = styled.Text`
  font-size: 16
  color: ${lightGrey}
  text-align: center
  padding-vertical: 20
`
