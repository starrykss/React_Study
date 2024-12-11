import { cn } from '@/lib/utils';

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  // cn() 함수는 클래스들을 동적으로 합쳐(merge)준다.
  // shadcn/ui 패키지를 설치하면 /lib/utils.ts 파일이 생성되는데, 이 파일 안에 cn() 함수가 구현되어 있다.
  return (
    <div className={cn('mx-auto max-w-6xl xl: max-w-7xl px-8', className)}>
      {children}
    </div>
  );
};

export default Container;
