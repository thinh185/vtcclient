import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation'
import LoginSCreen from 'screens/LoginScreen'
import ContactLiveStreamScreen from 'screens/ContactLiveStream'
import RegisterScreen from 'screens/RegisterScreen'
import StreamerScreen from 'screens/StreamerScreen'
import ViewerScreen from 'screens/ViewerScreen'
import KeyboardHOC from 'hoc/keyboardHoc'

const StreamerScreenHoc = KeyboardHOC(StreamerScreen)
const ViewerScreenHoc = KeyboardHOC(ViewerScreen)

const AuthenStack = createStackNavigator(
  {
    Login: LoginSCreen,
    Register: RegisterScreen,
  },
  {
    initialRouteName: 'Login',
    navigationOptions: {
      gesturesEnabled: false,
    },
    headerMode: 'none',

  },
)

const HomeStack = createStackNavigator(
  {
    Streamer: StreamerScreenHoc,
    Viewer: ViewerScreenHoc,
    Contact: ContactLiveStreamScreen,
  },
  {
    initialRouteName: 'Contact',
    navigationOptions: {
      gesturesEnabled: false,
    },
    headerMode: 'none',
  },
)

export default ({ initialRouteName }) => {
  const MainNavigator = createSwitchNavigator(
    {
      AuthenStack,
      HomeStack,
    },
    {
      initialRouteName,
      headerMode: 'none',
    },
  )
  return createAppContainer(MainNavigator)
}
