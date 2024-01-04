import "./App.css";
import Clock from './components/Clock';
import Tasks from './components/Tasks';
import Weather from './components/Weather/Weather';
import Pomo from './components/Pomo';

function App() {
  

  return (
    <div>
        <Clock/>

      <div className="apps"> 
        <Tasks/>
        <Weather/>
        
      </div>
      <Pomo/>
    </div>
  );
}

export default App;
