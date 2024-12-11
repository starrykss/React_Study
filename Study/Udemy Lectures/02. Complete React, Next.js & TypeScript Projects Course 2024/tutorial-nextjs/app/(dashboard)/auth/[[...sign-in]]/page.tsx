const SignInPage = ({ params }: { params: { 'sign-in': string[] } }) => {
  console.log(params); // { 'sign-in': [ 'sign-in', 'abc', 'def' ] }
  console.log(params['sign-in'][0]); // sign-in
  console.log(params['sign-in'][1]); // abc
  console.log(params['sign-in'][2]); // def

  return <div>SignInPage :{params['sign-in'][1]}</div>;
};
export default SignInPage;
