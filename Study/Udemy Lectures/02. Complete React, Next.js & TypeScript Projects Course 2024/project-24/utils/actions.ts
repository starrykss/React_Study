'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { currentUser } from '@clerk/nextjs/server';
import { auth } from '@clerk/nextjs/server';

import { Cart } from '@prisma/client';

import db from '@/utils/db';

import {
  imageSchema,
  productSchema,
  reviewSchema,
  validateWithZodSchema,
} from './schemas';
import { deleteImage, uploadImage } from './supabase';

// 인증된 사용자 정보 가져오기
const getAuthUser = async () => {
  const user = await currentUser();

  // 인증된 사용자 정보가 없을 경우
  if (!user) {
    redirect('/'); // 홈 화면으로 이동
  }

  return user;
};

// 관리자 계정 정보 가져오기
const getAdminUser = async () => {
  const user = await getAuthUser();

  // 관리자 계정이 아닐 경우, 홈 화면으로 이동
  if (user.id !== process.env.ADMIN_USER_ID) {
    redirect('/');
  }

  return user;
};

// 에러 표시하기
const renderError = (error: unknown): { message: string } => {
  console.log(error);

  return {
    message: error instanceof Error ? error.message : '⚠️ An error occurred.',
  };
};

// 특정 상품 정보 가져오기
export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
  });

  return products;
};

// 모든 상품 정보 가져오기
export const fetchAllProducts = ({ search = '' }: { search: string }) => {
  return db.product.findMany({
    where: {
      OR: [
        // 여러 조건 중 하나라도 만족하면 해당 상품 가져오기
        { name: { contains: search, mode: 'insensitive' } }, // insensitive: 대소문자 구분하지 않음.
        { company: { contains: search, mode: 'insensitive' } },
      ],
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

// 1개의 상품 정보 가져오기
export const fetchSingleProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  // 상품 정보가 없을 경우, /products 페이지로 이동
  if (!product) {
    redirect('/products');
  }

  return product;
};

// 새로운 상품 추가하기
export const createProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);
    const file = formData.get('image') as File;
    const validatedFields = validateWithZodSchema(productSchema, rawData);
    const validatedFile = validateWithZodSchema(imageSchema, { image: file });
    const fullPath = await uploadImage(validatedFile.image);

    // DB에 새로운 데이터 추가
    await db.product.create({
      data: {
        ...validatedFields,
        image: fullPath,
        clerkId: user.id,
      },
    });

    /*
      // Zod 라이브러리를 사용하지 않을 경우
      const name = formData.get('name') as string;
      const company = formData.get('company') as string;
      const price = Number(formData.get('price') as string);

      const image = formData.get('image') as File; // File 타입
      const description = formData.get('description') as string;
      const featured = Boolean(formData.get('featured') as string);

      // DB에 새로운 데이터 추가
      await db.product.create({
        data: {
          name,
          company,
          price,
          image: '/images/product-1.jpg',
          description,
          featured,
          clerkId: user.id,
        },
      });
    */
  } catch (error) {
    return renderError(error);
  }

  // 상품 관리 페이지로 이동
  redirect('/admin/products');
};

// 관리자 상품 정보 가져오기
export const fetchAdminProducts = async () => {
  await getAdminUser();

  const products = await db.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return products;
};

// 상품 삭제하기
export const deleteProductAction = async (prevState: { productId: string }) => {
  const { productId } = prevState;

  await getAdminUser();

  try {
    const product = await db.product.delete({
      where: {
        id: productId,
      },
    });

    // Supbase Bucket에 있는 이미지 제거
    await deleteImage(product.image);

    revalidatePath('/admin/products'); // 페이지나 경로의 캐시된 데이터 다시 불러오기 (최신 데이터 반영)
    return { message: '✅ Product removed.' };
  } catch (error) {
    return renderError(error);
  }
};

// 세부 상품 정보 가져오기 (관리자)
export const fetchAdminProductDetails = async (productId: string) => {
  await getAdminUser();

  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  // 상품 정보가 없을 경우
  if (!product) {
    redirect('/admin/products');
  }

  return product;
};

// 상품 정보 업데이트하기
export const updateProductAction = async (
  prevState: any,
  formData: FormData
) => {
  await getAdminUser();

  try {
    const productId = formData.get('id') as string;
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(productSchema, rawData);

    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        ...validatedFields,
      },
    });
    revalidatePath(`/admin/products/${productId}/edit`);

    return { message: '✅ Product updated successfully.' };
  } catch (error) {
    return renderError(error);
  }
};

