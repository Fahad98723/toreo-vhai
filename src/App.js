import { Route, Routes } from "react-router-dom";
import "./App.css";
import Log from "./Pages/Authentication/Log";
import Reg from "./Pages/Authentication/Reg";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Prototype from "./Pages/Prototype/Prototype";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Prototype></Prototype>} />
        <Route path="/reg" element={<Reg/>} />
        <Route path="/log" element={<Log/>} />

        <Route
          exact
          path="/dashboard"
          element={
            <Dashboard>
              <Route exact path="/" element={<Prototype></Prototype>} />
            </Dashboard>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
