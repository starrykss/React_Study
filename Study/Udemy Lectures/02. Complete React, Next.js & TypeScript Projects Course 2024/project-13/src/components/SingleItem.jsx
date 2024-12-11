import { useState } from 'react';

const SingleItem = ({ item, removeItem, editItem, editItemContent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(item.name);

  const handleNameSave = (itemId) => {
    editItemContent(itemId, newName); // 저장 내용 반영
    setIsEditing(false);
  };

  return (
    <div className="single-item">
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => editItem(item.id)}
      />
      {isEditing ? (
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={() => handleNameSave(item.id)}
          onKeyDown={(e) => {
            // 엔터(Enter) 키 누르면 저장
            if (e.key === 'Enter') {
              handleNameSave(item.id);
            }
          }}
        />
      ) : (
        <p
          style={{
            textTransform: 'capitalize',
            textDecoration: item.completed && 'line-through',
            cursor: 'pointer',
          }}
          onClick={() => setIsEditing(!isEditing)}
        >
          {item.name}
        </p>
      )}
      <button
        className="btn remove-btn"
        type="button"
        onClick={() => removeItem(item.id)}
      >
        delete
      </button>
    </div>
  );
};

export default SingleItem;
