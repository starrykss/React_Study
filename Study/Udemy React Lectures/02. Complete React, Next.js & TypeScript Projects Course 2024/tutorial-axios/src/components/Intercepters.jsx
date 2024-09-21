import { useState, useEffect } from 'react';
import authFetch from '../axios/interceptors.js';

const url = 'https://www.course-api.com/react-store-products';

const Interceptors = () => {
  const [data, setData] = useState('');

  const fetchData = async () => {
    try {
      const resp = await authFetch('/react-store-products');
      console.log(resp);

      setData(JSON.stringify(resp.data, null, 2));
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-center">interceptors</h2>
      <div className="content">{data.slice(0, 1500)}...</div>
    </div>
  );
};

export default Interceptors;
