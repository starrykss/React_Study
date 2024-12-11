import { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

import { reviews } from './data';
import { people } from '../../project-03/data';

const App = () => {
  const [index, setIndex] = useState(0);

  const { name, job, image, text } = reviews[index];

  const checkNumber = (number) => {
    if (number > people.length - 1) {
      return 0;
    }

    if (number < 0) {
      return people.length - 1;
    }

    return number;
  };

  const nextPerson = () => {
    setIndex((currentIndex) => (currentIndex + 1) % reviews.length);
  };
  const prevPerson = () => {
    setIndex((currentIndex) => (currentIndex - 1) % reviews.length);
  };

  const randomPerson = () => {
    let randomNumber = Math.floor(Math.random() * people.length);

    console.log(randomNumber);

    if (randomNumber === index) {
      randomNumber = index + 1;
    }

    setIndex(checkNumber(randomNumber));
  };

  return (
    <main>
      <article className="review">
        <div className="img-container">
          <img src={image} alt={name} className="person-img" />
          <span className="quote-icon">
            <FaQuoteRight />
          </span>
        </div>
        <h4></h4>
        <p className="author">{name}</p>
        <p className="job">{job}</p>
        <p className="info">{text}</p>
        <div className="btn-container">
          <button className="prev-btn" onClick={prevPerson}>
            <FaChevronLeft />
          </button>
          <button className="next-btn" onClick={nextPerson}>
            <FaChevronRight />
          </button>
        </div>
        <button className="btn btn-hipster" onClick={randomPerson}>
          Surprise Me
        </button>
      </article>
    </main>
  );
};
export default App;
