// Config store
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'
import rootReducer from './rootReducer'

export default () => {
  const sagaMiddleware = createSagaMiddleware()
  const persistConfig = {
    key: 'livestreamapp',
    storage: AsyncStorage,
    whitelist: ['user'],
    timeout: 0,
  }

  const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer))
  const store = createStore(
    persistedReducer,
    {},
    compose(
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
        : f => f,
    ),
  )

  const persistor = persistStore(store)

  sagaMiddleware.run(rootSaga)
  return {
    store,
    persistor,
  }
}
