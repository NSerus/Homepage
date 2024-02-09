import "./App.css";
import Clock from "./components/Clock";
import Tasks from "./components/Tasks";
import Weather from "./components/Weather/Weather";
import Pomo from "./components/Pomo";
import Settings from "./components/Settings";
import { useState } from "react";

function App() {
  const [data, setData] = useState("");
  const [pomo, setPomo] = useState("");
  function handleOnSettingsChange(searchData) {
    setData(searchData);
  }
  function handleOnPomoChange(pomoInput) {
    setPomo(pomoInput);
  }

  return (
    <div>
      <Clock />
      <Settings
        onSettingsChange={handleOnSettingsChange}
        onPomoChange={handleOnPomoChange}
      />

      <div className="apps">
        <Tasks />
        <Weather searchData={data} />
      </div>
      <Pomo pomoData={{ pomo }} />
    </div>
  );
}

export default App;
