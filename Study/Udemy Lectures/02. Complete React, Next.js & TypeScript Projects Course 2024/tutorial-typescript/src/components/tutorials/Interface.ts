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

// > 사용예3)
interface Computer {
  readonly id: number; // 한 번 초기화되면 변경 불가
  brand: string;
  ram: number;
  upgradeRam(increase: number): number;
  storage?: number; // Optional Property
}

const laptop2: Computer = {
  id: 1,
  brand: 'random brand',
  ram: 8, // in GB
  upgradeRam(amount: number) {
    this.ram += amount;
    return this.ram;
  },
};

laptop2.storage = 256; // Optional Property에 값 할당

console.log(laptop2.upgradeRam(4)); //RAM 업그레이드 (4GB)
console.log(laptop2);

// > 사용예4)
interface Person {
  name: string;
  getDetails(): string;
}

interface DogOwner {
  dogName: string;
  getDogDetails(): string;
}

// 다음과 같이 기존의 인터페이스에 새로운 키-값을 추가할 수 있다. (Merging)
interface Person {
  age: number;
}

const person: Person = {
  name: 'john',
  age: 30,
  getDetails() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
};

console.log(person.getDetails());

// 상속(Extension)
// - 기존의 인터페이스의 키-값을 불러와 새로운 인터페이스를 생성할 수 있다.
// - extends 키워드를 이용하여 상속 받을 인터페이스를 지정한다.
interface Employee2 extends Person {
  employeeId: number;
}

const employee: Employee2 = {
  name: 'jane',
  age: 28,
  employeeId: 132,
  getDetails() {
    return `Name: ${this.name}, Age: ${this.age}, Employee ID : ${this.employeeId}`;
  },
};

console.log(employee.getDetails());

// 다음과 같이 여러개의 인터페이스를 상속받을 수 있다.
interface Manager extends Person, DogOwner {
  managePeople(): void;
}

const manager: Manager = {
  name: 'bob',
  age: 35,
  dogName: 'rex',
  getDetails() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  getDogDetails() {
    return `Name: ${this.dogName}`;
  },
  managePeople() {
    console.log('Managing people...');
  },
};

manager.managePeople();

// > 사용예5)
function getEmployee(): Person | DogOwner | Manager {
  const random = Math.random();

  if (random < 0.33) {
    return {
      name: 'john',
    };
  } else if (random < 0.66) {
    return {
      name: 'sarah',
      dogName: 'rex',
    };
  } else {
    return {
      name: 'bob',
      managePeople: () => console.log('Managing people...'),
      delegateTasks: () => console.log('Delegating tasks...'),
    };
  }
}

interface Person {
  name: string;
}

interface DogOwner extends Person {
  dogName: string;
}

interface Manager extends Person {
  managePeople(): void;
  delegateTasks(): void;
}

const employee2: Person | DogOwner | Manager = getEmployee();
// console.log(employee2);

function isManager(obj: Person | DogOwner | Manager): obj is Manager {
  return 'managePeople' in obj; // 해당 함수가 내부에 있을 경우
}

if (isManager(employee2)) {
  employee2.delegateTasks();
}

// Type Alias와 Interface의 차이
// - Tyep Alias는 원시형, Union형,교차형, 튜플 등 여러 자료형과 함께 쓰일 수 있다.
type Person = {
  name: string;
  age: number;
};

let john: Person = { name: 'John', age: 30 };

// - 인터페이스는 객체의 특정 구조를 표현하는 데 사용된다.
interface Person {
  name: string;
  age: number;
}

let john2: Person = { name: 'John', age: 30 };

// Type alias for a primitive type
type Score = number;
type NumberOrString = number | string;

// Type alias for literal types
type Direction = 'up' | 'down' | 'left' | 'right';

// Using the type aliases
let gameScore: Score = 100;
let move: Direction = 'up';

// - 인터페이스는 똑같은 이름의 인터페이스명을 여러 번 선언하여 새로운 내용을 합칠(Merging) 수 있지만, Type Aliases는 그렇게 하지 못한다.
// - 인터페이스는 클래스(Class)로 구현할 수 있지만, Type Aliases는 그렇게 하지 못한다.
interface Person {
  name: string;
  greet(): void;
}

class Employee implements Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

let john3 = new Employee('John');
john3.greet(); //Hello, my name is John

// - Type aliases에서는 Computed Properties를 사용할 수 있지만, 인터페이스에서는 그렇게 하지 못한다.
const propName = 'age';

type Animal = {
  [propName]: number; // Computed Property
};

let tiger: Animal = { [propName]: 5 };
