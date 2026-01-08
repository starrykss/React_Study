import { useState } from 'react';
import { ScrollView, Text, View, TextInput, StyleSheet } from 'react-native';

import { Colors } from '../../constants/colors';
import { Place } from '../../models/place';

import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../UI/Button';

function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [pickedLocation, setPickedLocation] = useState();

  // 타이틀 변경 이벤트 처리
  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  // 이미지 촬영 이벤트 처리
  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  // 위치 설정 이벤트 처리
  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  // 버튼 클릭 이벤트 처리
  function savePlaceHandler() {
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);

    onCreatePlace(placeData);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>

      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },

  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500,
  },

  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
