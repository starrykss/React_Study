import {
  Filters,
  ComplexPaginationContainer,
  ProductsContainer,
} from '../components';

import { customFetch } from '../utils';

const url = '/products';

const allProductsQuery = (queryParams) => {
  const { search, category, company, sort, price, shipping, page } =
    queryParams;

  // ?? (Nullish 연산자)
  // - 왼쪽의 값이 null이나 undefined일 경우 오른쪽 값 선택
  // - 오른쪽의 값이 null이나 undefined일 경우 왼쪽 값 선택

  return {
    queryKey: [
      'products',
      search ?? '',
      category ?? 'all',
      company ?? 'all',
      sort ?? 'a-z',
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () =>
      customFetch(url, {
        params: queryParams,
      }),
  };
};

// 로더 정의
// - request 매개 변수를 이용하여 request 정보를 알 수 있다.
export const loader =
  (queryClient) =>
  async ({ request }) => {
    // [방법 1] search 파라미터 가져오기
    // const params = new URL(request.url).searchParams; // URL 객체 생성

    // [방법 2] search 파라미터 가져오기
    const params = Object.fromEntries([
      //  배열의 [key, value] 쌍을 객체로 변환
      ...new URL(request.url).searchParams.entries(), // [["search", "apple"], ["sort", "desc"]]
    ]);
    // -> [{ 'search' : 'apple' }, { 'sort' : 'desc' }]

    // const search = params.get('search');
    // console.log(search);

    const response = await queryClient.ensureQueryData(
      allProductsQuery(params)
    );

    const products = response.data.data;
    const meta = response.data.meta;

    return { products, meta, params };
  };

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <ComplexPaginationContainer />
    </>
  );
};

export default Products;
