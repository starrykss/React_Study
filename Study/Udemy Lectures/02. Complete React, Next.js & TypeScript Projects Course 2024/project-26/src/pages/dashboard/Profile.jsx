import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Wrapper from '../../assets/wrappers/DashboardFormPage';

import { FormRow } from '../../components';
import { updateUser } from '../../features/user/userSlice';

const Profile = () => {
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || '',
  });

  // 폼 제출 이벤트 처리
  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, lastName, location } = userData;

    if (!name || !email || !lastName || !location) {
      toast.error('Please Fill Out All Fields!');
      return;
    }

    // API 통신
    dispatch(updateUser({ name, email, lastName, location }));
  };

  // 폼 <input> 요소 내용 변경 이벤트 처리
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Profile</h3>
        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            value={userData.name}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            labelText='last name'
            name='lastName'
            value={userData.lastName}
            handleChange={handleChange}
          />
          <FormRow
            type='email'
            name='email'
            value={userData.email}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='location'
            value={userData.location}
            handleChange={handleChange}
          />
          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
