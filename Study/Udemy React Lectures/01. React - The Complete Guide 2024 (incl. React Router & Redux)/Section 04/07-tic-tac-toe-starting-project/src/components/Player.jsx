import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  const handleEditClick = () => {
    setIsEditing((wasEditing) => !wasEditing);

    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  };

  const handleChange = (event) => {
    console.log(event);
    setPlayerName(event.target.value);
  };

  let editablePlayerName = (
    <span className="player-initialName">{playerName}</span>
  );
  let btnCaption = "Edit";

  if (isEditing) {
    editablePlayerName = (
      <input
        type="text"
        required
        // defaultValue={initialName}
        value={playerName}
        onChange={handleChange}
      />
    );
    btnCaption = "Save";
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{btnCaption}</button>
    </li>
  );
}
