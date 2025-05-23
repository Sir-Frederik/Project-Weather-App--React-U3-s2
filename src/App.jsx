import { BrowserRouter, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import "./css/App.css";

import Homepage from "./components/Homepage";
import Weather from "./components/Weather";
import NotFound from "./components/NotFound";
// import Clouds from "./components/Clouds";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {" "}
        <Route path="/" element={<Homepage />} />
        <Route path="/weather/:lat/:lon" element={<Weather />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/error" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
