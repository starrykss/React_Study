import { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';

import { Colors } from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';

function ImagePicker({ onTakeImage }) {
  const [pickedImage, setPickedImage] = useState();
  const [useCameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  // 권한 요청 이벤트 처리 (for iOS)
  async function verifyPermissions() {
    // 권한이 없을 경우, 권한 요청
    if (
      useCameraPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    // 권한 요청이 거부되었을 경우 처리
    if (useCameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app.'
      );
      return false;
    }

    return true;
  }

  // 이미지 가져오기 이벤트 처리
  async function takeImageHandler() {
    // 권한 설정 확인 (iOS)
    // 안드로이드에서는 자동으로 권한이 요청되지만, iOS에서는 그렇지 않다.
    // 따라서 iOS를 위해 별도로 권한 요청 로직을 작성해준다.
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true, // 편집 허용
      aspect: [16, 9], // 비율
      quality: 0.5, // 화질
    });

    // 상태 변수에 저장
    if (!image.canceled) {
      setPickedImage(image.uri ?? image.assets[0].uri);

      onTakeImage(image.uri);
    }
  }

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon='camera' onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
  },
});
