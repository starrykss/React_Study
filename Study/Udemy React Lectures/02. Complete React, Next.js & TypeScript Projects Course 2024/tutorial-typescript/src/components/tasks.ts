// DOM 요소 가져오기
const taskForm = document.querySelector<HTMLFormElement>('.form');
const formInput = document.querySelector<HTMLInputElement>('.form-input');

const taskListElement = document.querySelector<HTMLUListElement>('.list');

// const btn = document.querySelector<HTMLButtonElement>(
//   '.test-btn'
// )! as HTMLButtonElement;
// btn.disabled = true;

// 타입 정의하기
type Task = {
  description: string;
  isCompleted: boolean;
};

const tasks: Task[] = loadTasks();

tasks.forEach(renderTask);

// 폼에 폼 전송 이벤트 추가하기
taskForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  // Input에 입력한 값 가져오기
  const taskDescription = formInput?.value;

  if (taskDescription) {
    // Task 타입의 객체 변수 생성하기
    const task: Task = {
      description: taskDescription,
      isCompleted: false,
    };

    addTask(task); // 작업 추가하기
    renderTask(task); // 작업 목록 리렌더링
    updateStorage(); // 로컬 스토리지 업데이트

    // Input 내용 비우기
    formInput.value = '';

    return;
  }
  // 알림 메시지 띄우기
  alert('Please enter a task description');
});

//
// Functions
//

// 작업 아이템 불러오기
function loadTasks(): Task[] {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
}

// 작업 추가하기
function addTask(task: Task): void {
  tasks.push(task);

  console.log(tasks);
}

// 작업 표시하기
function renderTask(task: Task): void {
  const taskElement = document.createElement('li');
  taskElement.textContent = task.description;

  // 체크박스
  const taskCheckbox = document.createElement('input');
  taskCheckbox.type = 'checkbox';
  taskCheckbox.checked = task.isCompleted;

  // 체크박스 토글 이벤트 추가
  taskCheckbox.addEventListener('change', () => {
    task.isCompleted = !task.isCompleted;
    updateStorage();
  });

  taskElement.appendChild(taskCheckbox);
  taskListElement?.appendChild(taskElement);
}

// 로컬 스토리지 업데이트
function updateStorage(): void {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
