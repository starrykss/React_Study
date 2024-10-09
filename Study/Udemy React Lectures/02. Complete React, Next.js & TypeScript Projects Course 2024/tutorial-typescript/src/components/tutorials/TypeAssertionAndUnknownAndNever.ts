// [Type Assertion]
// - 컴파일러에게 변수가 어떤 타입인지 말해주는 것
// - as 키워드를 이용하여 자료형 형태를 알려준다.
let someValue: any = 'This is a string';

// 컴파일러에게 'someValue' 변수가 string 형임을 알려준다.
let strLength: number = (someValue as string).length;

type Bird = {
  name: string;
};

// JSON 문자열의 경우 (API or 로컬 파일)
let birdString = '{"name": "Eagle"}';
let dogString = '{"breed": "Poodle"}';

// JSON 문자열을 객체로 파싱
let birdObject = JSON.parse(birdString);
let dogObject = JSON.parse(dogString);

// 우리는 JSON 객체가 실제로 Bird 타입이라는 것을 안다.
let bird = birdObject as Bird;
let dog = dogObject as Bird;

console.log(bird.name); //Eagle
console.log(dog.name); // undefined

enum Status {
  Pending = 'pending',
  Declined = 'declined',
}

type User = {
  name: string;
  status: Status;
};

// DB에서 string 형태의 값을 가져왔을 경우
const statusValue = 'pending';

// string 형태로 DB에서 가져온 값을 Status.pending 형태로 저장한다.
const user: User = { name: 'john', status: statusValue as Status };

// [Type Unknown]
// unknown 키워드를 사용한다.
let unknownValue: unknown;

// unknown 형태의 변수에 다양한 타입을 할당할 수 있다.
unknownValue = 'Hello World'; // OK
unknownValue = [1, 2, 3]; // OK
unknownValue = 42.3344556; // OK

// unknownValue.toFixed(); // Error: Object is of type 'unknown'

// unknownValue 사용해보기
if (typeof unknownValue === 'number') {
  // 타입스크립트는 이 블럭에서 unknownValue의 값이 number 형이라는 것을 안다.
  console.log(unknownValue.toFixed(2)); // OK
}

function runSomeCode() {
  const random = Math.random();

  if (random < 0.5) {
    throw new Error('Something went wrong');
  } else {
    throw 'some error';
  }
}

try {
  runSomeCode();
} catch (error) {
  // error 객체가 Error 클래스의 인스턴스인지 체크
  if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log(error);
    console.log('there was an error....');
  }
}

// [Type Never]
// - never 타입의 변수에는 어떤 자료형의 값도 할당할 수 없다.
// let someValue: never = 0;

type Theme = 'light' | 'dark';

function checkTheme(theme: Theme) {
  if (theme === 'light') {
    console.log('light theme');
    return;
  }
  if (theme === 'dark') {
    console.log('dark theme');
    return;
  }
  theme;

  // theme 변수는 never 형이라고 할 수 있다.
  // -> 왜냐하면 'light' 또는 'dark' 를 제외한 어떠한 변수를 할당할 수 없기 때문이다.
}

enum Color {
  Red,
  Blue,
  // Green,
}

function getColorName(color: Color) {
  switch (color) {
    case Color.Red:
      return 'Red';
    case Color.Blue:
      return 'Blue';
    // case Color.Green:
    //   return 'Green';
    default:
      // 빌드 시간에 생성
      let unexpectedColor: never = color;

      // 실행 시간에 발생
      throw new Error(`Unexpected color value: ${unexpectedColor}`);
  }
}

console.log(getColorName(Color.Red)); // Red
console.log(getColorName(Color.Blue)); // Blue
// console.log(getColorName(Color.Green)); // Green
