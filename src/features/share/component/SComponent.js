import styled from 'styled-components/native'
import { Dimensions } from 'react-native'

import { Button, Icon } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import theme from 'config/theme'

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
export const messageBackground = 'rgba(170, 170, 170,0.5)'
export const AppStyles = {
  colors: {
    accentColor: '#0084ff',
    inactiveGreyColor: '#626262',
    lightGreyCOlor: '#7f8c8d',
    separator: '#bdc3c7',
    black: 'rgb(31, 45, 45)',
    blackOpacity: 'rgba(71, 71, 71, 0.4)',
    blackViewOpacity: 'rgba(71, 71, 71, 0.25)',
    white: 'white',
    grey: 'grey',
    green: 'green',
    onlineGreen: '#2ecc71',
    lightWhite: '#f9f9f9',
  },
  fonts: {
    FONT_REGULAR: 'Roboto-Regular',
    FONT_MEDIUM: 'Roboto-Medium',
    FONT_LIGHT: 'Roboto-Light',
    FONT_THIN: 'Roboto-Thin',
  },
}

const { width } = Dimensions.get('window')
const widthComment = Math.floor((width * 4) / 5)
export const Container = styled.View`
  flex: ${props => props.flexValue || 1}
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
  flexDirection: column
`
export const StartColumnContainer = styled(Container)`
  flex-direction: column
  justifyContent: ${props => props.justifyContent || 'flex-start'}
`

export const RowContainer = styled.View`
  flexDirection: row
  justifyContent: ${props => props.justifyContent || 'flex-start'}
  alignItems: ${props => props.alignItems || 'center'}
  paddingRight: ${props => props.paddingRight || 0}
  marginVertical: ${props => props.marginVertical || 0}
  marginHorizontal: ${props => props.marginHorizontal || 0}
  paddingHorizontal: ${props => props.paddingHorizontal || 0}
  paddingTop: ${props => props.paddingTop || 0}
  paddingVertical: ${props => props.paddingVertical || 0}
  border-radius: ${props => props.radius || 0}

`

export const SearchContainer = styled.View`
  flexDirection: row
  alignItems: ${props => props.alignItems || 'center'}
  border-width: 1
  border-color: ${props => props.borderColor || lightBlackOpacity}
  border-radius: 18
  paddingHorizontal: 8
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
export const Rule = styled.View`
  background-color: ${props => props.backgroundColor || 'rgb(231,234,236)'}
  height: ${props => props.height || 1}
`
export const SpinnerWrapper = styled.View`
  padding-vertical: 10;
`
export const SpinnerWrapperFixed = styled.View`
  flex: 1
  position: absolute
  zIndex: 99
  top: 100
  left: 0
  right: 0
`
export const SActionButton = styled(Button)`
  height: 36
  border-radius: 18
  padding-vertical: 12
  padding-right: 16
  background-color: ${props => props.backgroundColor || 'white'}
  margin-right: 16
  padding-left: ${props => (props.iconLeft ? 0 : 16)}
`

export const SActionButtonText = styled.Text`
  color: ${props => props.color || 'white'}
  font-size: 14
`

export const SActionButtonIcon = styled(Icon)`
  color: rgb(163, 163, 163)
  margin-right: 4
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
  marginhorizontal: ${props => props.marginHorizontal || 0};
`

export const NoFlexContainer = styled.View`
  flexDirection: ${props => props.direction || 'column'}
  justifyContent: ${props => props.justifyContent || 'flex-start'}
  backgroundColor: ${props => props.backgroundColor || '#fff'}
  marginTop: ${props => props.marginTop || 0}
  marginBottom: ${props => props.marginBottom || 0}
  marginHorizontal: ${props => props.marginHorizontal || 0}
  marginVertical: ${props => props.marginVertical || 0}
  paddingVertical: ${props => props.paddingVertical || 0}
  paddingHorizontal: ${props => props.paddingHorizontal || 0}
`

export const SInput = styled.TextInput`
  font-size: ${props => props.fontSize || 14}
  border-radius: 10
  border-width:  ${props => (props.noBorder ? 0 : 1)}
  margin-vertical: 8
  padding-horizontal: 10
  padding-vertical: ${props => props.paddingVertical || 2}
  max-width: ${(width * 85) / 100}
