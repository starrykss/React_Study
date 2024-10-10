// [Module]
// - 모듈 방식을 사용하려면 /tsconfig.json 파일에서 아래와 같이 설정해준다.
// "moduleDetection": "force",
// "module": "ESNext",
import newStudent, { sayHello, person, type Student } from './modules/actions';

sayHello('TypeScript');
console.log(person);
console.log(newStudent);

const anotherStudent: Student = {
  name: 'bob',
  age: 23,
};

console.log(anotherStudent);
