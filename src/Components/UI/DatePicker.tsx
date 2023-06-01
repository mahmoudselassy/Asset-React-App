import { useState } from "react";
import { DatePickerProps } from "../../Interfaces";
import plusIcon from "../UI/SVGs/square-plus-solid.svg";
import xmarkIcon from "../UI/SVGs/square-xmark-solid.svg";
import styles from "./DatePicker.module.css";
function DatePicker(props: DatePickerProps) {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const dateChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onDateChange(props.order, event.target.value, props.hasDescription);
    setDate(event.target.value);
  };
  const descriptionChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onDescriptionChange(props.order, event.target.value);
    setDescription(event.target.value);
  };
  const addClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.onAddDate(props.order, props.hasDescription);
  };
  const deleteClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.onDeleteDate(props.inputDate.id, props.hasDescription);
  };

  return (
    <div>
      <div className={styles["DateContainer"]}>
        <input type="date" value={date} onChange={dateChangeHandler} required />
        <button className={styles["Buttonicon"]} onClick={addClickHandler}>
          <img src={plusIcon} alt="Icon" />
        </button>
        <button className={styles["Buttonicon"]} onClick={deleteClickHandler}>
          <img src={xmarkIcon} alt="Icon" />
        </button>
      </div>
      {props.hasDescription && <input type="text" value={description} placeholder="Write a description about fault" id="model" onChange={descriptionChangeHandler} />}
    </div>
  );
}
export { DatePicker };
