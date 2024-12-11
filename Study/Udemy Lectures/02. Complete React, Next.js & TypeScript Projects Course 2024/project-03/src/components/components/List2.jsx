import Person from './Person2';

import { memo } from 'react';

const List = ({ people }) => {
  return (
    <div>
      {people.map((person) => {
        return <Person key={person.id} {...person} />;
      })}
    </div>
  );
};

// 메모이제이션
export default memo(List);
