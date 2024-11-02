'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

const Comment = ({ comment }: { comment: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // 댓글 내용 토글 (펼치기/닫기)
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  const longComment = comment.length > 130;
  const displayComment =
    longComment && !isExpanded ? `${comment.slice(0, 130)}...` : comment; // 최대 130자까지 표현

  return (
    <div>
      <p className='text-sm'>{displayComment}</p>
      {longComment && (
        <Button
          variant='link'
          className='pl-0 text-muted-foreground'
          onClick={toggleExpanded}
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </Button>
      )}
    </div>
  );
};

export default Comment;
