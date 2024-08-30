import { useState, useEffect } from 'react';

const CleanUpFunction = () => {
  const [toggle, setToggle] = useState(false);

  console.log('render');

  return (
    <div className="section">
      <h1>Cleanup Function</h1>
      <button className="btn" onClick={() => setToggle(!toggle)}>
        toggle component
      </button>
      <br />
      {toggle && <RandomComponent />}
      <br />
      <div>
        <span>{'버튼 클릭 시 개발자 도구의 콘솔 로그를 확인해본다.'}</span>
      </div>
    </div>
  );
};

// 컴포넌트가 마운트/언마운트 될 때마다 리렌더링이 되어 (useEffect의 의존성 배열을 []로 설정했음에도 불구하고) useEffect 동작이 반복된다.
// -> 이 현상을 방지하기 위해 클린업 함수를 useEffect 내부에 작성해준다.
const RandomComponent = () => {
  useEffect(() => {
    console.log('hmm, this is interesting');

    const intID = setInterval(() => {
      console.log('hello from interval');
    }, 1000);

    // Cleanup
    return () => {
      clearInterval(intID);
      console.log('cleanup');
    };
  }, []);

  // useEffect를 이용하여 이벤트 등록 시, 클린업 함수 사용 예
  useEffect(() => {
    const someFunc = () => {
      // some logic here
    };
    window.addEventListener('scroll', someFunc);
    return () => window.removeEventListener('scroll', someFunc);
  }, []);

  return <h3>hello there</h3>;
};

export default CleanUpFunction;
