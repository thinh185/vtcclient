import { createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from 'screens/HomeScreen'
import ListScreen from 'screens/ListScreen'
import LiveStreamScreen from 'screens/LiveStreamScreen'
import LoginSCreen from 'screens/LoginScreen'
import ContactLiveStreamScreen from 'screens/ContactLiveStream'
import RegisterScreen from 'screens/RegisterScreen'
import StreamScreen from 'screens/StreamScreen'
import ViewStreamScreen from 'screens/ViewStreamScreen'
import NewViewerScreen from 'screens/NewViewerScreen'


const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    List: ListScreen,
    Live: LiveStreamScreen,
    Login: LoginSCreen,
    Register: RegisterScreen,
    Contact: ContactLiveStreamScreen,
    Stream: StreamScreen,
    Viewer: ViewStreamScreen,
    NewViewer: NewViewerScreen,
  },
  {
    initialRouteName: 'NewViewer',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
)
const AppContainer = createAppContainer(RootStack)

export default AppContainer
