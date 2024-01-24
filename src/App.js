import "./App.css";
import Clock from "./components/Clock";
import Tasks from "./components/Tasks";
import Weather from "./components/Weather/Weather";
import Pomo from "./components/Pomo";
import Settings from "./components/Settings";
import { useState } from "react";

function App() {

  const [data,setData] = useState('');
 function handleOnSettingsChange(searchData) {
  setData(searchData)
 }


  return (
    <div>
      <Clock />
      <Settings onSettingsChange={handleOnSettingsChange}/>

      <div className="apps">
        <Tasks />
        <Weather searchData={data} />
      </div>
      <Pomo />
    </div>
  );
}

export default App;
