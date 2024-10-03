import axios from 'axios';

const productionUrl = 'https://strapi-store-server.onrender.com/api';

// Axios 페치 기본 동작
export const customFetch = axios.create({
  baseURL: productionUrl,
});

// 가격에 $ 붙이기
export const formatPrice = (price) => {
  const dollarsAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format((price / 100).toFixed(2)); // 소수점 2자리 고정

  return dollarsAmount;
};

// 옵션 개수 지정하기
export const generateAmountOptions = (number) => {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;

    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};
