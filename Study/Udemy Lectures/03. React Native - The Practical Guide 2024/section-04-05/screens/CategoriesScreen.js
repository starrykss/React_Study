import { FlatList } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';

import CategoryGridTile from '../components/CategoryGridTile';

function CategoriesScreen({ navigation }) {
  // 카테고리 아이템 렌더링
  function renderCategoryItem(itemData) {
    // 버튼 클릭 이벤트 처리
    function pressHandler() {
      navigation.navigate(
        'MealsOverview',
        // 인자 넘기기
        {
          categoryId: itemData.item.id,
        }
      );
    }

    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    );
  }

  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
}

export default CategoriesScreen;
