import { useState } from 'react';
import classes from './ExpenseForm.module.css';

export function ExpenseForm({ onSaveExpenseData }) {
  // # 상태 관리 방법 1
  // const [userInput, setUserInput] = useState({
  //   enteredTitle: '',
  //   enteredAmount: '',
  //   enteredDate: '',
  // });

  // function titleChangeHandler(event) {
  //   setUserInput((prevState) => {
  //     return { ...prevState, enteredTitle: event.target.value };
  //   });
  // }

  // function amountChangeHandler(event) {
  //   setUserInput((prevState) => {
  //     return { ...prevState, enteredAmount: event.target.value };
  //   });
  // }

  // function dateChangeHandler(event) {
  //   setUserInput((prevState) => {
  //     return { ...prevState, enteredDate: event.target.value };
  //   });
  // }

  // # 상태 관리 방법 2
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');

  function inputChangeHandler(event) {
    const { name, value } = event.target;

    if (name === 'title') {
      setEnteredTitle(value);
    } else if (name === 'amount') {
      setEnteredAmount(value);
    } else if (name === 'date') {
      setEnteredDate(value);
    }
  }

  function submitHandler(event) {
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount, // 숫자형으로 변환
      date: new Date(enteredDate),
    };

    console.log(expenseData);

    onSaveExpenseData(expenseData);

    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes['new-expense__controls']}>
        <div className={classes['new-expense__control']}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            onChange={inputChangeHandler}
            value={enteredTitle}
          />
        </div>
        <div className={classes['new-expense__control']}>
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            min="0.01"
            step="0.01"
            onChange={inputChangeHandler}
            value={enteredAmount}
          />
        </div>
        <div className={classes['new-expense__control']}>
          <label>Date</label>
          <input
            type="date"
            name="date"
            min="2019-01-01"
            max="2022-12-31"
            onChange={inputChangeHandler}
            value={enteredDate}
          />
        </div>
      </div>
      <div className={classes['new-expense__actions']}>
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
}

export default ExpenseForm;
