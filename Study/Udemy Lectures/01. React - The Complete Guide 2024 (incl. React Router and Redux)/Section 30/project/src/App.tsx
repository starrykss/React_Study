import NewToDo from './components/NewTodo';
import Todos from './components/Todos';
import TodosContextProvider from './store/todos-context';

function App() {
  return (
    <TodosContextProvider>
      <NewToDo />
      <Todos />
    </TodosContextProvider>
  );
}

export default App;
