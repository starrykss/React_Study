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
