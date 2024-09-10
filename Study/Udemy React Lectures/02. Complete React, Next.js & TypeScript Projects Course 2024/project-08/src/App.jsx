import { useState } from 'react';

import Title from './components/Title';
import Categories from './components/Categories';
import Menu from './components/Menu';

import menu from './data';

// 각 아이템에서 카테고리 값만 뽑아서 리스트에 넣기
// const tempCategories = menu.map((item) => item.category);
// const tempSet = new Set(tempCategories);
// const tempItems = ['all', ...tempSet];

const allCategories = ['all', ...new Set(menu.map((item) => item.category))];

const App = () => {
  const [menuItems, setMenuItems] = useState(menu);
  const [categories, setCategories] = useState(allCategories);

  // 카테고리 별 아이템 선택하기
  const filterItems = (category) => {
    // 카테고리명이 All일 경우
    if (category === 'all') {
      setMenuItems(menu);
      return;
    }

    // 그외의 경우
    const newItems = menu.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  return (
    <main>
      <section className="menu">
        <Title text="our menu" />
        <Categories categories={categories} filterItems={filterItems} />
        <Menu items={menuItems} />
      </section>
    </main>
  );
};
export default App;
