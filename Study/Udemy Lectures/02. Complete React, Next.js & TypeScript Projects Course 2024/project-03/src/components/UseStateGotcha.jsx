import { useState } from 'react';

const UseStateGotcha = () => {
  const [value, setValue] = useState(0);

  const clickHandler = () => {
    // setValue(value + 1);
    // console.log(value); // 한 단계 이전의 값 출력

    // 함수형 접근법
    setValue((currentState) => {
      const newState = currentState + 1;
      console.log(newState);

      return newState;
    });
  };

  const setTimeoutClickHandler = () => {
    // 최신의 값을 가져와서 업데이트 하지 않기 때문에 잘못된 값으로 업데이트 될 수 있다.
    // > 확인 : 이 버튼을 클릭한 후, 숫자를 증가시키는 기존 버튼을 여러 번 눌러서 숫자가 맞게 업데이트 됐는지 확인하기
    // const timer = setTimeout(() => {
    //   console.log('clicked the button');
    //   setValue(value + 1);
    // }, 3000);

    const timer = setTimeout(() => {
      console.log('clicked the button');
      setValue((currentState) => currentState + 1); // 최신 값을 가져와 업데이트
    }, 3000);
  };

  return (
    <div className="section">
      <h1>UseState "Gotcha"</h1>
      <h4>{value}</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <button type="button" className="btn" onClick={clickHandler}>
          increase
        </button>
        <button type="button" className="btn" onClick={setTimeoutClickHandler}>
          increase (3s)
        </button>
      </div>
      <p>
        <br />
        <span>
          "하단 버튼을 한 번 누르고 상단 버튼을 여러 번 눌러서 3초 뒤에 숫자값이
          올바르게 업데이트 됐는지 확인하기"
        </span>
      </p>
    </div>
  );
};
export default UseStateGotcha;
