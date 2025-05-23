import MyHeader from "./components/MyHeader";
import "bootstrap/dist/css/bootstrap.min.css";

import "./css/App.css";
import { Col, Container, Row } from "react-bootstrap";
import MyForm from "./components/MyForm";
// import Clouds from "./components/Clouds";

function App() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <MyHeader />
          </Col>
          <Col xs={12}>
            {" "}
            <MyForm />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
