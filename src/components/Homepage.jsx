import { Col, Container, Row, Form, FormControl } from "react-bootstrap";
import { useState } from "react";
import MyHeader from "./MyHeader";
import { Await, useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Homepage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    searchLocation(searchQuery);
  };

  const searchLocation = (query) => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=2f26da6fb39093c3a6b6f3b61989f718`, {})
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })

      .then((location) => {
        const lon = location[0].lon;
        const lat = location[0].lat;
        // console.log("coordinate: " + lat + " " + lon);

        navigate(`/weather/${lat}/${lon}`);
      })
      .catch((error) => {
        console.error("Si è verificato un errore:", error);
        navigate(`/error`);
      });
  };
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Container fluid className="flex-grow-1 ms-3">
          <div className="ms-4">
            {" "}
            <MyHeader />
          </div>

          <Form onSubmit={handleSubmit} className="d-flex justify-content-center">
            <FormControl
              className="w-50 my-4"
              type="text"
              placeholder="Cerca una città per vederne il Meteo"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form>
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default Homepage;
