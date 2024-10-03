import { Form, Link, useNavigate, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { customFetch } from '../utils';

import { loginUser } from '../features/user/userSlice';

import { FormInput, SubmitBtn } from '../components';

// 액션 정의
export const action =
  (store) =>
  async ({ request }) => {
    // <Form> 데이터 가져오기
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      // 로그인 데이터와 함꼐 API 요청
      const response = await customFetch.post('/auth/local', data);

      // 액션 디스패치
      store.dispatch(loginUser(response.data));

      toast.success('Logged in successfully!');

      // 홈 화면으로 리다이렉션
      return redirect('/');
    } catch (error) {
      // console.log(error);

      const errorMessage =
        `${error?.response?.data?.error?.message}.` ||
        'Please double check your credentials.';

      toast.error(errorMessage);

      return null;
    }
  };

const Login = () => {
  // 테스트 계정으로 로그인
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async () => {
    try {
      const response = await customFetch.post('/auth/local', {
        identifier: 'test@test.com',
        password: 'secret',
      });

      // 액션 디스페치
      dispatch(loginUser(response.data));

      toast.success('Welcome guest user!');

      // 홈 화면으로 이동
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Guest user login error, please try again.');
    }
  };

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput type="email" label="email" name="identifier" />
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="Login" />
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-block uppercase"
          onClick={loginAsGuestUser}
        >
          Guest User
        </button>
        <p className="text-center">
          Not a member yet?{' '}
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            regsiter
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
