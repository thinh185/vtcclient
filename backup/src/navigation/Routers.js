import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import ListFriendScreen from 'screens/ListFriendScreen'
import LoginScreen from 'screens/LoginScreen'
import CallScreen from 'screens/CallScreen'
import ReceiveScreen from 'screens/ReceiveCallScreen'

const allScreen = {
  Login: { screen: LoginScreen },
  ListFriend: { screen: ListFriendScreen },
  Call: { screen: CallScreen },
  Receive: { screen: ReceiveScreen },
}
const StackNavigatorListFriend = createStackNavigator(allScreen, {
  initialRouteName: 'ListFriend',
  headerMode: 'none',
})

const StackNavigatorLogin = createStackNavigator(allScreen, {
  initialRouteName: 'Login',
  headerMode: 'none',
})

export default ({ initialRouteName }) => {
  return createSwitchNavigator(
    {
      StackNavigatorLogin,
      StackNavigatorListFriend,
    },
    {
      initialRouteName,
      headerMode: 'none',
    }
  )
}
