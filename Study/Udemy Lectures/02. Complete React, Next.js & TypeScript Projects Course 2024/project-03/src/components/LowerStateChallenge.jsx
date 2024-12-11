import { useState } from 'react';

import { data } from '../data';

import Form from './components/Form';
import List from './components/List';

const LowerStateChallenge = () => {
  const [people, setPeople] = useState(data);

  const addPerson = (name) => {
    const fakeId = Date.now();
    const newPerson = { id: fakeId, name };

    setPeople([...people, newPerson]);
  };

  return (
    <div className="section">
      <h1>Lower State : Challenge</h1>
      <section>
        <Form addPerson={addPerson} />
        <List people={people} />
      </section>
    </div>
  );
};

export default LowerStateChallenge;
