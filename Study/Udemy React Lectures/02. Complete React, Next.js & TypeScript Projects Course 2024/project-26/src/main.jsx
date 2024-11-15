import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

// normalize.css 적용 (모든 브라우저에서 동일한 스타일이 적용되도록 설정)
import 'normalize.css';

// 전역 상태 스토어
import { store } from './store.js';

import './index.css';
import App from './App.jsx';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App tab='home' />
//   </StrictMode>
// );

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App tab='home' />
  </Provider>
);
