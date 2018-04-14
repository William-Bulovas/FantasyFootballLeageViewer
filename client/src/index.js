import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import FantasyFootballReducer from './reducers/FantasyFootballReducer';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
    key: 'root',
    storage,
    timeout: 3600,
};

const persistedReducer = persistReducer(persistConfig, FantasyFootballReducer);


const store = createStore(
    persistedReducer,
    applyMiddleware(thunkMiddleware, createLogger())
);

const persistor = persistStore(store)

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
