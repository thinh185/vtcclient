import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation'
import LoginSCreen from 'screens/LoginScreen'
import ContactLiveStreamScreen from 'screens/ContactLiveStream'
import RegisterScreen from 'screens/RegisterScreen'
import StreamScreen from 'screens/StreamScreen'
import ViewStreamScreen from 'screens/ViewStreamScreen'
import ChartDemo from 'screens/ChartDemoReactNative'
import WebViewChartDemo from 'screens/WebViewChart'


const AuthenStack = createStackNavigator(
  {
    Login: ChartDemo,
    Register: RegisterScreen,
    Web: WebViewChartDemo,
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
    // TestApi: TestStreamApiScreen,
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
      initialRouteName: 'AuthenStack',
      headerMode: 'none',
    },
  )
  return createAppContainer(MainNavigator)
}
