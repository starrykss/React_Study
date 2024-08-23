import Card from '../UI/Card';
import ExpenseDate from './ExpenseDate';

import classes from './ExpenseItem.module.css';

export function ExpenseItem({ expense }) {
  return (
    <Card className={classes['expense-item']}>
      <ExpenseDate date={expense.date} />
      <div className={classes['expense-item__description']}>
        <h2>{expense.title}</h2>
        <div className={classes['expense-item__price']}>${expense.amount}</div>
      </div>
    </Card>
  );
}

export default ExpenseItem;
