import { useState } from 'react';

import CardItem from './CardItem';

import { people as peopleData } from '../data';

const CardList = () => {
  const [people, setPeople] = useState(peopleData);
  const [birthdayCount, setBirthdayCount] = useState(peopleData.length);

  const clickHandler = () => {
    setPeople([]);
    setBirthdayCount(0);
  };

  // 인원수에 맞게 표시되는 내용 설정
  let title;
  if (birthdayCount > 1) {
    title = `${birthdayCount} Birthdays Today`;
  } else {
    title = `${birthdayCount} Birthday Today`;
  }

  return (
    <main>
      <section className="container">
        <h3>{title}</h3>
        {people.map((person) => (
          <CardItem
            key={person.id}
            image={person.image}
            name={person.name}
            age={person.age}
          />
        ))}
        <button type="button" className="btn btn-block" onClick={clickHandler}>
          Clear All
        </button>
      </section>
    </main>
  );
};

export default CardList;
