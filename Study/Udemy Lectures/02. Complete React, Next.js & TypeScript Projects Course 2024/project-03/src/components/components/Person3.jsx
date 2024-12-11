const Person = ({ name, removePerson, id }) => {
  console.log('render');

  return (
    <div>
      <h4>{name}</h4>
      <button onClick={() => removePerson(id)}>remove</button>
    </div>
  );
};
export default Person;
