import MyHeader from "./components/MyHeader";
import "bootstrap/dist/css/bootstrap.min.css";

import "./css/App.css";
import { Container } from "react-bootstrap";
import Clouds from "./components/Clouds";

function App() {
  return (
    <>
      <Container fluid>{/*   <Clouds /> */}</Container>

      <MyHeader />
    </>
  );
}

export default App;
