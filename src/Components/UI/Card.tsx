import { CardProps } from "../../Interfaces";
import styles from "./Card.module.css";
function Card(props: CardProps) {
  const classes = `${styles.card} ${props.className}`;
  return <div className={classes}>{props.children}</div>;
}
export default Card;
