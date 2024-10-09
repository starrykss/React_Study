// [Computed Properties]
const propName = 'age';

type Animal = {
  [propName]: number; // 대괄호([])로 키값을 감싼다.
};

let tiger: Animal = { [propName]: 5 };
