import { FaStar, FaRegStar } from 'react-icons/fa';

const Rating = ({ rating }: { rating: number }) => {
  // 예) rating = 2
  // 1 <= 2 : true
  // 2 <= 2 : true
  // 3 <= 2 : false
  // ...
  const stars = Array.from({ length: 5 }, (_, i) => i + 1 <= rating);

  return (
    <div className='flex items-center gap-x-1'>
      {stars.map((isFilled, index) => {
        const className = `w-3 h-3 ${
          isFilled ? 'text-primary' : 'text-gray-400'
        }`;
        return isFilled ? (
          <FaStar className={className} key={index} />
        ) : (
          <FaRegStar className={className} key={index} />
        );
      })}
    </div>
  );
};

export default Rating;
