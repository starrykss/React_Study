import { useState } from 'react';

import { data } from '../../data';

import Counter from './components/Counter';
import List from './components/List';

const LowerState = () => {
  const [people, setPeople] = useState(data);

  return (
    <div className="section">
      <h1>Lower State</h1>
      <Counter />
      <List people={people} />
      <br />
      <div>
        <span>
          <i>
            "① 컴포넌트의 state 또는 prop이 변경되거나,
            <br />
            ②컴포넌트의 state 또는 prop이 변경되지 않더라도 부모 요소가 리렌더링
            될 때, 다른 컴포넌트들도 리렌더링된다."
          </i>
        </span>
      </div>
    </div>
  );
};
export default LowerState;
