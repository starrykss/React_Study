import Title from '../Title';
import TourItem from './Tour';

import { tours } from '../../data';

const Tours = () => {
  return (
    <section className="section" id="tours">
      <Title title="featured" subTitle="tours" />
      <div className="section-center featured-center">
        {tours.map((tour) => (
          <TourItem
            key={tour.id}
            image={tour.image}
            date={tour.date}
            info={tour.info}
            location={tour.location}
            duration={tour.duration}
            cost={tour.cost}
          />
        ))}
      </div>
    </section>
  );
};

export default Tours;