`
export const SInputAuthen = styled(SInput)`
  max-width: ${width};
  font-size: 16;
`

export const SInputComment = styled(SInput)`
  width: ${widthComment};
  margin-vertical: 0;
  margin-left: 10;
`

export const SText = styled.Text`
  font-size: ${props => props.fontSize || 16}
  text-align: ${props => props.textAlign || 'left'}
  font-weight: ${props => props.fontWeight || '300'}
  font-family: ${theme.TEXT_APP}
  color: ${props => props.color || theme.regularColorText}
  padding-horizontal: ${props => props.paddingHorizontal || 0}
  padding-vertical: ${props => props.paddingVertical || 0}
  margin-horizontal: ${props => props.marginHorizontal || 0}
`
export const SHeading = styled.Text`
  font-size: ${props => props.fontSize || 20}
  text-align: ${props => props.textAlign || 'left'}
  font-family: ${theme.TEXT_APP}
  font-weight: ${props => props.fontWeight || '700'}
  color: ${props => props.color || theme.boldColorText}
  padding-horizontal: ${props => props.paddingHorizontal || 0}
  padding-vertical: ${props => props.paddingVertical || 0}
  padding-bottom: ${props => props.paddingBottom || 0}
  padding-top: ${props => props.paddingTop || 0}
`
export const SHoverText = styled.Text`
  font-size: ${props => props.fontSize || 14}
  text-align: ${props => props.textAlign || 'left'}
  font-weight: ${props => props.fontWeight || '300'}
  font-family: ${theme.TEXT_APP}
  color: ${props => props.color || theme.hoverColorText}
  padding-horizontal: ${props => props.paddingHorizontal || 0}
  padding-vertical: ${props => props.paddingVertical || 0}
`

export const SSearchInput = styled.TextInput`
  font-size: ${props => props.fontSize || 16}
  text-align: ${props => props.textAlign || 'left'}
  font-weight: ${props => props.fontWeight || '300'}
  font-family: ${theme.TEXT_APP}
  color: ${props => props.color || theme.hoverColorText}
  padding-horizontal: ${props => props.paddingHorizontal || 0}
  padding-vertical: ${props => props.paddingVertical || 0}
`

export const SButton = styled.TouchableOpacity`
  font-size: 14
  border-radius: 18
  border-width: ${props => props.borderWidth || 0}
  padding-vertical: 10
  padding-horizontal: 8
  margin-vertical: 10
  background-color: ${props => props.backgroundColor || lightBlue}
  border-color: ${props => props.borderColor || lightBlue}
`
export const SBanner = styled.Image`
  width: ${width}
  height: 100
`
export const SIcon = styled.Image`
  width: ${props => props.width || 20}
  height: ${props => props.height || 20}
  padding-vertical: 5
  padding-horizontal: 5
  margin-horizontal: ${props => props.marginHorizontal || 0}
`
export const SRule = styled.View`
  background-color: ${props => props.backgroundColor || 'rgb(71,71,71)'}
  height: ${props => props.height || 1}
  padding-horizontal: ${props => props.paddingHorizontal || 1}
  margin-horizontal: ${props => props.marginHorizontal || 10}
`


export const SInputContainer = styled.View`
    width: 100%;
    height: 45px;
    justifyContent: center;
    alignItems: center;
    flexDirection: row;
    borderColor: ${props => props.theme.borderFormColor};
    borderWidth: 1px;
    borderRadius: 3px;
    marginVertical: 10px;
`
export const SIconContainer = styled.View`
    width: 45px;
    height: 45px;
    justifyContent: center;
    alignItems: center;
`
export const STextInput = styled.TextInput`
    flex: 1;
    height: 45px;
    textAlign: left;
    fontFamily: ${props => props.theme.fontFamily};
`
export const STextForm = styled.Text`
    alignSelf: center;
    flex: 1;
    lineHeight: 44px;
    height: 45px;
    textAlign: left;
    fontFamily: ${props => props.theme.fontFamily};
`
