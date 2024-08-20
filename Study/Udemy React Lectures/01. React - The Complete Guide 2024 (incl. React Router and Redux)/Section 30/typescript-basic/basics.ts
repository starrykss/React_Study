// Primitives: number, string, boolean
// More complex types: arrays, objects
// Function types, parameters

// Primitives

let age: number; // Number : JS 객체 -> 원시 타입인 number 키워드를 사용한다.
age = 12.1;
// age = '12';   // ERROR

let userName: string;
userName = 'Max';

let isInstructor: boolean;
isInstructor = true;

let isNull: null;
// isNull = 12;   // ERROR

// More complex types
let hobbies: string[];
hobbies = ['Sports', 'Cooking']; // 동일한 자료형만 넣을 수 있다.

type Person = {
  name: string;
  age: number;
};

let person: Person;

person = {
  name: 'Max',
  age: 32,
};

// person = {
//   isEmployee: true,
// };   // ERROR

let people: Person[];

// Type Inference
let course1 = 'React - The Complete Guide'; // 타입 추론 : string

// course1 = 12341; // ERROR

// Union
let course2: string | number = 'TypeScript';
course2 = 12341; // WORK!

// Function & types
function add(a: number, b: number): number {
  return a + b;
}

function print(value: any) {
  // 기본적으로 void 형 반환
  console.log(value);
}

// Generics
function insertAtBeginning<T>(array: T[], value: T) {
  const newArray = [value, ...array];

  return newArray;
}

const demoArray = [1, 2, 3];
const updatedArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]
// updatedArray[0].split('');   // ERROR

const stringArray = insertAtBeginning(['a', 'b', 'c'], 'd');
// stringArray[0].split('');   // WORK!
