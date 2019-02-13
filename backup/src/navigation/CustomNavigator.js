import { NavigationActions, DrawerActions, StackActions } from 'react-navigation'
let _container // eslint-disable-line

function setContainer(container) {
  _container = container
}

function reset(routeName, params = {}) {
  _container.dispatch(
    StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          type: 'Navigation/NAVIGATE',
          routeName,
          params,
        }),
      ],
    })
  )
}

function navigate(routeName, params = {}, key = null) {
  _container.dispatch(
    NavigationActions.navigate({
      type: NavigationActions.NAVIGATE,
      // Add key for prevent multiple tap on same screen
      key: key || routeName,
      routeName,
      params,
    })
  )
}

function back() {
  return _container.dispatch(NavigationActions.back())
}

function openDrawer() {
  return _container.dispatch(DrawerActions.openDrawer())
}

function closeDrawer() {
  return _container.dispatch(DrawerActions.closeDrawer())
}

function getParam(param, defaultValue = null) {
  return _container.getParam(param, defaultValue)
}

const navigator = {
  setContainer,
  navigate,
  reset,
  back,
  goBack: back,
  openDrawer,
  closeDrawer,
  getParam,
}

export default navigator
