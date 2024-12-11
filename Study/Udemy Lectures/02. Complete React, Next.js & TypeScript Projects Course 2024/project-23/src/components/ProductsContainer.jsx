import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { BsFillGridFill, BsList } from 'react-icons/bs';

import ProductsGrid from './ProductsGrid';
import ProductsList from './ProductsList';

const ProductsContainer = () => {
  const { meta } = useLoaderData();
  const [layout, setLayout] = useState('grid');

  const totalProducts = meta.pagination.total;

  // 활성화 중일 때 스타일 지정
  const setActiveStyles = (pattern) => {
    return `text-xl btn btn-circle btn-sm ${
      pattern === layout
        ? 'btn-primary text-primary-content'
        : 'btn-ghost text-base-content'
    }`;
  };

  return (
    <>
      {/* 헤더 */}
      <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
        <h4 className="font-medium text-md">
          {totalProducts} product{totalProducts > 1 && 's'}
        </h4>
        <div className="flex gap-x-2">
          <button
            onClick={() => setLayout('grid')}
            className={setActiveStyles('grid')}
          >
            <BsFillGridFill />
          </button>

          <button
            onClick={() => setLayout('list')}
            className={setActiveStyles('list')}
          >
            <BsList />
          </button>
        </div>
      </div>

      {/* 상품 목록 */}
      <div>
        {totalProducts === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, No products matched your search...
          </h5>
        ) : layout === 'grid' ? (
          <ProductsGrid />
        ) : (
          <ProductsList />
        )}
      </div>
    </>
  );
};

export default ProductsContainer;
