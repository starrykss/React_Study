console.log('typescript tutorial');

interface someValue {
  name: string;
  id: number;
}

let someObj: someValue = {
  name: 'random',
  id: 123,
};

console.log(someObj);

// [Annotation]
let awesomeName: string = 'shakeAndBake';
awesomeName = 'something';
awesomeName = awesomeName.toUpperCase();
console.log(awesomeName);

// [number/boolean Type]
let amount: number = 20;
amount = 12 - 1;
// amount = 'pants';
console.log(amount);

let isAwesome: boolean = true;
isAwesome = false;
// isAwesome = 'shakeAndBake';
console.log(isAwesome);

// [Union Type]
let tax: number | string = 10;
tax = 100;
tax = '$10';

let reqeustStatus: 'pending' | 'success' | 'error' = 'pending';
reqeustStatus = 'success';
reqeustStatus = 'error';
// reqeustStatus = 'random';   // 오류 발생

// [Any Type]
let notSure: any = 4;
notSure = 'maybe a string instead';
notSure = false;

const books = ['1984', 'Brave New World', 'Fahrenheit 451'];
let foundBook: string | undefined; // string 또는 undefined => 잘못된 자료형으로 인한 버그 생성 방지

for (let book of books) {
  if (book === '1983') {
    foundBook = book;
    break;
  } else if (book === '1984') {
    foundBook = book.toUpperCase();
  }
}

console.log(foundBook); // undefined
console.log(foundBook?.length); // string일 경우에만 표시됨.

let orderStatus: 'processing' | 'shipped' | 'delivered' = 'processing';
orderStatus = 'shipped';
orderStatus = 'delivered';
// orderStatus = 'cancelled'; // 에러

let discount: number | string = 20;
discount = '20%';
// discount = true; // 에러

// [Array Type]
let prices: number[] = [100, 75, 42];
// prices.push('hello');  // 애러

let fruits: string[] = ['apple', 'orange'];

// let randomValues: [] = ['hello']; //  에러, 항상 빈 배열만 할당 가능
let emptyValues: number[] = [];
let names = ['peter', 'susan', 1];
let array: (string | boolean)[] = ['apple', true, 'orange', false]; // 2가지 자료형의 배열

let temperatures: number[] = [20, 25, 30];
// temperatures.push('hot'); // 에러

let colors: string[] = ['red', 'green', 'blue'];
// colors.push(true); // 에러

let mixedArray: (number | string)[] = [1, 'two', 3];
// mixedArray.push(true); // 에러

// [Object Type]
let car: { brand: string; year: number } = {
  brand: 'toyota',
  year: 2020,
  // color: 'blue',   // 에러
};

car.brand = 'kia';
// car.color = 'red'; // 에러

let car1: { brand: string; year: number } = { brand: 'audi', year: 2022 };

let book = { title: 'book', cost: 20 };
let pen = { title: 'pen', cost: 5 };
let notebook = { title: 'notebook' };
let items1: { title: string; cost: number }[] = [
  book,
  pen,
  // notebook  // 에러 (cost 키 값 없음.)
];

let items2: { title: string; cost?: number }[] = [
  book,
  pen,
  notebook, // cost 키 값에 ?를 붙이면, 에러 발생 X
];

// 키 값 앞에 readonly를 붙이면 해당 키 값 수정 불가 (읽기 전용)
let items3: { readonly title: string; cost?: number }[] = [book, pen, notebook];
// items3[0].title = 'new book';  // 에러 발생

let bike: { brand: string; year: number } = {
  brand: 'Yamaha',
  year: 2010,
};
// bike.year = 'old'; // 에러

let laptop: { brand: string; year: number } = {
  brand: 'Dell',
  year: 2020,
};
// let laptop2: { brand: string, year: number } = { brand: 'HP' }; // 에러 (year 설정 X)

let product1 = { title: 'Shirt', price: 20 };
let product2 = { title: 'Pants' };
let products: { title: string; price?: number }[] = [product1, product2];
// products.push({ title: 'Shoes', price: 'expensive' }); // 오류

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

// [Type Alias]
const john: { id: number; name: string; isActive: boolean } = {
  id: 1,
  name: 'john',
  isActive: true,
};
const susan: { id: number; name: string; isActive: boolean } = {
  id: 1,
  name: 'susan',
  isActive: false,
};

function createUser(user: { id: number; name: string; isActive: boolean }): {
  id: number;
  name: string;
  isActive: boolean;
} {
  console.log(`Hello there ${user.name.toUpperCase()} !!!`);

  return user;
}

