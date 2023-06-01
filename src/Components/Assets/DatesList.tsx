import { DateElement, DatesListProps } from "../../Interfaces";
import { DatePicker } from "../UI/DatePicker";

function DatesList(props: DatesListProps) {
  const dateChangeHandler = (index: number, date: string, hasDescription: boolean) => {
    const newHistory = [...props.dates];
    newHistory[index].date = date;
    props.onDatesChange(newHistory, hasDescription);
  };
  const addDateHandler = (order: number, hasDescription: boolean) => {
    let newHistory = [...props.dates.slice(0, order + 1), { date: "", description: "", id: Math.random() }, ...props.dates.slice(order + 1)];
    props.onDatesChange(newHistory, hasDescription);
  };
  const descriptionChangeHandler = (index: number, description: string) => {
    const newHistory = [...props.dates];
    newHistory[index].description = description;
    props.onDatesChange(newHistory, true);
  };
  const deleteDateHandler = (id: number, hasDescription: boolean) => {
    if (props.dates.length > 1) {
      props.onDatesChange(
        props.dates.filter((element: DateElement) => element.id !== id),
        hasDescription
      );
    }
  };
  return (
    <div>
      {props.dates.map((date: DateElement, index: number) => (
        <DatePicker inputDate={date} hasDescription={props.hasDescription} key={date.id} order={index} onAddDate={addDateHandler} onDateChange={dateChangeHandler} onDescriptionChange={descriptionChangeHandler} onDeleteDate={deleteDateHandler} />
      ))}
    </div>
  );
}
export { DatesList };
