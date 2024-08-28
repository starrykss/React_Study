import Title from '../Title';
import Service from './Service';

import { services } from '../../data';

const Services = () => {
  return (
    <section className="section services" id="services">
      <Title title="our" subTitle="services" />
      <div class="section-center services-center">
        {services.map((service) => (
          <Service
            key={service.id}
            icon={service.icon}
            title={service.title}
            text={service.text}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
