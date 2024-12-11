// [Function]
function sayHi(name: string) {
  console.log`Hello there ${name.toUpperCase()}`;
}
sayHi('Max');
// sayHi(3);  // 에러

// 파라미터 : number, 반환값 : number
function calculateDiscount(price: number): number {
  const hasDiscount = true;

  if (hasDiscount) {
    return price;
    // return 'Discount Applied'; // 에러
  }
  return price * 0.9;
}
const finalPrice = calculateDiscount(200);

function addThree(number: any) {
  let anotherNumber: number = 3;

  return number + anotherNumber;
}

const result = addThree(3);
const someValue = result;

// someValue.myMethod(); // 런타임 오류

const names2: string[] = ['John', 'Jane', 'Jim', 'Jill'];

// 파라미터 : string, 반환값: boolean
function isNameInList(name: string): boolean {
  return names2.includes(name);
}

let nameToCheck: string = 'Jane';
if (isNameInList(nameToCheck)) {
  console.log(`${nameToCheck} is in the list.`);
} else {
  console.log(`${nameToCheck} is not in the list.`);
}

// [Default Parameter vs. Optional Parameter]
// discount : Optional Parameter
function calculatePrice(price: number, discount?: number) {
  return price - (discount || 0);
}

let priceAfterDiscount = calculatePrice(100, 20);
console.log(priceAfterDiscount); // 80

let priceWithoutDiscount = calculatePrice(300);
console.log(priceWithoutDiscount); // 300

// penaltyPoints : Default Parameter
function calculateScore(initialScore: number, penaltyPoints: number = 0) {
  return initialScore - penaltyPoints;
}

let scoreAfterPenalty = calculateScore(100, 20);
console.log(scoreAfterPenalty); // 80

let scoreWithoutPenalty = calculateScore(300);
console.log(scoreWithoutPenalty); // 300

// [Rest Parameter(...)]
// - 나머지 연산자의 값들은 배열에 넣어진다.
function sum(message: string, ...numbers: number[]): string {
  const doubled = numbers.map((num) => num * 2);
  console.log(doubled);

  let total = numbers.reduce((previous, current) => {
    return previous + current;
  }, 0);

  return `${message} ${total}`;
}

let result2 = sum('The total is:', 1, 2, 3, 4, 5); // "The total is: 15"

// [void Return]
function logMessage(message: string): void {
  console.log(message);
}

logMessage('Hello, TypeScript!'); // Output: Hello, TypeScript!

// - void를 반환형으로 사용해도 값을 리턴할 수 있지만, 리턴된 값은 무시된다.

function logMessage2(message: string): void {
  console.log(message);
  // return 'This value is ignored'; // 무시된다.
}

logMessage2('Hello, TypeScript!'); // Hello, TypeScript!

// typeof를 통해 파라미터의 자료형의 종류를 파악할 수 있다.
function processInput(input: string | number) {
  if (typeof input === 'number') {
    console.log(input * 2);
  } else {
    console.log(input.toUpperCase());
  }
}

processInput(10); // 20
processInput('Hello'); // HELLO

// 함수의 파라미터를 객체로 설정할 수 있다.
function createEmployee({ id }: { id: number }): {
  id: number;
  isActive: boolean;
} {
  return { id, isActive: id % 2 === 0 };
}

const first = createEmployee({ id: 1 });
const second = createEmployee({ id: 2 });
console.log(first, second);

// 또는 다음과 같이 사용할 수 있다.
function createStudent(student: { id: number; name: string }) {
  console.log(`Welcome to the course ${student.name.toUpperCase()}!!!`);
}

const newStudent = {
  id: 5,
  name: 'anna',
};

createStudent(newStudent);

const newStudent2 = {
  id: 5,
  name: 'anna',
  email: 'anna@gmail.com',
};

createStudent(newStudent2); // 오류 발생 X -> 문제 발생
// createStudent({ id: 1, name: 'bob', email: 'bob@gmail.com' }); // 오류 발생 O

function processData(
  input: string | number,
  config: { reverse: boolean } = { reverse: false }
): string | number {
  if (typeof input === 'number') {
    return input * input;
  } else {
    return config.reverse
      ? input.toUpperCase().split('').reverse().join('')
      : input.toUpperCase();
  }
}

console.log(processData(10)); // 100
console.log(processData('Hello')); // HELLO
console.log(processData('Hello', { reverse: true })); // OLLEH
