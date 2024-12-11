import { useState, useEffect } from 'react';

const MultipleEffects = () => {
  const [value, setValue] = useState(0);
  const [secondValue, setSecondValue] = useState(0);

  useEffect(() => {
    console.log('hello from first useEffect');
  }, [value]);

  useEffect(() => {
    console.log('hello from second useEffect');
  }, [secondValue]);

  return (
    <div className="section">
      <h1>Multiple Effects</h1>
      <h3>value : {value}</h3>
      <button className="btn" onClick={() => setValue(value + 1)}>
        value
      </button>
      <br />
      <h3>second value : {secondValue}</h3>
      <button className="btn" onClick={() => setSecondValue(secondValue + 1)}>
        second value
      </button>
      <p>
        <br />
        <span>
          {'"각각의 버튼을 클릭해보면서 개발자 도구의 콘솔 로그를 확인해본다."'}
        </span>
      </p>
    </div>
  );
};
export default MultipleEffects;
