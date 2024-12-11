import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { loginUser, registerUser } from '../features/user/userSlice';

import Wrapper from '../assets/wrappers/RegisterPage';

import { Logo, FormRow } from '../components';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);

  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((store) => store.user);

  const navigate = useNavigate();

  // 로그인 되었을 경우, 3초 뒤에 초기 화면(/)으로 이동
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [user, navigate]);

  // 변경 이벤트 처리
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // console.log(`${name}: ${value}`);

    setValues({ ...values, [name]: value });
  };

  // 폼 제출 이벤트 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    // 유효성 검증 (모든 항목 입력되었는지 체크)
    if (!email || !password || (!isMember && !name)) {
      // console.log('Please Fill Out All Fields.');
      toast.error('Please Fill Out All Fields.');
      return;
    }

    // 이미 회원일 경우
    if (isMember) {
      // 로그인 진행
      dispatch(
        loginUser({
          email: email,
          password: password,
        })
      );
      return;
    }

    // 회원 가입 진행
    dispatch(registerUser({ name, email, password }));
  };

  // 회원 유형 변경 (토글)
  const toggleMember = () => {
    setValues({
      ...values,
      isMember: !values.isMember,
    });
  };

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>

        {/* NAME */}
        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* EMAIL */}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />

        {/* PASSWORD */}
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />

        {/* SUBMIT */}
        <button type='submit' className='btn btn-block' disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>

        {/* TEST USER LOGIN */}
        <button
          type='button'
          className='btn btn-block btn-hipster'
          disabled={isLoading}
          onClick={() => {
            // 테스트 계정으로 로그인
            dispatch(
              loginUser({
                email: 'testUser@test.com',
                password: 'secret',
              })
            );
          }}
        >
          {isLoading ? 'Loading...' : 'Demo'}
        </button>

        {/* REGISTER / LOGIN */}
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
