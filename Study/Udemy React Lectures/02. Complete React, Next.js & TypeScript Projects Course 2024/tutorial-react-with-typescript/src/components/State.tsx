import { useState } from 'react';

type Link = {
  id: number;
  url: string;
  text: string;
};

const navLinks = [
  {
    id: 1,
    url: 'some url',
    text: 'some text',
  },
  {
    id: 2,
    url: 'some url',
    text: 'some text',
  },
  {
    id: 3,
    url: 'some url',
    text: 'some text',
  },
];

const StateComponent = () => {
  // useState에 제네릭 타입을 지정하지 않으면, 초깃값에서 자동으로 타입이 추론된다.
  const [text, setText] = useState('shakeandBake');
  const [number, setNumber] = useState(1);

  // 만약 useState의 초기값을 지정하지 않을 경우, 다음과 같이 제네릭 타입을 명시해준다.
  const [list, setList] = useState<string[]>([]);

  const [links, setLinks] = useState(navLinks);

  return (
    <div>
      <h2 className="mb-1">State</h2>
      <button
        className="btn btn-center"
        onClick={() => {
          // setText(1);   // 오류 발생 (타입 오류)
          setText('Hi');
          setNumber(6);
          // setList([1, 3]);   // 오류 발생
          setList(['hello', 'world']);
          setLinks([...links, { id: 4, url: 'hello', text: 'hello' }]);
        }}
      >
        Click Me
      </button>
      <div>
        <p>{text} </p>
        <p>{number} </p>
        <p>
          {list[0]} {list[1]}
        </p>
      </div>
    </div>
  );
};

export default StateComponent;
