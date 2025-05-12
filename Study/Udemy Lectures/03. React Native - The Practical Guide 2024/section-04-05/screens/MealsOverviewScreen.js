import { useLayoutEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';

import { MEALS, CATEGORIES } from '../data/dummy-data';

import MealItem from '../components/MealItem';

function MealsOverviewScreen({ route, navigation }) {
  const categoryId = route.params.categoryId; // 파라미터 값 가져오기

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(categoryId) >= 0; // 데이터가 있는 항목만 필터링
  });

  // 동적으로 스크린 이름 지정하기
  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === categoryId
    ).title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [categoryId, navigation]);

  // 아이템 렌더링
  function renderMealItem(itemData) {
    const item = itemData.item;

    const mealItemProps = {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      duration: item.duration,
      complexity: item.complexity,
      affordability: item.affordability,
    };

    return <MealItem {...mealItemProps} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
