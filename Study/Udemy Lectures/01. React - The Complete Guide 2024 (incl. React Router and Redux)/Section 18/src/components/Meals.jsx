import MealItem from "./MealItem";
import Error from "./Error";

import useHttp from "../hooks/useHttp";

// 외부에 선언 -> 1번만 실행 (useHttp 훅의 무한 실행 방지)
const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  // 확인해보기
  // console.log(loadedMeals);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  // if (!data) {
  //   return <p>No meals found.</p>;
  // }

  if (error) {
    return <Error title="Failed to fetch meals." message={error} />;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
