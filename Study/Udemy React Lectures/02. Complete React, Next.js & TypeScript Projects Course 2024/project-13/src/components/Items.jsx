import SingleItem from './SingleItem';

const Items = ({ items, removeItem, editItem, editItemContent }) => {
  return (
    <div className="items">
      {items.map((item) => (
        <SingleItem
          key={item.id}
          item={item}
          removeItem={removeItem}
          editItem={editItem}
          editItemContent={editItemContent}
        />
      ))}
    </div>
  );
};

export default Items;
