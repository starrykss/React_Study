import { useLoaderData } from 'react-router-dom';
import axios from 'axios';

import CocktailList from './CocktailList';
import SearchForm from '../components/SearchForm';

const cocktailSearchUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

// loader는 항상 무언가를 return 해야 한다.
export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('search') || ''; // URL의 Param 값 가져오기
  const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);

  const drinks = response?.data?.drinks;

  return { drinks, searchTerm };
};

const Landing = () => {
  const { drinks, searchTerm } = useLoaderData();
  console.log(drinks);

  return (
    <>
      <SearchForm />
      <CocktailList drinks={drinks} />
    </>
  );
};

export default Landing;
