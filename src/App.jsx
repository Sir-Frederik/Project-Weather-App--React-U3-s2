import { BrowserRouter, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import "./css/App.css";

import Homepage from "./components/Homepage";
import Weather from "./components/Weather";
// import Clouds from "./components/Clouds";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {" "}
        <Route path="/" element={<Homepage />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
