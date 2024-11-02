import ProductsContainer from '@/components/products/ProductsContainer';

// searchParams 인자를 통해 파라미터 값을 가져올 수 있다.
const ProductsPage = ({
  searchParams,
}: {
  searchParams: { layout?: string; search?: string };
}) => {
  const layout = searchParams.layout || 'grid';
  const search = searchParams.search || '';

  return <ProductsContainer layout={layout} search={search} />;
};

export default ProductsPage;
