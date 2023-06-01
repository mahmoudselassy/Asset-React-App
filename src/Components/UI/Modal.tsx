import { ModalProps } from "../../Interfaces";
import Button from "./Button";
import Card from "./Card";
import styles from "./Modal.module.css";
function Modal(props: ModalProps) {
  const clickHandler = () => {
    props.setIsShownModal(false);
  };
  return (
    <div className={styles["modal_background"]}>
      <Card className={styles["modal_window"]}>
        <h2>Invalid Input</h2>
        <p>{props.message}</p>
        <Button onClick={clickHandler} className={styles["Button"]}>
          Okay
        </Button>
      </Card>
    </div>
  );
}
export default Modal;
