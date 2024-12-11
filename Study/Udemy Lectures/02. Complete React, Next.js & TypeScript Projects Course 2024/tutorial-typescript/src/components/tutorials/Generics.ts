// [Generics]
// - 타입스크립트에서는 다음과 같이 2가지 방법으로 배열을 선언할 수 있다.

// <방법1>
// let array1: string[] = ['Apple', 'Banana', 'Mango'];
// let array2: number[] = [1, 2, 3];
// let array3: boolean[] = [true, false, true];

// <방법2>
let array1: Array<string> = ['Apple', 'Banana', 'Mango'];
let array2: Array<number> = [1, 2, 3];
let array3: Array<boolean> = [true, false, true];

// - 다음과 같이 제네릭 함수와 제네릭 인터페이스를 만들 수 있다.
function createString(arg: string): string {
  return arg;
}
function createNumber(arg: number): number {
  return arg;
}

// 제네릭 함수 생성 & 사용
function genericFunction<T>(arg: T): T {
  return arg;
}

const someStringValue = genericFunction<string>('Hello World');
const someNumberValue = genericFunction<number>(2);

// 제네릭 인터페이스 생성 & 사용
interface GenericInterface<T> {
  value: T;
  getValue: () => T;
}

const genericString: GenericInterface<string> = {
  value: 'Hello World',
  getValue() {
    return this.value;
  },
};

// - 다음과 같이 프로미스 또한 제네릭 형태로 만들 수 있다.
// - 프로미스(Promise) : 비동기 작업에서 이벤트의 성공/실패 여부를 나타내는 객체

async function someFunc(): Promise<string> {
  return 'Hello World';
}

const result = someFunc();

// - 다음과 같이 반복되는 요소들이 들어 있는 배열을 반환하도록 만들 수 있다.
function generateStringArray(length: number, value: string): string[] {
  let result: string[] = [];
  result = Array(length).fill(value);

  return result;
}

console.log(generateStringArray(3, 'hello'));

function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  result = Array(length).fill(value);

  return result;
}

let arrayStrings = createArray<string>(3, 'hello'); // ["hello", "hello", "hello"]
let arrayNumbers = createArray<number>(4, 100); // [100, 100, 100, 100]

console.log(arrayStrings);
console.log(arrayNumbers);

// 다음과 같이 여러개의 제네릭 타입을 지정할 수 있다. (T, U)
function pair<T, U>(param1: T, param2: U): [T, U] {
  return [param1, param2];
}

let result2 = pair<number, string>(123, 'Hello');
let result3 = pair(123, 'Hello');

console.log(result2); // [123, "Hello"]
console.log(result3); // [123, "Hello"]

// - 리액트의 useState도 제네릭과 유사하게 동작한다.
//  const [name, setName] = useState('')
//  const [products, setProducts] = useState<Product[]>([])

// - 다음과 같이 제네릭의 타입의 제약 조건을 추가할 수 있다.
// 사용예1)
function processValue<T extends number | string | boolean>(value: T): T {
  console.log(value);
}

processValue('hello');
processValue(12);
processValue(true);

// 사용예2)
type Car = {
  brand: string;
  model: string;
};

const car: Car = {
  brand: 'ford',
  model: 'mustang',
};

type Product = {
  name: string;
  price: number;
};

const product: Product = {
  name: 'shoes',
  price: 1.99,
};

type Student = {
  name: string;
  age: number;
};

const student: Student = {
  name: 'peter',
  age: 20,
};

// T extends Student는 제네릭 타입 T의 제약 조건이다.
// -> T 타입은 any 타입이 될 수 있지만, Student의 서브 타입이거나 Student 타입 그 자체여야 한다.
// -> 즉, T는 최소한 Student 타입이 가진 동일한 속성이나 메서드를 가져야 한다.
function printName1<T extends Student>(input: T): void {
  console.log(input.name);
}

printName1(student);

function printName2<T extends Student | Product>(input: T): void {
  console.log(input.name);
}

printName2(product);

// T extends { name: string }는 제네릭 타입 T의 제약 조건이다.
// -> T는 any 타입이 될 수 있지만, 최소한 name 속성이 string 형인 객체를 가지고 있어야 한다.
// -> 즉, T는 최소한 { name: string } 객체가 가진 동일한 속성이나 메서드를 가져야 한다.
function printName3<T extends { name: string }>(input: T): void {
  console.log(input.name);
}

printName3(student);
printName3(product);

// - 다음과 같이 제네릭 타입에 기본 타입을 지정할 수 있다.
interface StoreData<T = any> {
  data: T[];
}

const storeNumbers: StoreData<number> = {
  data: [1, 2, 3, 4],
};

const randomStuff: StoreData = {
  data: ['random', 1],
};

// - 다음과 같이 axios는 제네릭을 이용하여 구현되어 있다.
// data는 data 속성의 값에 포함되어 있다.
// const { data } = axios.get(someUrl);

// axios.get<{ name: string }[]>(someUrl);

// export class Axios {
//   get<T = any, R = AxiosResponse<T>, D = any>(
//     url: string,
//     config?: AxiosRequestConfig<D>
//   ): Promise<R>;
// }

// export interface AxiosResponse<T = any, D = any> {
//   data: T;
//   status: number;
//   statusText: string;
//   headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
//   config: InternalAxiosRequestConfig<D>;
//   request?: any;
// }
