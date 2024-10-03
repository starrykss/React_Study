import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';

import App from './App.jsx';
import './index.css';

import { store } from './store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
