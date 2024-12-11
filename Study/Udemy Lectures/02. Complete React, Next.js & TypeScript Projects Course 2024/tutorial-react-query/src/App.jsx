import { ToastContainer } from 'react-toastify';

import Form from './components/Form';
import Items from './components/Items';

// import { nanoid } from 'nanoid';
// const defaultItems = [
//   { id: nanoid(), title: 'walk the dog', isDone: false },
//   { id: nanoid(), title: 'wash dishes', isDone: false },
//   { id: nanoid(), title: 'drink coffee', isDone: true },
//   { id: nanoid(), title: 'take a nap', isDone: false },
// ];

const App = () => {
  return (
    <section className="section-center">
      <ToastContainer position="top-center" />
      <Form />
      <Items />
    </section>
  );
};
export default App;
