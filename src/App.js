import "./App.css";
import FileBase64 from "react-file-base64";
import { useState } from "react";
import axios from "axios";
function App() {
  const [data, setData] = useState("");

  function evaluate(x) {
    const data = {
      image: x,
      other_key: "value",
    };
    setData("Evaluating the Image....");
    axios({
      method: "post",
      url: "https://workshop-api-app.herokuapp.com/predict",
      data,
      headers: {
        "Content-Type": "application/json",
        Accept: "text/plain",
      },
    })
      .then((response) => {
        console.log(response.data);
        setData(response.data.result);
      })
      .catch((error) => {
        setData("Something went wrong");
      });
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src="https://raw.githubusercontent.com/tinkerhubcet/hackathon-frontend/main/public/logo.png" />
        <h1>Tinkerhub CET</h1>
        <h2> Separating non-biodegradable solid waste</h2>

        <FileBase64
          class="custom-file-input"
          type="image"
          multiple={false}
          onDone={(base64) => {
            console.log(base64.base64.split(",")[1], "Just Testing");
            evaluate(base64.base64.split(",")[1]);
          }}
        />
        <p>{data}</p>
      </header>
    </div>
  );
}

export default App;
