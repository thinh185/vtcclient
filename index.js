/** @format */

import { AppRegistry, YellowBox } from 'react-native'
import App from './src/app'
import { name as appName } from './app.json'

YellowBox.ignoreWarnings(['Require cycle:'])
console.disableYellowBox = true
AppRegistry.registerComponent(appName, () => App)
