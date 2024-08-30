import { useEffect, useState } from 'react';

const MultipleReturnsBasics = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      // done fetching data
      setIsLoading(false);
    }, 5000);
  }, []);

  // 출력 1
  return (
    <div className="section">
      <h1>Multiple Returns Basics</h1>
      {isLoading && <h2>Loading...</h2>} {/* 출력 2 */}
      <p>
        <span>"5초 뒤에 'Loading...' 요소가 사라진다."</span>
      </p>
    </div>
  );
};
export default MultipleReturnsBasics;
