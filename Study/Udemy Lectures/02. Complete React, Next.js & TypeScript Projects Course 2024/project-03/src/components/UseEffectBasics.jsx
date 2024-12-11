import { useEffect, useState } from 'react';

const UseEffectBasics = () => {
  const [value, setValue] = useState(0);

  const sayHello = () => {
    console.log('Hello, there');
  };

  useEffect(() => {
    // useEffect의 콜백함수 안에 async 함수를 넣고 실행할 수 있다.
    // const someFunc = async () => {
    //   await fetch;
    // };
    // someFunc();

    // 하지만 다음과 같이 비동기 함수를 사용할 수 없다.
    // useEffect(async() => {}, [])

    console.log('Hello from useEffect'); // 최초에 한 번만 표시
  }, []);

  sayHello(); // 렌더링 될 때마다 표시

  return (
    <div className="section">
      <h1>UseEffect Basics</h1>
      <h3>value : {value}</h3>
      <button className="btn" onClick={() => setValue(value + 1)}>
        Click Me
      </button>
      <p>
        <br />
        <span>"버튼을 클릭하고 개발자 도구에서 콘솔 로그를 확인해본다."</span>
      </p>
    </div>
  );
};

export default UseEffectBasics;
