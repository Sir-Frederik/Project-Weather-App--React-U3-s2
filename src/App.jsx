import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyHeader from "./components/MyHeader";
import "bootstrap/dist/css/bootstrap.min.css";

import "./css/App.css";
import { Col, Container, Row } from "react-bootstrap";
import MyForm from "./components/MyForm";
import Hompeage from "./components/Hompeage";
import Weather from "./components/Weather";
// import Clouds from "./components/Clouds";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {" "}
        <Route path="/homepage" element={<Hompeage />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
