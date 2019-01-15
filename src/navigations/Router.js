import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from 'screens/HomeScreen'
import ListScreen from 'screens/ListScreen'
import LiveStreamScreen from 'screens/LiveStreamScreen'
import LoginSCreen from 'screens/LoginScreen'
import ContactLiveStreamScreen from 'screens/ContactLiveStream'
import RegisterScreen from 'screens/RegisterScreen'
import StreamScreen from 'screens/StreamScreen'
import ViewStreamScreen from 'screens/ViewStreamScreen'


const AuthenStack = createStackNavigator(
  {
    Home: HomeScreen,
    List: ListScreen,
    Live: LiveStreamScreen,
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
    Streamer: StreamScreen,
    Viewer: ViewStreamScreen,
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