// Type Alias를 이용하면 반복적인 코드 사용을 줄여 아래와 같이 간단하게 코드를 작성할 수 있다.
type User = { id: number; name: string; isActive: boolean }; // type 타입명 = { 키: 값(자료형) }

const john1: User = {
  id: 1,
  name: 'john',
  isActive: true,
};
const susan2: User = {
  id: 1,
  name: 'susan',
  isActive: false,
};

function createUser2(user: User): User {
  console.log(`Hello there ${user.name.toUpperCase()} !!!`);
  return user;
}

// string 또는 number
type StringOrNumber = string | number;

let value: StringOrNumber;
value = 'hello';
value = 123;

// 다크/라이트 모드에서 아래와 같이 사용한다.
type Theme = 'light' | 'dark';

let theme: Theme;
theme = 'light';
theme = 'dark';

function setTheme(t: Theme) {
  theme = t;
}

setTheme('dark');

type Employee = { id: number; name: string; department: string };
type Manager = { id: number; name: string; employees: Employee[] };

type Staff = Employee | Manager;

function printStaffDetails(staff: Staff) {
  if ('employees' in staff) {
    console.log(
      `${staff.name} is a manager of ${staff.employees.length} employees.`
    );
  } else {
    console.log(
      `${staff.name} is an employee in the ${staff.department} department.`
    );
  }
}

const alice: Employee = { id: 1, name: 'Alice', department: 'Sales' };
const steve: Employee = { id: 1, name: 'Steve', department: 'HR' };
const bob: Manager = { id: 2, name: 'Bob', employees: [alice, steve] };

printStaffDetails(alice); // Outputs: Alice is an employee in the Sales department.
printStaffDetails(bob);

// [Intersection Types]
type Book = { id: number; name: string; price: number };
type DiscountedBook = Book & { discount: number }; // TypeA & TypeB

const book1: Book = {
  id: 2,
  name: 'How to Cook a Dragon',
  price: 15,
};

const book2: Book = {
  id: 3,
  name: 'The Secret Life of Unicorns',
  price: 18,
};

const discountedBook: DiscountedBook = {
  id: 4,
  name: 'Gnomes vs. Goblins: The Ultimate Guide',
  price: 25,
  discount: 0.15,
};

// [Computed Properties]
const propName = 'age';

type Animal = {
  [propName]: number; // 대괄호([])로 키값을 감싼다.
};

let tiger: Animal = { [propName]: 5 };

// [Interface]
// - interface 인터페이스명 { 키: 값(자료형) }
interface Book2 {
  readonly isbn: number; // 읽기 전용
  title: string;
  author: string;
  genre?: string; // 옵션
}

const deepWork: Book2 = {
  isbn: 9781455586691,
  title: 'Deep Work',
  author: 'Cal Newport',
  genre: 'Self-help',
};

deepWork.title = 'New Title';
// deepWork.isbn = 654321; // 에러

// 메서드의 경우 아래와 같이 사용할 수 있다.
// > 사용예1)
interface Book3 {
  readonly isbn: number;
  title: string;
  author: string;
  genre?: string;

  // 메서드
  printAuthor(): void;
  printTitle(message: string): string;
}

const deepWork2: Book3 = {
  isbn: 9781455586691,
  title: 'Deep Work',
  author: 'Cal Newport',
  genre: 'Self-help',
  printAuthor() {
    console.log(this.author);
  },
  printTitle(message) {
    return `${this.title} ${message}`;
  },
};

deepWork2.printAuthor();
const result3 = deepWork2.printTitle('is an awesome book');
console.log(result3);

// > 사용예2)
interface Book4 {
  readonly isbn: number;
  title: string;
  author: string;
  genre?: string;

  // 메서드
  printAuthor(): void;
  printTitle(message: string): string;
  printSomething: (someValue: number) => number;
}

const deepWork3: Book4 = {
  isbn: 9781455586691,
  title: 'Deep Work',
  author: 'Cal Newport',
  genre: 'Self-help',

  printAuthor() {
    console.log(this.author);
  },
  printTitle(message) {
    return `${this.title} ${message}`;
  },

  // 첫 번째 방법
  // printSomething: function (someValue) {
  //   return someValue;
  // },

  // 두 번째 방법
  printSomething: (someValue) => {
    // "this" gotcha
    console.log(deepWork3.author);
    return someValue;
  },

  // 세 번째 방법
  // printSomething(someValue) {
  //   return someValue;
  // },

  // 네 번째 방법
  // printAuthor: () => {
  //   console.log(deepWork3.author);
  // },
};
console.log(deepWork3.printSomething(34));

deepWork3.printAuthor();
const result4 = deepWork3.printTitle('is an awesome book');
console.log(result4);
