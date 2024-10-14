import { useEffect, useState } from 'react';
import Form from './components/Form';
import List from './components/List';
import { type Task } from '../types';

function loadTasks(): Task[] {
  const storedTasks = localStorage.getItem('tasks');

  return storedTasks ? JSON.parse(storedTasks) : [];
}

function updateStorage(tasks: Task[]): void {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function Component() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const toggleTask = ({ id }: { id: string }) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isCompleted: !task.isCompleted };
        }
        return task;
      })
    );
  };

  // 작업 목록이 업데이트 될 때마다 로컬 스토리지에 반영하기
  useEffect(() => {
    updateStorage(tasks);
  }, [tasks]);

  return (
    <div>
      <Form addTask={addTask} />
      <List tasks={tasks} toggleTask={toggleTask} />
    </div>
  );
}
export default Component;
