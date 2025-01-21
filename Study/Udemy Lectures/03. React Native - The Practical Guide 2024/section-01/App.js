import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import Copyright from './components/Copyright';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  // 목표 추가하기 작업 시작 이벤트 처리
  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  // 목표 추가하기 작업 종료 이벤트 처리
  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  // 버튼 클릭 이벤트 처리
  function addGoalHandler(enteredGoalText) {
    // '화살표 함수'나 '콜백 함수'를 사용하면, 이전 상태를 기반으로 정확하게 상태 업데이트를 할 수 있다. (최신 상태 값인 currentCourseGoals를 안전하게 참조할 수 있음.)
    // -> setCourseGoals([...courseGoals, enteredGoalText])처럼 상태값을 '직접 참조'하면, 이전 렌더링에서의 상태 값을 참조하게 되어, 비동기적으로 상태가 업데이트되는 중에 발생할 수 있는 문제를 피할 수 없다.
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      {
        text: enteredGoalText,
        id: Math.random().toString(),
      },
    ]);

    // 목표 추가 후, 모달창 닫기
    endAddGoalHandler();
  }

  // 아이템 삭제 이벤트 처리
  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
      <StatusBar style='light' /> {/* 상태바 색상 변경 */}
      <View style={styles.appContainer}>
        <Button
          title='Add New Goal'
          color='#a065ec'
          onPress={startAddGoalHandler}
        />
        {/* Goal Input */}
        <GoalInput
          visible={modalIsVisible}
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler}
        />

        {/* Goals Container */}
        <View style={styles.goalsContainer}>
          {/* ScrollView를 일반 View 컴포넌트로 감싸준다. */}
          {/* <ScrollView alwaysBounceVertical={false}>
          {courseGoals.map((goal, index) => (
            // iOS와 Android의 스타일을 일치시켜주기 위해서 View 컴포넌트로 감싸준다.
            // iOS에서는 Text 컴포넌트에 추가한 스타일 중, 일부는 적용되지 않는다.
            <View key={index} style={styles.goalItem}>
              <Text style={styles.goalText}>{goal}</Text>
            </View>
          ))}
        </ScrollView> */}
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => (
              <GoalItem
                text={itemData.item.text}
                id={itemData.item.id}
                onDeleteItem={deleteGoalHandler}
              />
            )}
            keyExtractor={(item, index) => {
              return item.id; // 키값 추출
            }}
            alwaysBounceVertical={false}
          />
        </View>

        {/* Copyright */}
        <Copyright />
      </View>
    </>
  );
}

// StyleSheet 객체는 유효성 검증을 해준다.
// -> 잘못된 스타일 속성을 사용할 경우, 에러나 경고 메시지를 출력한다.
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  goalsContainer: {
    flex: 5,
  },
});
