import { FlatList, Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../constants/colors';

import PlaceItem from './PlaceItem';

function PlacesList({ places }) {
  const navigation = useNavigation();

  // 장소 선택 이벤트 처리
  function selectPlaceHandler() {
    navigation.navigate('PlaceDetails', {
      placeId: id,
    });
  }

  // 데이터가 없을 경우
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem places={item} onSelect={selectPlaceHandler} />
      )}
    />
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },

  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
