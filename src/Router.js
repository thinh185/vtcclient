import { createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from 'screens/HomeScreen'
import ListScreen from 'screens/ListScreen'
import LiveStreamScreen from 'screens/LiveStreamScreen'
import SocketUtils from './SocketUtils'

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
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
)
const AppContainer = createAppContainer(RootStack)

export default AppContainer
