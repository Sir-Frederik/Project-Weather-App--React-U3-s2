import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import MyHeader from "./MyHeader";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/weather");
  };
  return (
    <Container fluid>
      <Row>
        <Col>
          <MyHeader />
        </Col>
        <Col xs={12}>
          <Form onSubmit={handleSubmit} className="d-flex justify-content-center">
            <FormControl className="w-50 my-4" type="text" placeholder="Cerca una città" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Homepage;
