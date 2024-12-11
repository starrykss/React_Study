import ReactDOM from 'react-dom/client';

import App from './App';

function Greeting() {
  return <h2>My First Component</h2>;
}

// 루트 설정 후 렌더링하기
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
