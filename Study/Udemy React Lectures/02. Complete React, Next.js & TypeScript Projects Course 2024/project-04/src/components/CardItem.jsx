const CardItem = ({ image, name, age }) => {
  // 나이에 맞게 표시되는 내용 수정
  let ageContent;

  if (age > 1) {
    ageContent = `${age} years`;
  } else {
    ageContent = `${age} year`;
  }

  return (
    <article className="person">
      <img src={image} className="img" alt={name} />
      <div>
        <h4>{name}</h4>
        <p>{ageContent}</p>
      </div>
    </article>
  );
};

export default CardItem;
