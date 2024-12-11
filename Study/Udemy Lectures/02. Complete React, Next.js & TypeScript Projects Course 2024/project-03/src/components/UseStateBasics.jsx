import { useState } from 'react';

const UseStateBasics = () => {
  // console.log(useState('hello'));

  // const value = useState('hello')[0];
  // const func = useState('hello')[1];
  // console.log(value);
  // console.log(func);

  const [count, setCount] = useState(0);

  const clickHandler = () => {
    setCount(count + 1);
  };

  return (
    <div className="section">
      <h1>UseState Basics</h1>
      <h4>You clicked {count} times</h4>
      <button type="button" className="btn" onClick={clickHandler}>
        Increase
      </button>
    </div>
  );
};

export default UseStateBasics;
