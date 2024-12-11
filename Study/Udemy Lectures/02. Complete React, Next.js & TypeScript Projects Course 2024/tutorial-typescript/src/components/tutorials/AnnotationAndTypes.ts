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
