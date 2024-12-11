import { useState } from 'react';

import Values from 'values.js';

import ColorList from './components/ColorList';
import Form from './components/Form';

import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  const [colors, setColors] = useState(new Values('#f10316').all(10));

  // toast.success('awesome');
  // toast.error('error message');

  const addColor = (color) => {
    try {
      // 10가지 색상 만들기
      const newColors = new Values(color).all(10);

      setColors(newColors);
    } catch (error) {
      // console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <main>
      <Form addColor={addColor} />
      <ColorList colors={colors} />
      <ToastContainer position="top-center" />
    </main>
  );
};
export default App;
