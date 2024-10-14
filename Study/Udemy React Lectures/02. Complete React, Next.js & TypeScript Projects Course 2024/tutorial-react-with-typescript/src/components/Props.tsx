// 방법 1
// const PropsComponent = ({ name, id }: { name: string; id: number }) => {
//   return (
//     <div>
//       <h1>Name: {name}</h1>
//       <h1>ID : {id}</h1>
//     </div>
//   );
// };
// export default PropsComponent;

// 방법 2
// - 다음과 같이 children을 포함한 타입을 정의 할 수 있다.

//// <Way1>
// type ComponentProps = {
//   name: string;
//   id: number;
//   children?: React.ReactNode; // children 타입 정의 (있을 경우)
// };

//// <Way2>
import { type PropsWithChildren } from 'react';

type ComponentProps = PropsWithChildren<{
  name: string;
  id: number;
}>;

const PropsComponent = ({ name, id, children }: ComponentProps) => {
  return (
    <div>
      <h1>Name: {name}</h1>
      <h1>ID : {id}</h1>
      {children}
    </div>
  );
};
export default PropsComponent;
