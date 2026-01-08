import { insertPlace } from '../utils/database';

import PlaceForm from '../components/Places/PlaceForm';

function AddPlace({ navigation }) {
  // 장소 추가 이벤트 처리
  async function createPlaceHandler(place) {
    // DB에 넣기
    await insertPlace(place);

    navigation.navigate('AllPlaces');
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;
