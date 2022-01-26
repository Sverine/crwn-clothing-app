import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import './index.css';
import App from './App';

ReactDOM.render(
    //It's a component which represents the store object that we get from Redux and it needs to be the parent of everythings 
    <Provider store={store}> 
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

