import { useState } from 'react';

import { data } from '../data';

import List from './components/List3';

const ReactMemoExample = () => {
  const [people, setPeople] = useState(data);
  const [count, setCount] = useState(0);

  const removePerson = (id) => {
    const newPeople = people.filter((person) => person.id !== id);
    setPeople(newPeople);
  };

  return (
    <div className="section">
      <h1>React.memo() Example</h1>
      <section>
        <button
          className="btn"
          onClick={() => setCount(count + 1)}
          style={{ marginBottom: '1rem' }}
        >
          count {count}
        </button>
        <List people={people} removePerson={removePerson} />
      </section>
    </div>
  );
};

export default ReactMemoExample;
