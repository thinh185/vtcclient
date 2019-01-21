import { NavigationActions, DrawerActions } from 'react-navigation'

let _container; // eslint-disable-line

function setContainer(container) {
  _container = container
}

function reset(routeName, params = {}) {
  _container.dispatch(NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        type: 'Navigation/NAVIGATE',
        routeName,
        params,
      }),
    ],
  }))
}

function navigate(routeName, params = {}, key = null) {
  _container.dispatch(NavigationActions.navigate({
    type: NavigationActions.NAVIGATE,
    // Add key for prevent multiple tap on same screen
    key: key || routeName,
    routeName,
    params,
  }))
}

function getCurrentRoute() {
  if (!_container || !_container.state.nav) {
    return null
  }

  return _container.state.nav.routes[_container.state.nav.index] || null
}

function back() {
  return _container.dispatch(NavigationActions.back())
}

function openDrawer() {
  return _container.dispatch(DrawerActions.openDrawer())
}

function getParam(param, defaultValue = null) {
  console.log({ _container })
  return _container.getParam(param, defaultValue)
}

const navigator = {
  setContainer,
  navigate,
  reset,
  back,
  goBack: back,
  getCurrentRoute,
  openDrawer,
  getParam,
}

export default navigator
