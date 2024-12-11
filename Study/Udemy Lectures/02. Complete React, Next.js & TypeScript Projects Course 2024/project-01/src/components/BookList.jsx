import Book from './Book';

import { books } from '../books.js';

import classes from './BookList.module.css';

function BookList() {
  function getBook(id) {
    const book = books.find((book) => book.id === id);

    console.log(book);
    alert(`Title: ${book.title}\nAuthor: ${book.author}`);
  }

  return (
    <section className={classes.booklist}>
      {books.map((book, index) => (
        <Book
          key={book.id}
          author={book.author}
          title={book.title}
          img={book.img}
          id={book.id}
          getBook={getBook}
          className={classes['book']}
        >
          <span className={classes['number']}>#{index + 1}</span>
        </Book>
      ))}
    </section>
  );
}

export default BookList;
