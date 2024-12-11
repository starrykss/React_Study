import classes from './Card.module.css';

export function Card(props) {
  const allClasses = classes['card'] + ' ' + props.className;

  return <div className={allClasses}>{props.children}</div>;
}

export default Card;