// 상품 정보 업데이트하기 (이미지)
export const updateProductImageAction = async (
  prevState: any,
  formData: FormData
) => {
  await getAuthUser();

  try {
    const image = formData.get('image') as File;
    const productId = formData.get('id') as string;
    const oldImageUrl = formData.get('url') as string;

    const validatedFile = validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedFile.image);

    // Supabase에 있는 기존 이미지 삭제
    await deleteImage(oldImageUrl);

    // DB 내용 업데이트
    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        image: fullPath,
      },
    });

    revalidatePath(`/admin/products/${productId}/edit`);

    return { message: '✅ Product Image updated successfully.' };
  } catch (error) {
    return renderError(error);
  }
};

//
// 즐겨찾기(북마크) 관련
//

// 즐겨찾기 ID 가져오기
export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
  const user = await getAuthUser();

  const favorite = await db.favorite.findFirst({
    where: {
      productId,
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  });

  return favorite?.id || null;
};

// 즐겨찾기 버튼 토글
export const toggleFavoriteAction = async (prevState: {
  productId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const user = await getAuthUser();
  const { productId, favoriteId, pathname } = prevState;

  try {
    if (favoriteId) {
      // 즐겨찾기 삭제
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      // 즐겨찾기 추가
      await db.favorite.create({
        data: {
          productId,
          clerkId: user.id,
        },
      });
    }

    revalidatePath(pathname);

    return {
      message: favoriteId
        ? '✅ Removed from Favorites.'
        : '✅ Added to Favorites.',
    };
  } catch (error) {
    return renderError(error);
  }
};

//
// 리뷰, 평점 관련
//

// 상품 평점 정보 가져오기
export const fetchProductRating = async (productId: string) => {
  const result = await db.review.groupBy({
    by: ['productId'],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      productId,
    },
  });

  // 리뷰가 없으면 빈 객체 반환하기
  return {
    rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
    count: result[0]?._count.rating ?? 0,
  };
};

// 사용자 별 즐겨찾기 상품 목록 가져오기
export const fetchUserFavorites = async () => {
  const user = await getAuthUser();
  const favorites = await db.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  });

  return favorites;
};

// 리뷰 생성하기
export const createReviewAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const user = await getAuthUser();

    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(reviewSchema, rawData);

    await db.review.create({
      data: {
        ...validatedFields,
        clerkId: user.id,
      },
    });

    revalidatePath(`/products/${validatedFields.productId}`);

    return { message: '✅ Review submitted successfully!' };
  } catch (error) {
    return renderError(error);
  }
};

// 상품 리뷰 데이터 가져오기
export const fetchProductReviews = async (productId: string) => {
  const reviews = await db.review.findMany({
    where: {
      productId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return reviews;
};

// 사용자 별 상품 리뷰 데이터 가져오기
export const fetchProductReviewsByUser = async () => {
  const user = await getAuthUser();
  const reviews = await db.review.findMany({
    where: {
      clerkId: user.id,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      product: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });

  return reviews;
};

// 리뷰 삭제하기
export const deleteReviewAction = async (prevState: { reviewId: string }) => {
  const { reviewId } = prevState;
  const user = await getAuthUser();

  try {
    await db.review.delete({
      where: {
        id: reviewId,
        clerkId: user.id,
      },
    });

    revalidatePath('/reviews');
    return { message: '✅ Review deleted successfully!' };
  } catch (error) {
    return renderError(error);
  }
};

// 리뷰 찾기
export const findExistingReview = async (userId: string, productId: string) => {
  return db.review.findFirst({
    where: {
      clerkId: userId,
      productId,
    },
  });
};

//
// 장바구니 관련
//

// include 하여 가져오는 정보 (cartItems 테이블 + product 테이블)
const includeProductClause = {
  cartItems: {
    include: {
      product: true,
    },
  },
};

// 장바구니 아이템 개수 가져오기
export const fetchCartItems = async () => {
  const { userId } = await auth();

  const cart = await db.cart.findFirst({
    where: {
      clerkId: userId ?? '',
    },
    select: {
      numItemsInCart: true,
    },
  });

  return cart?.numItemsInCart || 0;
};

// 상품 정보 가져오기
const fetchProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  // 발견된 상품이 없을 경우
  if (!product) {
    throw new Error('⚠️ Product not found.');
  }

  return product;
};

// 장바구니 정보 불러오기 또는 새로운 장바구니 생성하기
export const fetchOrCreateCart = async ({
  userId,
  errorOnFailure = false,
}: {
  userId: string;
  errorOnFailure?: boolean;
}) => {
  let cart = await db.cart.findFirst({
    where: {
      clerkId: userId,
    },
    include: includeProductClause,
  });

  // 에러가 발생할 경우
  if (!cart && errorOnFailure) {
    throw new Error('⚠️ Cart not found.');
  }

  // 장바구니가 없을 경우, 새로운 장바구니 생성
  if (!cart) {
    cart = await db.cart.create({
      data: {
        clerkId: userId,
      },
      include: includeProductClause,
    });
  }

  return cart;
};

// 장바구니 아이템 불러오기 또는 생성하기
const updateOrCreateCartItem = async ({
  productId,
  cartId,
  amount,
}: {
  productId: string;
  cartId: string;
  amount: number;
}) => {
  let cartItem = await db.cartItem.findFirst({
    where: {
      productId,
      cartId,
    },
  });

  if (cartItem) {
    // 장바구니 아이템이 DB에 있을 경우 내용 업데이트
    cartItem = await db.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        amount: cartItem.amount + amount, // 기존의 수량에서 추가
      },
    });
  } else {
    // 장바구니 아이템이 DB에 없을 경우 새로 추가
    cartItem = await db.cartItem.create({
      data: { amount, productId, cartId },
    });
  }
};

