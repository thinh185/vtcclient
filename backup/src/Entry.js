import React from 'react'
import { AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'
import { Root } from 'native-base'
import { PersistGate } from 'redux-persist/integration/react'
import navigator from 'navigation/CustomNavigator'
import { ThemeProvider } from 'styled-components'
import theme from 'config/theme'
import configureStore from './store'
import Bootstrap from './Bootstrap'
import bootstrapSocket from './BootstrapSocket'
import Router from './navigation/Routers'

const { store, persistor } = configureStore()
const BootstrapSocket = bootstrapSocket(Bootstrap)

class Entry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      initialRouteName: null,
    }
  }
  componentDidMount() {
    AsyncStorage.getItem('persist:root')
      .then((result) => {
        const storage = JSON.parse(result)
        const user = storage && storage.authSocket ? JSON.parse(storage.authSocket).user : null
        if (user && user.id) {
          this.setState({
            initialRouteName: 'StackNavigatorListFriend',
          })
        } else {
          this.setState({
            initialRouteName: 'StackNavigatorLogin',
          })
        }
      })
      .catch((error) => {
        console.log('Entry error', error)
      })
  }

  render() {
    const RootRouter = Router({ initialRouteName: this.state.initialRouteName })

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BootstrapSocket>
            <Root>
              <ThemeProvider theme={theme}>
                {this.state.initialRouteName && (
                  <RootRouter ref={(navigatorRef) => navigator.setContainer(navigatorRef)} />
                )}
              </ThemeProvider>
            </Root>
          </BootstrapSocket>
        </PersistGate>
      </Provider>
    )
  }
}

export { store }

export default Entry
