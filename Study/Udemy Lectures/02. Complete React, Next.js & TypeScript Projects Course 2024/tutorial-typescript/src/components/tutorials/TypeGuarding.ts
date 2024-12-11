// [Type Guarding]
type ValueType = string | number | boolean;

let value: ValueType;
const random = Math.random();

value = random < 0.33 ? 'Hello' : random < 0.66 ? 123.456 : true;

// (1) typeof Guard
// - typeof 키워드를 이용한다.
function checkValue(value: ValueType) {
  if (typeof value === 'string') {
    console.log(value.toLowerCase());
    return;
  }
  if (typeof value === 'number') {
    console.log(value.toFixed(2));
    return;
  }
  console.log(`boolean: ${value}`);
}

checkValue(value);

// (2) Equality Narrowing
// - 동등 연산자(=== 또는 !==) 연산자를 이용한다.
type Dog = { type: 'dog'; name: string; bark: () => void };
type Cat = { type: 'cat'; name: string; meow: () => void };
type Animal = Dog | Cat;

function makeSound(animal: Animal) {
  if (animal.type === 'dog') {
    // 이 블럭에서 타입스크립트는 animal이 Dog인 것을 안다.
    animal.bark();
  } else {
    // 이 블럭에서 타입스크립트는 animal이 Cat인 것을 안다.
    animal.meow();
  }
}

// (3) Check for Property
// - in 연산자를 이용한다.
function makeSound2(animal: Animal) {
  if ('bark' in animal) {
    // 이 블럭에서 타입스크립트는 animal이 Dog인 것을 안다.
    animal.bark();
  } else {
    // 이 블럭에서 타입스크립트는 animal이 Cat인 것을 안다.
    animal.meow();
  }
}

// (4) "Truthy" / "Falsy" Guard
function printLength(str: string | null | undefined) {
  if (str) {
    // 이 블럭에서 타입스크립트는 str이 string 형이라는 것을 안다.
    // 왜냐하면 `null`과 `undefined`는 falsy 값들이기 때문이다.
    console.log(str.length);
  } else {
    console.log('No string provided');
  }
}

printLength('Hello'); // 5
printLength(null); // No string provided
printLength(undefined); // No string provided

// (5) "instanceof" Type Guard
// - instanceof 키워드를 이용한다.
// - 대상이 클래스의 인스턴스이거나, 생성자 함수에 의해 만들어졌을 경우를 체크한다.

try {
  throw new Error('This is an error');
} catch (error) {
  if (error instanceof Error) {
    console.log('Caught an Error object: ' + error.message);
  } else {
    console.log('Caught an unknown error');
  }
}

function checkInput(input: Date | string): string {
  // Date 클래스의 인스턴스일 경우
  if (input instanceof Date) {
    return input.getFullYear().toString();
  }
  return input;
}

const year = checkInput(new Date());
const random2 = checkInput('2020-05-05');
console.log(year);
console.log(random2);

// (6) Type Predicate
// - 조건에 따라 반환값의 자료형이 다르게 하는 방법
type Student = {
  name: string;
  study: () => void;
};

type User = {
  name: string;
  login: () => void;
};

type Person = Student | User;

// Type Predicate
const randomPerson = (): Person => {
  return Math.random() > 0.5
    ? { name: 'john', study: () => console.log('Studying') }
    : { name: 'mary', login: () => console.log('Logging in') };
};

const person = randomPerson();

// (주의) 다음과 같이 하드 코딩할 경우 Type Predicate가 되지 않는다.
const person2: Person = {
  name: 'anna',
  study: () => console.log('study...'),
  // login: () => console.log('Logging in'),
};

function isStudent(person: Person): person is Student {
  // 'study'가 person 객체에 있는지 확인한다.
  return (person as Student).study !== undefined;
}

// 아래와 같이 사용할 수 있다.
if (isStudent(person)) {
  // 타입스크립트가 'person'이 Student 타입인 것을 알기 때문에 안전하다.
  person.study();
} else {
  person.login();
}

if (isStudent(person2)) {
  person2.study();
} else {
  //  타입을 하드코딩할 경우, 타입스크립트는 도달할 수 없는 코드를 never 타입으로 간주하여 경고를 발생시킨다.
  person2.login();
}

// (7) Discriminated Unions and Exhaustive Check using the never Type
// - 타입 프레디케이트 함수를 사용하면 런타임에서 특정 타입을 확인하고, 타입스크립트에게 해당 타입으로 타입을 좁히도록 도울 수 있다.
// - Discriminated Unions은 공통의 리터럴 속성을 통해 유니온 타입을 명확하게 구분하고, 리듀서와 같은 함수에서 안전하게 타입을 처리할 수 있게 해준다.
// - never 타입을 활용하여 모든 가능한 타입 케이스를 처리했는지 컴파일 시점에 검증할 수 있어, 코드의 안정성과 타입 안전성을 높일 수 있다.

type IncrementAction = {
  type: 'increment';
  amount: number;
  timestamp: number;
  user: string;
};

type DecrementAction = {
  type: 'decrement';
  amount: number;
  timestamp: number;
  user: string;
};

type Action = IncrementAction | DecrementAction;

function reducer(state: number, action: Action): number {
  switch (action.type) {
    // Discriminated Unions : 공통의 리터럴 속성을 통해 유니온 타입을 명확하게 구분
    case 'increment':
      return state + action.amount;
    case 'decrement':
      return state - action.amount;

    default:
      // 모든 가능한 타입을 처리하지 못하는 경우, never 타입을 사용하여 컴파일 타임에 오류를 잡아낼 수 있다.
      const unexpectedAction: never = action; // never 타입 반환
      throw new Error(`Unexpected action: ${unexpectedAction}`);
  }
}

const newState = reducer(15, {
  user: 'john',
  type: 'increment',
  amount: 5,
  timestamp: 123456,
});
