import { Col, Container, Row } from "react-bootstrap";

function MyHeader() {
  return (
    <Container fluid>
      <Row>
        <Col xs={3}>
          <img src="./src\assets\Gizmo_Umbrella.png"></img>
        </Col>
        <Col xs={9}>
          <Row>
            <Col xs={12}>
              <p> Tiny Umbrella </p>
            </Col>
            <Col xs={12}>
              {" "}
              <p>Devo prendere l'ombrello?</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
export default MyHeader;
