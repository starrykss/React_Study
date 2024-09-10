import { useState, useEffect } from 'react';

export const MultipleReturn = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return <h2>Multiple Returns Basics</h2>;
};

export default MultipleReturn;
