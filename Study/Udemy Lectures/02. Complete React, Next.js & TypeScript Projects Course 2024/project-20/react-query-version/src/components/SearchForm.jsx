import { Form, useNavigation } from 'react-router-dom';

import Wrapper from '../assets/wrappers/SearchForm';

const SearchForm = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      {/* input의 type을 search로 할 경우, 폼 제출 시 URL에 search=value가 추가된다. */}
      <Form className="form">
        <input
          type="search"
          name="search"
          className="form-input"
          placeholder="cocktail"
        />
        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? 'searching...' : 'search'}
        </button>
      </Form>
    </Wrapper>
  );
};

export default SearchForm;
