import { useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

import { formatPrice, customFetch, generateAmountOptions } from '../utils';

const singleProductQuery = (id) => {
  return {
    queryKey: ['singleProduct', id],
    queryFn: () => customFetch.get(`/products/${id}`),
  };
};

// 로더 정의
// - params 인자를 통해 URL의 param 값을 가져올 수 있다.
// - 1개의 상품 정보 가져오기
export const loader =
  (queryClient) =>
  async ({ params }) => {
    const response = await queryClient.ensureQueryData(
      singleProductQuery(params.id)
    );

    return { product: response.data.data };
  };

const SingleProduct = () => {
  // 로더에서 데이터 가져오기
  const { product } = useLoaderData();

  const { image, title, price, description, colors, company } =
    product.attributes;

  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const dollarsAmount = formatPrice(price);

  // 수량 상태 변경
  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const cartProduct = {
    cartID: product.id + productColor,
    productID: product.id,
    image,
    title,
    price,
    amount,
    productColor,
    company,
  };

  const dispatch = useDispatch();

  // 장바구니 추가
  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      {/* 상품 아이템 */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2  lg:gap-x-16">
        {/* 이미지 */}
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full  "
        />

        {/* 상품 정보 */}
        <div>
          <h1 className="uppercase text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>

          {/* 상품 가격 */}
          <p className="mt-3 text-xl">{dollarsAmount}</p>

          {/* 상품 설명 */}
          <p className="mt-6 leading-8">{description}</p>

          {/* 상품 색상 */}
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider uppercase">
              colors
            </h4>
            <div className="mt-2">
              {colors.map((color) => {
                return (
                  <button
                    key={color}
                    type="button"
                    className={`badge  w-6 h-6 mr-2  ${
                      color === productColor && 'border-2 border-secondary'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setProductColor(color)}
                  ></button>
                );
              })}
            </div>
          </div>

          {/* 상품 수량 */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <h4 className="text-md font-medium tracking-wider uppercase">
                amount
              </h4>
            </label>
            <select
              className="select select-secondary select-bordered select-md"
              value={amount}
              onChange={handleAmount}
            >
              {generateAmountOptions(10)}
            </select>
          </div>

          {/* 장바구니 추가 버튼 */}
          <div className="mt-10 ">
            <button
              className="btn btn-secondary btn-md uppercase"
              onClick={addToCart}
            >
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
