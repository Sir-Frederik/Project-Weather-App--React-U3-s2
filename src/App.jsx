import MyHeader from "./components/MyHeader";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      {/*     <Container fluid>
        {" "}
        <img src="src\assets\clouds.png" />
      </Container> */}

      <MyHeader />
    </>
  );
}

export default App;
