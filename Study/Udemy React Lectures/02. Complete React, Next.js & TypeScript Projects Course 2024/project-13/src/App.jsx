import { useState } from 'react';

import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';

import Form from './components/Form';
import Items from './components/Items';

const setLocalStorage = (items) => {
  localStorage.setItem('list', JSON.stringify(items));
};

const getLocalStorage = () => {
  let list = localStorage.getItem('list');

  // 로컬 스토리지 안의 내용이 지워졌을 경우를 대비하여 조건 검사 수행
  if (list) {
    list = JSON.parse(localStorage.getItem('list'));
  } else {
    list = [];
  }

  return list;
};

const defaultList = JSON.parse(localStorage.getItem('list') || '[]');

const App = () => {
  const [items, setItems] = useState(defaultList);

  // 추가 기능
  const addItem = (itemName) => {
    const newItem = {
      name: itemName,
      completed: false,
      id: nanoid(),
    };

    const newItems = [...items, newItem];
    setItems(newItems);
    setLocalStorage(newItems);
    toast.success('item added to the list.');
  };

  // 삭제 기능
  const removeItem = (itemId) => {
    const newItems = items.filter((item) => item.id !== itemId);

    setItems(newItems);
    setLocalStorage(newItems);
    toast.success('item deleted from the list.');
  };

  // 수정 기능 (완료 표시)
  const editItem = (itemId) => {
    const newItems = items.map((item) => {
      if (item.id === itemId) {
        const newItem = { ...item, completed: !item.completed };
        return newItem;
      }

      return item;
    });

    setItems(newItems);
    setLocalStorage(newItems);
  };

  // 수정 기능 (내용)
  const editItemContent = (itemId, newItemName) => {
    const newItems = items.map((item) => {
      if (item.id === itemId) {
        const newItem = { ...item, name: newItemName };
        return newItem;
      }

      return item;
    });

    setItems(newItems);
    setLocalStorage(newItems);
    toast.success('item edited from the list.');
  };

  return (
    <section className="section-center">
      <ToastContainer position="top-center" />
      <Form addItem={addItem} />
      <Items
        items={items}
        removeItem={removeItem}
        editItem={editItem}
        editItemContent={editItemContent}
      />
    </section>
  );
};

export default App;
