import ExpenseItem from './ExpenseItem';

import classes from './ExpensesList.module.css';

export function ExpensesList({ items }) {
  if (items.length === 0) {
    return (
      <h2 className={classes['expenses-list__fallback']}>Found no expenses.</h2>
    );
  }

  return (
    <ul className={classes['expenses-list']}>
      {items.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </ul>
  );
}

export default ExpensesList;
