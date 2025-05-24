import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import rainImg from "../assets/WeatherIcon/Rain.png";
import cloudsImg from "../assets/WeatherIcon/clouds.png";
import umbrellaCoyote from "../assets/wile_umbrella.png";

const Weather = () => {
  const navigate = useNavigate();
  const { lat, lon } = useParams();
  const [weatherDescription, setWeatherDescription] = useState("");
  const [weatherType, setWeatherType] = useState("");
  const [locationName, setLocationName] = useState("");
  const [temperature, setTemperature] = useState("");
  let weatherImgType = "";

  const searchWeather = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2f26da6fb39093c3a6b6f3b61989f718&units=metric&lang=it`, {})
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })

      .then((weather) => {
        console.log("ciao sono searchWeather e ti do i parametri: " + lat + " " + lon);

        setWeatherDescription(weather.weather[0].description);
        setWeatherType(weather.weather[0].main);
        setLocationName(weather.name);
        setTemperature(weather.main.temp);

        if (weatherType === "Clouds") {
          weatherImgType = cloudsImg;
          console.log(weatherImgType);
        }
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
      <Container className="mt-5">
        <Row className="align-items-start">
          <Col xs="auto" className="d-flex justify-content-center">
            <img src={umbrellaCoyote} alt="Coyote" className="img-fluid" style={{ width: "200px" }} />
          </Col>

          <Col>
            <div className="text-center">
              <h3 className="fw-bold mb-4" style={{ fontSize: "2.2rem" }}>
                {locationName}
              </h3>
              <div className="d-flex flex-column flex-md-row align-items-center justify-content-center weather-block-lg">
                <img src={weatherImgType} className="img-fluid weatherImg mb-2 mb-md-0 me-md-4" alt="Meteo Icon" />
                <span className="d-flex flex-column align-items-center">
                  <h2 className="temperature mb-0">{temperature}</h2>
                  <small className="unit" style={{ marginTop: "-0.5em" }}>
                    °C
                  </small>
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Weather;
