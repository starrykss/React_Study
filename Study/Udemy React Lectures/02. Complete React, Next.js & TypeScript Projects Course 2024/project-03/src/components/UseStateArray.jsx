import { useState } from 'react';

import { data } from '../../data';

const UseStateArray = () => {
  const [people, setPeople] = useState(data);

  const removeItem = (id) => {
    // const newPeople = people.filter((person) => person.id !== id);
    // setPeople(newPeople);

    setPeople(people.filter((person) => person.id !== id));
  };

  const clearAllItems = () => {
    setPeople([]);
  };

  return (
    <div className="section">
      <h1>UseState Array Example</h1>
      <div>
        {people.map((person) => {
          const { id, name } = person;
          // console.log(person);

          return (
            <div
              key={id}
              style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}
            >
              <h4>{name}</h4>{' '}
              <button
                type="button"
                className="btn"
                style={{ height: '100%' }}
                onClick={() => removeItem(id)}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        style={{ marginTop: '2rem' }}
        className="btn"
        onClick={clearAllItems}
      >
        Clear Items
      </button>
    </div>
  );
};

export default UseStateArray;
