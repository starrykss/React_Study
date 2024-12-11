import Link from 'next/link';

import { deleteProductAction, fetchAdminProducts } from '@/utils/actions';
import { formatCurrency } from '@/utils/format';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import EmptyList from '@/components/global/EmptyList';
import { IconButton } from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';

const AdminProductsPage = async () => {
  const items = await fetchAdminProducts();

  // 아이템이 없을 경우 빈 리스트 보여주기
  if (items.length === 0) {
    return <EmptyList />;
  }

  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>My Products</h1>
      <Table>
        <TableCaption className='capitalize'>
          Total Products : {items.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const { id: productId, name, company, price } = item;

            return (
              <TableRow key={productId}>
                <TableCell>
                  <Link
                    href={`/products/${productId}`}
                    className='underline text-muted-foreground tracking-wide capitalize'
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{company}</TableCell>
                <TableCell>{formatCurrency(price)}</TableCell>

                <TableCell className='flex items-center gap-x-2'>
                  <Link href={`/admin/products/${productId}/edit`}>
                    <IconButton actionType='edit' />
                  </Link>
                  <DeleteProduct productId={productId} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
};

// 상품 삭제 버튼
const DeleteProduct = ({ productId }: { productId: string }) => {
  const deleteProduct = deleteProductAction.bind(null, { productId });

  return (
    <FormContainer action={deleteProduct}>
      <IconButton actionType='delete' />
    </FormContainer>
  );
};

export default AdminProductsPage;
