import { useQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';

import CocktailList from './CocktailList';
import SearchForm from '../components/SearchForm';
import Copyright from '../components/Copyright';

const cocktailSearchUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ['search', searchTerm || 'all'],
    queryFn: async () => {
      const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
      return response.data.drinks;
    },
  };
};

// loader는 항상 무언가를 return 해야 한다.
export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('search') || '';
    // const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);

    // 캐시 되어 있으면 사용하고, 캐시되어 있지 않으면 searchCocktailsQuery 다시 실행
    // 사용자 경험을 향상시키며 불필요한 네트워크 요청을 줄이는 데 도움
    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));

    return { searchTerm };
  };

const Landing = () => {
  const { searchTerm } = useLoaderData();
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));

  return (
    <>
      <Copyright />
      <SearchForm />
      <CocktailList drinks={drinks} />
    </>
  );
};

export default Landing;
