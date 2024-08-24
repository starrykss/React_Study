import ExpenseForm from './ExpenseForm';

import classes from './NewExpense.module.css';

export function NewExpense({ onAddExpense }) {
  function saveExpenseDataHandler(enteredExpenseData) {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };

    console.log(expenseData);

    onAddExpense(expenseData);
  }

  return (
    <div className={classes['new-expense']}>
      <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} />
    </div>
  );
}

export default NewExpense;
