import { useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import styles from "./AssetsForm.module.css";
import { AssetsFormProps, DateElement } from "../../Interfaces";
import { DatesList } from "./DatesList";
function AssetsForm(props: AssetsFormProps) {
  const [assetType, setAssetType] = useState("");
  const [model, setModel] = useState("");
  const [startDate, setStartDate] = useState("");
  const [maintenanceHistory, setMaintenanceHistory] = useState<DateElement[]>([{ date: "", id: Math.random() }]);
  const [faultHistory, setFaultHistory] = useState<DateElement[]>([{ date: "", description: "", id: Math.random() }]);
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
  const datesChangeHandler = (dates: DateElement[], hasDescription: boolean) => {
    if (hasDescription) {
      setFaultHistory(dates);
      return;
    }
    setMaintenanceHistory(dates);
  };
  const selectModelChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(event.target.value);
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
      faultHistory: faultHistory.map((el: DateElement) => {
        const { id, ...rest } = el;
        return rest;
      }),
    });
    console.log(asset);
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
            <DatesList dates={maintenanceHistory} hasDescription={false} onDatesChange={datesChangeHandler} />
          </div>
          <div className={styles.assetinput}>
            <label>Fault History</label>
            <DatesList dates={faultHistory} hasDescription={true} onDatesChange={datesChangeHandler} />
          </div>
          <div className={styles.assetinput}>
            <label htmlFor="chat-model">Choose Chat Model:</label>
            <select value={selectedModel} id="chat-model" onChange={selectModelChangeHandler} required>
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
