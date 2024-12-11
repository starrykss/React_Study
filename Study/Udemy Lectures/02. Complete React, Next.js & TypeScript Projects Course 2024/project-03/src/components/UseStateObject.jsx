import { useState } from 'react';

import { people } from '../../data';

const UseStateObject = () => {
  const [person, setPerson] = useState({
    name: 'peter',
    age: 24,
    hobby: 'read books',
  });

  const displayPerson = () => {
    // 오직 한 번만 렌더링이 된다. (3번 렌더링 X)
    // setName('john');
    // setAge(28);
    // setHobby('scream at the computer');

    setPerson({
      name: 'john',
      age: 28,
      hobby: 'scream at the computer',
    });
  };

  return (
    <div className="section">
      <h1>UseState Object Example</h1>
      <div>
        <h4>{person.name}</h4>
        <h4>{person.age}</h4>
        <h4>Enjoys to : {person.hobby}</h4>
        <button type="button" className="btn" onClick={displayPerson}>
          Show John
        </button>
      </div>
    </div>
  );
};

export default UseStateObject;