// 장바구니 정보 업데이트하기
export const updateCart = async (cart: Cart) => {
  const cartItems = await db.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  let numItemsInCart = 0; // 총 상품 개수
  let cartTotal = 0; // 총 상품 가격

  for (const item of cartItems) {
    numItemsInCart += item.amount;
    cartTotal += item.amount * item.product.price;
  }

  const tax = cart.taxRate * cartTotal; // 세금
  const shipping = cartTotal ? cart.shipping : 0; // 배송비
  const orderTotal = cartTotal + tax + shipping; // 전체 비용

  // 장바구니 업데이트하기
  const currentCart = await db.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      numItemsInCart,
      cartTotal,
      tax,
      orderTotal,
    },
    include: includeProductClause,
  });

  return { cartItems, currentCart };
};

// 장바구니에 상품 추가하기
export const addToCartAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();

  try {
    const productId = formData.get('productId') as string;
    const amount = Number(formData.get('amount'));

    // 1. DB에 (장바구니에 넣을) 상품 정보가 있는지 확인
    await fetchProduct(productId);

    // 2. 장바구니 정보 가져오기 (장바구니 정보가 없을 경우, 새로운 장바구니 정보 생성)
    const cart = await fetchOrCreateCart({ userId: user.id });

    // 3. 장바구니 상품 정보 업데이트 하기 (장바구니 상품 정보가 없을 경우 새로운 상품 정보 생성)
    await updateOrCreateCartItem({ productId, cartId: cart.id, amount });

    // 4. 장바구니 업데이트하기
    await updateCart(cart);

    // return { message: '✅ Product added to the cart.' };
  } catch (error) {
    return renderError(error);
  }

  // 5. 장바구니 페이지로 이동
  redirect('/cart');
};

// 장바구니 상품 삭제하기
export const removeCartItemAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser();

  try {
    const cartItemId = formData.get('id') as string;
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });

    await db.cartItem.delete({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
    });

    // 장바구니 업데이트하기
    await updateCart(cart);

    revalidatePath('/cart');

    return { message: '✅ Item removed from cart.' };
  } catch (error) {
    return renderError(error);
  }
};

// 장바구니 상품 정보 업데이트하기
export const updateCartItemAction = async ({
  amount,
  cartItemId,
}: {
  amount: number;
  cartItemId: string;
}) => {
  const user = await getAuthUser();

  try {
    // 장바구니 정보 불러오기
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });

    // 장바구니 상품 정보 업데이트하기
    await db.cartItem.update({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
      data: {
        amount,
      },
    });

    // 장바구니 업데이트하기
    await updateCart(cart);

    revalidatePath('/cart');

    return { message: '✅ Cart updated!' };
  } catch (error) {
    return renderError(error);
  }
};

//
// 주문 관련
//

// 주문 생성하기
export const createOrderAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();

  let orderId: null | string = null;
  let cartId: null | string = null;

  try {
    // 장바구니 정보 가져오기
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });

    cartId = cart.id;

    // 주문 정보 삭제하기
    await db.order.deleteMany({
      where: {
        clerkId: user.id,
        isPaid: false,
      },
    });

    // 주문 정보 생성하기
    const order = await db.order.create({
      data: {
        clerkId: user.id,
        products: cart.numItemsInCart,
        orderTotal: cart.orderTotal,
        tax: cart.tax,
        shipping: cart.shipping,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    orderId = order.id;

    // 장바구니 제거하기
    // await db.cart.delete({
    //   where: {
    //     id: cart.id,
    //   },
    // });
  } catch (error) {
    return renderError(error);
  }

  // 주문 페이지로 이동하기
  // redirect('/orders');

  // 결제 페이지로 이동하기
  redirect(`/checkout?orderId=${orderId}&cartId=${cartId}`);
};

// 사용자 별 주문 정보 가져오기
export const fetchUserOrders = async () => {
  const user = await getAuthUser();

  const orders = await db.order.findMany({
    where: {
      clerkId: user.id,
      isPaid: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return orders;
};

// 관리자가 확인할 수 있는 주문 정보 가져오기
export const fetchAdminOrders = async () => {
  const user = await getAdminUser();

  const orders = await db.order.findMany({
    where: {
      isPaid: true, // 결제된 상품들만
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return orders;
};
