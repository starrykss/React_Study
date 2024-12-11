import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useGlobalContext } from '../contexts/context';

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`;

const Gallery = () => {
  const { searchTerm } = useGlobalContext();

  // searchTerm에 변화가 있을 때만 업데이트
  const response = useQuery({
    queryKey: ['images', searchTerm], // searchTerm이 변경될 때마다 새로운 값으로 업데이트된다.
    queryFn: async () => {
      const response = await axios.get(`${url}&query=${searchTerm}`);

      return response.data;
    },
  });

  if (response.isPending) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }

  if (response.isError) {
    return (
      <section className="image-container">
        <h4>There was an error...</h4>
      </section>
    );
  }

  const results = response.data.results;

  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>No results found...</h4>
      </section>
    );
  }

  return (
    <section className="image-container-wrapper">
      <div className="image-container">
        {results.map((item) => {
          const url = item?.urls?.regular;

          return (
            <img
              src={url}
              key={item.id}
              alt={item.alt_description}
              className="img"
            />
          );
        })}
      </div>
    </section>
  );
};

export default Gallery;
