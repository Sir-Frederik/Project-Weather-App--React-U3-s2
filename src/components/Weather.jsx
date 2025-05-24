import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import rainImg from "../assets/WeatherIcon/Rain.png";

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
      <Container className="text-center mt-5  ">
        <Row className="align-items-center g-0 ">
          <Col xs={12}>
            <h3> {locationName} </h3>
          </Col>
          <Col xs={12} md={6} className="d-flex justify-content-center">
            <img src={rainImg} className="img-fluid w-25 rounded" />
          </Col>
          <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
            <h3 className="text-center"> {temperature} </h3>
            {/* <p> °C</p> */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Weather;
