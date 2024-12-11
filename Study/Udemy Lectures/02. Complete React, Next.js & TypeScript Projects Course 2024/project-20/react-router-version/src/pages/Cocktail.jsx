import { useLoaderData, Link, Navigate } from 'react-router-dom';
import axios from 'axios';

import Wrapper from '../assets/wrappers/CocktailPage';

const singleCocktailUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

// loader에서 기본적으로 params 정보를 가져올 수 있다.
export const loader = async ({ params }) => {
  const { id } = params;
  const { data } = await axios.get(`${singleCocktailUrl}${id}`);

  return { id, data };
};

const Cocktail = () => {
  const { id, data } = useLoaderData();

  // 데이터가 없을 경우, 메인 화면으로 이동
  if (!data) return <Navigate to="/" />;

  const singleDrink = data.drinks[0];

  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = singleDrink;

  // 값이 null이 아니고, 'strIngredient'로 시작하는 키들만 찾고,
  // 해당 키의 값들만 추출하기
  const validIngredients = Object.keys(singleDrink)
    .filter(
      (key) => key.startsWith('strIngredient') && singleDrink[key] !== null
    )
    .map((key) => singleDrink[key]);

  return (
    <Wrapper>
      <header>
        <Link to="/" className="btn">
          back home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className="drink">
        <img src={image} alt={name} className="img"></img>
        <div className="drink-info">
          <p>
            <span className="drink-data">name</span> {name}
          </p>
          <p>
            <span className="drink-data">category</span> {category}
          </p>
          <p>
            <span className="drink-data">info</span> {info}
          </p>
          <p>
            <span className="drink-data">glass</span> {glass}
          </p>
          <p>
            <span className="drink-data">ingredients</span>
            {validIngredients.map((item, index) => {
              return (
                <span className="ing" key={item}>
                  {item} {index < validIngredients.length - 1 ? ',' : ''}
                </span>
              );
            })}
          </p>
          <p>
            <span className="drink-data">instructions</span> {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Cocktail;
