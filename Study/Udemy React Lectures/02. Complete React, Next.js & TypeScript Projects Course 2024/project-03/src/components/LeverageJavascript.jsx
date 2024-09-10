import { people } from '../data';

import Person from './components/Person';

export const LeverageJavascript = () => {
  return (
    <div className="section">
      <h1>Leverage JavaScript</h1>
      {people.map((person) => (
        <Person
          key={person.id}
          name={person.name}
          nickName={person.nickName}
          images={person.images}
        />
      ))}
      <p>
        <span>
          "Optional Chaining을 이용하여 페치된 데이터의 특정 데이터가 없을 경우,
          다른 값으로 대체되게 할 수 있다."
        </span>
      </p>
    </div>
  );
};

export default LeverageJavascript;
