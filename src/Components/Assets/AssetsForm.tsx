import { useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import styles from "./AssetsForm.module.css";
import { AssetsFormProps, DateElement, FaultDateElement } from "../../Interfaces";
import { DatePicker } from "../UI/DatePicker";
function AssetsForm(props: AssetsFormProps) {
  const [assetType, setAssetType] = useState("");
  const [model, setModel] = useState("");
  const [startDate, setStartDate] = useState("");
  const [maintenanceHistory, setMaintenanceHistory] = useState([{ date: "", id: Math.random() }]);
  const [faultHistory, setFaultHistory] = useState([{ date: "", description: "", id: Math.random() }]);
  const [selectedModel, setSelectedModel] = useState("");
  const assetTypeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAssetType(event.target.value);
  };
  const modelChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModel(event.target.value);
  };
  const startDateChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };
  const dateChangeHandler = (index: number, date: string, hasDescription: boolean) => {
    if (hasDescription) {
      setFaultHistory((prevDates: FaultDateElement[]) => {
        const newHistory = [...prevDates];
        newHistory[index].date = date;
        return newHistory;
      });
    } else {
      setMaintenanceHistory((prevDates: DateElement[]) => {
        const newHistory = [...prevDates];
        newHistory[index].date = date;
        return newHistory;
      });
    }
  };
  const descriptionChangeHandler = (index: number, description: string) => {
    setFaultHistory((prevDates: FaultDateElement[]) => {
      const newHistory = [...prevDates];
      newHistory[index].description = description;
      return newHistory;
    });
  };
  const handleSelectModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(event.target.value);
  };
  const addDateHandler = (order: number, hasDescription: boolean) => {
    if (hasDescription) {
      let newHistory = [...faultHistory.slice(0, order + 1), { date: "", description: "", id: Math.random() }, ...faultHistory.slice(order + 1)];
      setFaultHistory(newHistory);
    } else {
      let newHistory = [...maintenanceHistory.slice(0, order + 1), { date: "", id: Math.random() }, ...maintenanceHistory.slice(order + 1)];
      setMaintenanceHistory(newHistory);
    }
  };
  const deleteDateHandler = (id: number, hasDescription: boolean) => {
    if (hasDescription && faultHistory.length > 1) {
      setFaultHistory(faultHistory.filter((element: FaultDateElement) => element.id !== id));
    } else if (!hasDescription && maintenanceHistory.length > 1) {
      setMaintenanceHistory(maintenanceHistory.filter((element: DateElement) => element.id !== id));
    }
  };
  const submitFormHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const asset = JSON.stringify({
      assetType,
      model,
      startDate,
      maintenanceHistory: maintenanceHistory.map((el: DateElement) => {
        const { id, ...rest } = el;
        return rest;
      }),
      faultHistory: faultHistory.map((el: FaultDateElement) => {
        const { id, ...rest } = el;
        return rest;
      }),
    });
    const message =
      `${asset}` +
      `this is a json object that has an overview of specific asset in company and has this fields: asset Type (like elevator,air conditioner or anything another) ,model (which company manfactured this product) ,start Date (starting Date of first running of this asset ) ,maintenance History (list of dates that asset was maintained in) ,fault History (list of dates that asset was damaged in and a description for every damage) i want you to give me an estimator for expected life time left for this asset in days and dates for future required maintenance and a mean period by days that tell me that this asset should be maintained evey number of days` +
      `i know it is hard for an ai model but i want an estimator and i know that is will be not very accurate`;
    const url = selectedModel === "ChatGPT" ? "http://35.180.193.72:8000/chatgpt" : "http://35.180.193.72:8000/bard";
    props.runSpinner(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      console.log(data);
      props.onResponse(`${selectedModel} Response: ${data.response}`);
    } catch (error) {
      console.error(error);
      props.runSpinner(false);
    }
    setAssetType("");
    setModel("");
    setStartDate("");
    setMaintenanceHistory([{ date: "", id: Math.random() }]);
    setFaultHistory([{ date: "", description: "", id: Math.random() }]);
    setSelectedModel("");
  };
  return (
    <Card>
      <form className={styles.assetform} onSubmit={submitFormHandler}>
        <div>
          <div className={styles.assetinput}>
            <label htmlFor="asset-type">Asset Type</label>
            <input type="text" id="asset-type" value={assetType} onChange={assetTypeChangeHandler} required />
          </div>
          <div className={styles.assetinput}>
            <label htmlFor="model">Model/Manufacturer</label>
            <input type="text" id="model" value={model} onChange={modelChangeHandler} required />
          </div>
          <div className={styles.assetinput}>
            <label htmlFor="start-date">Start Date</label>
            <input type="date" id="start-date" value={startDate} onChange={startDateChangeHandler} required />
          </div>
          <div className={styles.assetinput}>
            <label>Maintenance History</label>
            {maintenanceHistory.map((date: DateElement, index: number) => (
              <DatePicker inputDate={date} hasDescription={false} key={date.id} order={index} onAddDate={addDateHandler} onDateChange={dateChangeHandler} onDescriptionChange={descriptionChangeHandler} onDeleteDate={deleteDateHandler} />
            ))}
          </div>
          <div className={styles.assetinput}>
            <label>Fault History</label>
            {faultHistory.map((date: FaultDateElement, index: number) => (
              <DatePicker inputDate={date} hasDescription={true} key={date.id} order={index} onAddDate={addDateHandler} onDateChange={dateChangeHandler} onDescriptionChange={descriptionChangeHandler} onDeleteDate={deleteDateHandler} />
            ))}
          </div>
          <div className={styles.assetinput}>
            <label htmlFor="chat-model">Choose Chat Model:</label>
            <select value={selectedModel} id="chat-model" onChange={handleSelectModelChange} required>
              <option value="">Select a model</option>
              <option value="ChatGPT">ChatGPT</option>
              <option value="Bard">Bard</option>
            </select>
          </div>
        </div>
        <div>
          <Button type="submit">Evaluate</Button>
        </div>
      </form>
    </Card>
  );
}
export { AssetsForm };
