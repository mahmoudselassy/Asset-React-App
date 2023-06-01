import styles from "./Button.module.css";
import { ButtonProps } from "../../Interfaces";
function Button(props: ButtonProps) {
  const classes = `${styles.card} ${props.className}`;
  return (
    <button onClick={props.onClick} className={classes}>
      {props.children}
    </button>
  );
}
export default Button;
