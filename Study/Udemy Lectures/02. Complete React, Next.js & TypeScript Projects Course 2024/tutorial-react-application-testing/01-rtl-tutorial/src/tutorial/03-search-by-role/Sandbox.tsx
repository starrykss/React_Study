import { useEffect, useState } from 'react';

const Sandbox = () => {
  const [showAsyncButton, setShowAsyncButton] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    // 500ms 후 비동기 버튼 표시
    const timer = setTimeout(() => {
      setShowAsyncButton(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <nav>
        <a href='/'>Home</a>
        <a href='/about'>About</a>
      </nav>

      {/* 헤딩 요소 */}
      <h1>Main Heading</h1>
      <h2>Subheading</h2>

      <img src='example.jpg' alt='Example' />

      {/* 일반 버튼들 */}
      <button>Click me</button>
      <button>Submit</button>
      <button>Cancel</button>

      {/* 조건부 렌더링 (초기에는 보이지 않음) */}
      {showError && <button>Error</button>}

      {/* 500ms 후 등장하는 버튼 */}
      {showAsyncButton && <button>Async Button</button>}
    </div>
  );
};

export default Sandbox;
