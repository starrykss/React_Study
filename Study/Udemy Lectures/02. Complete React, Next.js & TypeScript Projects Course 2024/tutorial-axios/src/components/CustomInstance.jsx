import { useState, useEffect } from 'react';

import authFetch from '../axios/custom'; // Custom Instance
import axios from 'axios';

const randomUserUrl = 'https://randomuser.me/api';

const CustomInstance = () => {
  const [data, setData] = useState('');

  const fetchData = async () => {
    try {
      const resp1 = await authFetch('/react-store-products');
      console.log(resp1);
      const resp2 = await axios(randomUserUrl);
      console.log(resp2);

      setData(JSON.stringify(resp2.data, null, 2));
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-center">custom instance</h2>
      <div className="content">{data}</div>
    </div>
  );
};
export default CustomInstance;
