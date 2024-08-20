import { useRef, useContext } from 'react';

import { TodosContext } from '../store/todos-context';

import classes from './NewTodo.module.css';

const NewToDo: React.FC = () => {
  const todosCtx = useContext(TodosContext);

  const todoTextInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = todoTextInputRef.current!.value; // !. : 절대로 null(undefined)이 아님을 알려준다.

    // ?.  => return (string | undefined)
    // !.  => return (string)

    if (enteredText.trim().length === 0) {
      // throw an error
      return;
    }

    todosCtx.addTodo(enteredText);
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <label htmlFor="text">Todo Text</label>
      <input type="text" id="text" ref={todoTextInputRef} />
      <button>Add Todo</button>
    </form>
  );
};

export default NewToDo;
