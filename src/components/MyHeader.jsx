import { Col, Container, Row } from "react-bootstrap";

function MyHeader() {
  return (
    <Container fluid>
      <Row className="align-items-center">
        <Col xs={3}>
          <img src="./src/assets/Gizmo_Umbrella.png" alt="Gizmo con ombrello" className="img-fluid" style={{ maxWidth: "100%", height: "auto" }} />
        </Col>
        <Col xs={9}>
          <h1 className="fs-1 mb-0">Tiny Umbrella</h1>
          <h2 className="fs-4 mt-0">...Devo prendere l'ombrello?</h2>
        </Col>
      </Row>
    </Container>
  );
}
export default MyHeader;
