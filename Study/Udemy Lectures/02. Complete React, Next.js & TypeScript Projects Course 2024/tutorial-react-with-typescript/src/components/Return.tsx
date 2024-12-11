// 반환형을 JSX Element로 설정한다.
const ReturnComponent = (): JSX.Element | null | string => {
  // return null;
  // return 'hello';
  return (
    <div>
      <h2>Return Type</h2>
    </div>
  );
};

export default ReturnComponent;
