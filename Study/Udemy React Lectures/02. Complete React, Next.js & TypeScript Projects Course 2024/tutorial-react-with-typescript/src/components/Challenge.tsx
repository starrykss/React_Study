// 타입 정의
type BasicProfileCardProps = {
  type: 'basic';
  name: string;
};
type AdvancedProfileCardProps = {
  type: 'advanced';
  name: string;
  email?: string;
};

type ProfileCardProps = BasicProfileCardProps | AdvancedProfileCardProps;

const ChallengeComponent = (props: ProfileCardProps) => {
  // 구조 분해 할당해서 prop 값 가져오기
  const { type, name } = props;

  if (type === 'basic') {
    return (
      <article className="alert alert-success">
        <h2>User : {name}</h2>
      </article>
    );
  }

  const { email } = props;

  return (
    <article className="alert alert-danger">
      <h2>User : {name}</h2>
      <h2>Email : {email}</h2>
    </article>
  );
};

export default ChallengeComponent;
