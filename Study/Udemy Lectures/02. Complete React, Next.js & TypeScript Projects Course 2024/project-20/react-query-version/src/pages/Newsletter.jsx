import { Form, redirect, useNavigation } from 'react-router-dom';
import axios from 'axios';
axios;
import { toast } from 'react-toastify';

const newsletterUrl = 'https://www.course-api.com/cocktails-newsletter';

// 액션 정의
export const action = async ({ request }) => {
  const formData = await request.formData();

  const data = Object.fromEntries(formData); // 키-값 쌍의 배열을 객체로 변환
  // data는 { name: "John", age: "30" } 형태의 객체가 된다.
  // -> 키 값은 input 요소의 name 속성을 통해 가져온다.
  // console.log(data);

  try {
    const response = await axios.post(newsletterUrl, data);
    console.log(response);
    toast.success(response.data.msg);

    // redirect는 action과 loader를 위해 사용된다.
    return redirect('/');
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);

    return error;
  }
};

const Newsletter = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form className="form" method="post">
      <h4 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        our newsletter
      </h4>
      {/* name */}
      <div className="form-row">
        <label htmlFor="name" className="form-label">
          name
        </label>
        <input
          type="text"
          className="form-input"
          name="name"
          id="name"
          placeholder="John"
          required
        />
      </div>
      {/* last name */}
      <div className="form-row">
        <label htmlFor="lastName" className="form-label">
          last name
        </label>
        <input
          type="text"
          className="form-input"
          name="lastName"
          id="lastName"
          placeholder="Doe"
          required
        />
      </div>
      {/* email */}
      <div className="form-row">
        <label htmlFor="email" className="form-label">
          email
        </label>
        <input
          type="email"
          className="form-input"
          name="email"
          id="email"
          placeholder="johndoe@example.com"
          defaultValue="test@test.com"
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-block"
        style={{ marginTop: '0.5rem' }}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'submitting' : 'submit'}
      </button>
    </Form>
  );
};

export default Newsletter;
