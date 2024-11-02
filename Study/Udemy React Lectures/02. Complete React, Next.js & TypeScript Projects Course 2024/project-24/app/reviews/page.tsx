import { deleteReviewAction, fetchProductReviewsByUser } from '@/utils/actions';

import ReviewCard from '@/components/reviews/ReviewCard';
import SectionTitle from '@/components/global/SectionTitle';
import FormContainer from '@/components/form/FormContainer';
import { IconButton } from '@/components/form/Buttons';

const ReviewsPage = async () => {
  // 사용자별 작성 리뷰 정보 가져오기
  const reviews = await fetchProductReviewsByUser();

  // 리뷰가 없을 경우
  if (reviews.length === 0) {
    return <SectionTitle text='You have no reviews yet.' />;
  }

  return (
    <>
      <SectionTitle text='Your Reviews' />
      <section className='grid md:grid-cols-3 gap-8 mt-4'>
        {reviews.map((review) => {
          const { comment, rating } = review;
          const { name, image } = review.product;
          const reviewInfo = {
            comment,
            rating,
            name,
            image,
          };

          return (
            <ReviewCard key={review.id} reviewInfo={reviewInfo}>
              {/* 리뷰 삭제 버튼 */}
              <DeleteReview reviewId={review.id} />
            </ReviewCard>
          );
        })}
      </section>
    </>
  );
};

// 리뷰 삭제
const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  const deleteReview = deleteReviewAction.bind(null, { reviewId });

  return (
    <FormContainer action={deleteReview}>
      <IconButton actionType='delete' />
    </FormContainer>
  );
};

export default ReviewsPage;
