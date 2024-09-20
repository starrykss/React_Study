import Person from './Person3';

import { memo } from 'react';

const List = ({ people, removePerson }) => {
  return (
    <div>
      {people.map((person) => {
        return (
          <Person
            key={person.id}
            {...person}
            removePerson={removePerson}
            id={person.id}
          />
        );
      })}
    </div>
  );
};

// 메모이제이션
export default memo(List);
