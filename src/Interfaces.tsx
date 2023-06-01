import { MouseEventHandler } from "react";

export interface UserFormProps {
  onSaveUser: Function;
}
export interface CardProps {
  children: React.ReactNode;
  className?: string;
}
export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export interface ModalProps {
  setIsShownModal: Function;
  message: string;
}

export interface AssetsFormProps {
  runSpinner: Function;
  onResponse: Function;
}

export interface DatesListProps {
  Dates: DateElement[];
  hasDescription?: boolean;
  onAddDate: Function;
  setDates: Function;
}
export interface DateElement {
  date: string;
  id: number;
}
export interface DatePickerProps {
  inputDate: DateElement;
  hasDescription?: boolean;
  order: number;
  onAddDate: Function;
  onDateChange: Function;
  onDescriptionChange: Function;
  onDeleteDate: Function;
}
export interface FaultDateElement extends DateElement {
  description: string;
}
