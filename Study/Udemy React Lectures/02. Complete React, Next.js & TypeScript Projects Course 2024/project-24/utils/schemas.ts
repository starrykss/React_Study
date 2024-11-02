import { z, ZodSchema } from 'zod';

// 스키마 정의
export const productSchema = z.object({
  name: z
    .string()
    .min(
      2, // 최소 2글자
      {
        message: '⚠️ Name must be at least 2 characters.',
      }
    )
    .max(
      100, // 최대 100글자
      {
        message: '⚠️ Name must be less than 100 characters.',
      }
    ),
  company: z.string(),
  featured: z.coerce.boolean(),
  price: z.coerce.number().int().min(
    0, // 최솟값 0
    {
      message: '⚠️ Price must be a positive number.',
    }
  ),
  description: z.string().refine(
    (description) => {
      // 단어수 세기
      const wordCount = description.split(' ').length;

      // 10개 이상, 1000개 이하
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: '⚠️ Description must be between 10 and 1000 words.',
    }
  ),
});

// Zod 스키마를 이용하여 유효성 검증하기
export const validateWithZodSchema = <T>(
  schema: ZodSchema<T>,
  data: unknown
): T => {
  const result = schema.safeParse(data);

  // 에러 처리
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);

    throw new Error(errors.join(','));
  }

  return result.data;
};

// 이미지 스키마 정의
const validateImageFile = () => {
  const maxUploadSize = 1024 * 1024;
  const acceptedFileTypes = ['image/'];

  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, '⚠️ File size must be less than 1MB.')
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, '⚠️ File must be an image.');
};

export const imageSchema = z.object({
  image: validateImageFile(),
});

// 리뷰 스키마 정의
export const reviewSchema = z.object({
  productId: z.string().refine((value) => value !== '', {
    message: '⚠️ Product ID cannot be empty.',
  }),
  authorName: z.string().refine((value) => value !== '', {
    message: '⚠️ Author name cannot be empty.',
  }),
  authorImageUrl: z.string().refine((value) => value !== '', {
    message: '⚠️ Author image URL cannot be empty.',
  }),
  rating: z.coerce
    .number()
    .int()
    .min(1, { message: '⚠️ Rating must be at least 1.' })
    .max(5, { message: '⚠️ Rating must be at most 5.' }),
  comment: z
    .string()
    .min(10, { message: '⚠️ Comment must be at least 10 characters long.' })
    .max(1000, { message: '⚠️ Comment must be at most 1000 characters long.' }),
});
