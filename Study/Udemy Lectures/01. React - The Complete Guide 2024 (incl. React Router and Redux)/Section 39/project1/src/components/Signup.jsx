import { useActionState } from 'react';
import {
  isEmail,
  isNotEmpty,
  isEqualToOtherValue,
  hasMinLength,
} from '../util/validation';

export default function Signup() {
  // React 19 이상에서는 폼 제출 시, formData 객체가 생성되고 함수의 인자로 가져와 특정 필드의 입력값을 가져올 수 있다.
  // 또한, 브라우저의 기본 동작을 자동으로 방지하기 때문에 event.preventDefault() 코드를 따로 작성해주지 않아도 된다.
  // 그리고 폼 제출 시, 자동으로 필드의 값들이 초기화된다.
  function singupAction(prevFormState, formData) {
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');
    const firstName = formData.get('first-name');
    const lastName = formData.get('last-name');
    const role = formData.get('role');
    const terms = formData.get('terms');
    const acquisitionChannel = formData.getAll('acquisition'); // 동일한 name이 여러개 있을 경우

    // 유효성 검증
    let errors = [];

    if (!isEmail(email)) {
      errors.push('Invalid email address');
    }

    if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
      errors.push('You must provide a password with at least six characters.');
    }

    if (!isEqualToOtherValue(password, confirmPassword)) {
      errors.push('Passwords do not match.');
    }

    if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
      errors.push('Please provide both your first and last name.');
    }

    if (!isNotEmpty(role)) {
      errors.push('Please select a role.');
    }

    if (!terms) {
      errors.push('You must agree to the terms and conditions.');
    }

    if (acquisitionChannel.length === 0) {
      errors.push('Please select at least one acquisition channel.');
    }

    // 에러 표시
    if (errors.length > 0) {
      return {
        // 에러 문구가 담긴 배열
        errors,
        // 입력값
        enteredValues: {
          email,
          password,
          confirmPassword,
          firstName,
          lastName,
          role,
          acquisitionChannel,
          terms,
        },
      };
    }

    return { errors: null };
  }

  // useActionState 훅 사용
  const [formState, formAction] = useActionState(singupAction, {
    errors: null,
  });

  return (
    <form action={formAction}>
      {/* React 19 이상에서는 onSubmit이 아닌 action을 통해 폼 제출 이벤트 처리 함수를 전달한다. */}
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>
      <div className='control'>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          name='email'
          defaultValue={formState.enteredValues?.email}
        />
      </div>
      <div className='control-row'>
        <div className='control'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            defaultValue={formState.enteredValues?.password}
          />
        </div>

        <div className='control'>
          <label htmlFor='confirm-password'>Confirm Password</label>
          <input
            id='confirm-password'
            type='password'
            name='confirm-password'
            defaultValue={formState.enteredValues?.confirmPassword}
          />
        </div>
      </div>
      <hr />
      <div className='control-row'>
        <div className='control'>
          <label htmlFor='first-name'>First Name</label>
          <input
            type='text'
            id='first-name'
            name='first-name'
            defaultValue={formState.enteredValues?.firstName}
          />
        </div>

        <div className='control'>
          <label htmlFor='last-name'>Last Name</label>
          <input
            type='text'
            id='last-name'
            name='last-name'
            defaultValue={formState.enteredValues?.lastName}
          />
        </div>
      </div>
      <div className='control'>
        <label htmlFor='phone'>What best describes your role?</label>
        <select
          id='role'
          name='role'
          defaultValue={formState.enteredValues?.role}
        >
          <option value='student'>Student</option>
          <option value='teacher'>Teacher</option>
          <option value='employee'>Employee</option>
          <option value='founder'>Founder</option>
          <option value='other'>Other</option>
        </select>
      </div>
      <fieldset>
        <legend>How did you find us?</legend>
        <div className='control'>
          <input
            type='checkbox'
            id='google'
            name='acquisition'
            value='google'
            defaultChecked={formState.enteredValues?.acquisitionChannel.includes(
              'google'
            )}
          />
          <label htmlFor='google'>Google</label>
        </div>

        <div className='control'>
          <input
            type='checkbox'
            id='friend'
            name='acquisition'
            value='friend'
            defaultChecked={formState.enteredValues?.acquisitionChannel.includes(
              'friend'
            )}
          />
          <label htmlFor='friend'>Referred by friend</label>
        </div>

        <div className='control'>
          <input
            type='checkbox'
            id='other'
            name='acquisition'
            value='other'
            defaultChecked={formState.enteredValues?.acquisitionChannel.includes(
              'other'
            )}
          />
          <label htmlFor='other'>Other</label>
        </div>
      </fieldset>
      <div className='control'>
        <label htmlFor='terms-and-conditions'>
          <input
            type='checkbox'
            id='terms-and-conditions'
            name='terms'
            defaultChecked={formState.enteredValues?.terms}
          />
          I agree to the terms and conditions
        </label>
      </div>

      {/* 오류 메시지 표시 */}
      {formState.errors && (
        <ul className='errors'>
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <p className='form-actions'>
        <button type='reset' className='button button-flat'>
          Reset
        </button>
        <button className='button'>Sign up</button>
      </p>
    </form>
  );
}
