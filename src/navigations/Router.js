import { createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from 'screens/HomeScreen'
import ListScreen from 'screens/ListScreen'
import LiveStreamScreen from 'screens/LiveStreamScreen'
import LoginSCreen from 'screens/LoginScreen'
import ContactLiveStreamScreen from 'screens/ContactLiveStream'
import RegisterScreen from 'screens/RegisterScreen'
import StreamScreen from 'screens/StreamScreen'

import SocketUtils from '../SocketUtils'

SocketUtils.connect()
SocketUtils.handleOnConnect()
SocketUtils.handleOnClientJoin()
SocketUtils.handleOnSendHeart()
SocketUtils.handleOnSendMessage()
SocketUtils.handleOnLeaveClient()
SocketUtils.handleOnChangedLiveStatus()
SocketUtils.handleOnNotReady()

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    List: ListScreen,
    Live: LiveStreamScreen,
    Login: LoginSCreen,
    Register: RegisterScreen,
    Contact: ContactLiveStreamScreen,
    Stream: StreamScreen,
  },
  {
    initialRouteName: 'Login',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
)
const AppContainer = createAppContainer(RootStack)

export default AppContainer
