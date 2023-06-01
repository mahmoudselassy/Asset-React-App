import React from "react";
import { useState } from "react";
import "./App.css";
import { AssetsForm } from "./Components/Assets/AssetsForm";
import Card from "./Components/UI/Card";
import Spinner from "./Components/UI/Spinner";

function App() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const responseHandler = (response: string) => {
    setLoading(false);
    setResponse(response);
  };
  return (
    <div className="App">
      <AssetsForm runSpinner={setLoading} onResponse={responseHandler} />
      <Card>
        {loading && <Spinner />}
        {!loading && <p>{response}</p>}
      </Card>
    </div>
  );
}

export default App;
