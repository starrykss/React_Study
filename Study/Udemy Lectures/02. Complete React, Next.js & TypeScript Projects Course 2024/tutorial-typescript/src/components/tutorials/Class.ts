// [Class]

//
// 사용 예 1
//

class Book {
  // 클래스 내에서 사용될 속성 정의
  public readonly title: string; // 읽기 전용 설정 (수정 불가)
  public author: string; // 기본으로 public 설정
  // checkedOut: boolean;
  private checkedOut = false;

  // 생성자 : 클래스의 인스턴스를 생성할 때 호출됨.
  constructor(title: string, author: string) {
    this.title = title;
    this.author = author;
    this.checkedOut = false;
  }

  // 메서드 선언
  public checkOut() {
    // 내부에서는 접근 가능하지만, 외부에서는 접근 불가
    this.checkedOut = this.toggleCheckedOutStatus();
  }

  public isCheckedOut() {
    return this.checkedOut;
  }

  private toggleCheckedOutStatus() {
    return !this.checkedOut;
  }
}

const deepWork = new Book('Deep Work', 'Cal Newport');
deepWork.author = 'Kim'; // 속성값 수정하기 (public)
// deepWork.checkedOut = 'Hello World!'; // 오류 발생

console.log(deepWork); // { title: 'Deep Work', author: 'Cal Newport' }

// deepWork.title = 'something else';  // 오류 발생
console.log(deepWork.title);

deepWork.checkOut();
console.log(deepWork.isCheckedOut());

//
// 사용 예 2
//

class Book2 {
  private checkedOut: boolean = false;

  constructor(
    readonly title: string,
    public author: string,
    private someValue: number
  ) {}

  public getSomeValue() {
    return this.someValue;
  }
}

const deepWork2 = new Book2('Deep Work', 'Cal Newport', 45);

console.log(deepWork2.getSomeValue());

//
// 사용 예 3
//

class Book3 {
  private checkedOut: boolean = false;

  constructor(
    readonly title: string,
    public author: string,
    private someValue: number
  ) {}

  public getSomeValue() {
    return this.someValue;
  }

  // getter
  get info() {
    return `${this.title} by ${this.author}`;
  }

  get checkOut() {
    return this.checkedOut;
  }

  public get someInfo() {
    this.checkOut = true;
    return `${this.title} by ${this.author}`;
  }

  // setter
  set checkOut(checkedOut: boolean) {
    this.checkedOut = checkedOut;
  }
}

const deepWork3 = new Book3('Deep Work', 'Cal Newport', 45);
console.log(deepWork3.info); // 메서드 뒤에 ()를 붙이지 않는다.

// deepWork3.checkOut = true;
console.log(deepWork3);
console.log(deepWork3.someInfo);
console.log(deepWork3.checkOut);

//
// 사용 예 4
//

// - 다음과 같이 인터페이스를 클래스를 이용하여 구현할 수 있다.
interface IPerson {
  name: string;
  age: number;

  greet(): void;
}

class Person implements IPerson {
  constructor(public name: string, public age: number) {}

  greet(): void {
    console.log(
      `Hello, my name is ${this.name} and I'm ${this.age} years old.`
    );
  }
}

const hipster = new Person('shakeAndBake', 100);
hipster.greet();
