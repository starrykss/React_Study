export function Book({ title, author, img, id, getBook, children, ...props }) {
  return (
    <article {...props}>
      <img src={img} alt={title} />
      <h2>{title}</h2>
      <h4>{author}</h4>

      <br />
      <button onClick={() => getBook(id)}>Display Title</button>
      <br />
      {children}
    </article>
  );
}

export default Book;
