import { useMemo } from 'react';

const slowFunction = () => {
  let value = 0;
  for (let i = 0; i <= 1000000000; i++) {
    value += i;
  }
  return value;
};

const UseMemoExample = ({ data }) => {
  // 의존성 배열 안의 data 값이 변화가 있을 때만 함수가 실행되어 값이 반환됨.
  const processedData = useMemo(() => {
    return data.map((item) => item.toUpperCase());
  }, [data]);

  const value = useMemo(() => slowFunction(), []);
  console.log(value);

  return (
    <div>
      {processedData.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
};

export default UseMemoExample;
