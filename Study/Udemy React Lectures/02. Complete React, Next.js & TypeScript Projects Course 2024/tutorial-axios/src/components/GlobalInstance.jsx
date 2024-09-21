import { useState, useEffect } from 'react';
import axios from 'axios';

const productsUrl = 'https://www.course-api.com/react-store-products';
const randomUserUrl = 'https://randomuser.me/api';

const GlobalInstance = () => {
  const [data, setData] = useState('');

  const fetchData = async () => {
    try {
      const resp1 = await axios(productsUrl);
      const resp2 = await axios(randomUserUrl);

      setData(JSON.stringify(resp1, null, 2));

      console.log(resp1);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-center">global instance</h2>
      <div className="content">{data.slice(0, 1500)}...</div>
    </div>
  );
};
export default GlobalInstance;
