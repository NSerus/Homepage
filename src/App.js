import "./App.css";
import Clock from "./components/Clock";
import Tasks from "./components/Tasks";
import Weather from "./components/Weather/Weather";
import Pomo from "./components/Pomo";
import Settings from "./components/Settings";
import { useState } from "react";

function App() {

  const [data,setData] = useState('');
  const [pomo,setPomo] = useState(0);
  const [breakTime,setBreak] = useState(0);
 function handleOnSettingsChange(searchData) {
  setData(searchData)
  
 }
 function handleOnPomoChange(pomoInput,breakInput) {
  setPomo(pomoInput)
  setBreak(breakInput)
  
 }


  return (
    <div>
      <Clock />
      <Settings onSettingsChange={handleOnSettingsChange} onPomoChange={handleOnPomoChange}/>

      <div className="apps">
        <Tasks />
        <Weather searchData={data} />
      </div>
      <Pomo pomoData={{pomo, breakTime}}/>
    </div>
  );
}

export default App;
