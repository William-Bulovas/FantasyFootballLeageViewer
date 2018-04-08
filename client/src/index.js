import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import FantasyFootballReducer from './reducers/FantasyFootballReducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';


const store = createStore(FantasyFootballReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
