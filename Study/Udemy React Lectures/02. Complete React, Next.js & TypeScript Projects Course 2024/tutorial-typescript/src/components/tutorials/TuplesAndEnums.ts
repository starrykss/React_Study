// [Tuples]
// - 튜플은 [값1, 값2]와 같이 여러개의 값을 대괄호([])로 묶어서 생성한다.
// - 고정된 길이의, 다양한 타입의 값들을 묶을 수 있다.
let person: [string, number] = ['john', 25];

console.log(person[0]); // john
console.log(person[1]); // 25

let john: [string, number?] = ['john'];

function getPerson(): [string, number] {
  return ['john', 25];
}

let randomPerson = getPerson();
console.log(randomPerson[0]); // john
console.log(randomPerson[1]);

// let susan: [string, number] = ['susan', 25];
// susan[0] = 'bob'; // 값 수정 가능
// susan.push('some random value');

// - 아래와 같이 읽기 전용(Read Only)으로 만들 수 있다. (수정 불가)
let susan: readonly [string, number] = ['susan', 25];
// susan[0] = 'bob'; // 에러
// susan.push('some random value');  // 에러
console.log(susan);

// [Enums]
// - 이름 있는 상수들의 세트를 만들어준다.
// - enum 키워드를 붙여서 생성한다.
enum ServerResponseStatus {
  Success = 200,
  Error = 500,
}

interface ServerResponse {
  result: ServerResponseStatus; // enum 타입
  data: string[];
}

function getServerResponse(): ServerResponse {
  return {
    result: ServerResponseStatus, // enum 사용
    data: ['first item', 'second item'],
  };
}

const response: ServerResponse = getServerResponse();
console.log(response);

// <출력 결과 : result>
// {
//    200: 'Success', 500: 'Error',
//    Error: 500, Success: 200,
// }
//

// - enum 안의 값 자료형이 numeric의 경우 Reverse Mapping을 지원하지만, string의 경우 Reverse Mapping을 지원하지 않는다.
enum ServerResponseStatus {
  Success2 = 'Success',
  Error2 = 'Error',
}

Object.values(ServerResponseStatus).forEach((value) => {
  console.log(value);
});

// <출력 결과>
// Success
// Error

enum ServerResponseStatus {
  Success3 = 200,
  Error3 = 500,
}

Object.values(ServerResponseStatus).forEach((value) => {
  if (typeof value === 'number') {
    console.log(value);
  }
});

// <출력 결과>
// 200
// 500
// 200
// 500

enum NumericEnum {
  Member = 1,
}

enum StringEnum {
  Member = 'Value',
}

let numericEnumValue: NumericEnum = 1; // 문제 없응.
console.log(numericEnumValue); // 1

let stringEnumValue: StringEnum = 'Value'; // 에러

enum ServerResponseStatus {
  Success4 = 'Success',
  Error4 = 'Error',
}

function getServerResponse2(): ServerResponse {
  return {
    // result: ServerResponseStatus.Success,
    // this will not fly with string enum but ok with number
    result: 'Success',
    data: ['first item', 'second item'],
  };
}

// 사용예1)
// - enum 형
enum UserRole {
  Admin,
  Manager,
  Employee,
}

// - Type Alias
type User = {
  id: number;
  name: string;
  role: UserRole;
  contact: [string, string]; // Tuple: [email, phone]
};

function createUser(user: User): User {
  return user;
}

const user: User = createUser({
  id: 1,
  name: 'John Doe',
  role: UserRole.Admin,
  contact: ['john.doe@example.com', '123-456-7890'],
});

console.log(user);
