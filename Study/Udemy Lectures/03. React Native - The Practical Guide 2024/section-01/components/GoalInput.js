import { useState } from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';

function GoalInput(props) {
  const [enteredGoalText, setEnteredGoalText] = useState('');

  // 입력창 입력 이벤트 처리
  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  // 버튼 클릭 시 이벤트 처리
  function addGoalHandler() {
    // 입력된 내용이 없을 경우
    if (!enteredGoalText) {
      return;
    }

    props.onAddGoal(enteredGoalText);

    setEnteredGoalText(''); // 입력창 내용 비우기
  }

  return (
    <Modal visible={props.visible} animationType='slide'>
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require('../assets/images/goal.png')}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Your course goal!'
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title='Add Goal' onPress={addGoalHandler} color='#b180f0' />
            {/* <Button> 요소에는 style 속성을 넣을 수 없다. */}
          </View>
          <View style={styles.button}>
            <Button title='Cancel' onPress={props.onCancel} color='#f31282' />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#311b6b',
  },

  image: {
    width: 100,
    height: 100,
    margin: 20,
  },

  textInput: {
    borderWidth: 1,
    borderColor: '#e4d0ff',
    backgroundColor: '#e4d0ff',
    color: '#120438',
    borderRadius: 6,
    width: '100%',
    padding: 8,
  },

  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row',
  },

  button: {
    width: 100,
    marginHorizontal: 8,
  },
});
