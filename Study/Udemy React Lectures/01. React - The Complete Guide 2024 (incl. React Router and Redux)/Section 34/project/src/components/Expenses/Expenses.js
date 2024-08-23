import Card from '../UI/Card';
import ExpenseItem from './ExpenseItem';

import classes from './Expenses.module.css';

export function Expenses({ expenses }) {
  return (
    <Card className={classes['expenses']}>
      {expenses.map((expense) => (
        <ExpenseItem key={expense.date} expense={expense} />
      ))}
    </Card>
  );
}

export default Expenses;
