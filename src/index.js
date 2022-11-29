import React from 'react';
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { store } from './store/configureStore';
import App from './containers/App';

import registerServiceWorker from './registerServiceWorker';

import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
)

registerServiceWorker();