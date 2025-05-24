import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import rainImg from "../assets/WeatherIcon/Rain.png";
import umbrellaCoyote from "../assets/wile_umbrella.png";

const Weather = () => {
  const navigate = useNavigate();
  const { lat, lon } = useParams();
  const [weatherCondition, setWeatherCondition] = useState("");
  const [locationName, setLocationName] = useState("");
  const [temperature, setTemperature] = useState("");

  const searchWeather = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2f26da6fb39093c3a6b6f3b61989f718&units=metric&lang=it`, {})
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })

      .then((weather) => {
        console.log("ciao sono searchWeather e ti do i parametri: " + lat + " " + lon);

        setWeatherCondition(weather.weather[0].description);
        setLocationName(weather.name);
        setTemperature(weather.main.temp);
      })
      .catch((error) => {
        console.error("Si è verificato un errore:", error);
        navigate(`/error`);
      });
  };
  useEffect(() => {
    console.log("ciao sono weather e ti do i parametri: " + lat + " " + lon);
    searchWeather(lat, lon);
  });

  return (
    <>
      <Container className="text-center mt-5">
        <div>
          <h3 className="fw-bold mb-3">{locationName}</h3>
        </div>
        <div className="text-start mb-4">
          <img src={umbrellaCoyote} alt="Coyote" className="img-fluid" style={{ maxWidth: "150px" }} />
        </div>
        <Row className="justify-content-center">
          <Col xs="auto" className="d-flex flex-column flex-md-row align-items-center" style={{ fontSize: "3rem" }}>
            <img src={rainImg} className="weatherImg img-fluid me-md-4" alt="Meteo Icon" />
            <span>
              {" "}
              <h2 className="temperature">{temperature}</h2>
              <p className="unit"> °C</p>
            </span>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Weather;
