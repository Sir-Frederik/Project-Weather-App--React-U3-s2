import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import rainImg from "../assets/WeatherIcon/Rain.png";
import cloudsImg from "../assets/WeatherIcon/clouds.png";
import clearImg from "../assets/WeatherIcon/Sun.png";
import thunderImg from "../assets/WeatherIcon/Storm.png";
import drizzleImg from "../assets/WeatherIcon/Drizzle.png";
import snowImg from "../assets/WeatherIcon/Snow.png";
import fogImg from "../assets/WeatherIcon/Fog.png";

import umbrellaCoyote from "../assets/wile_umbrella.png";
const weatherImgsMap = {
  Rain: rainImg,
  Clouds: cloudsImg,
  Clear: clearImg,
  Thunderstorm: thunderImg,
  Drizzle: drizzleImg,
  Snow: snowImg,
  Mist: fogImg,
  Fog: fogImg,
  Dust: fogImg,
  Sand: fogImg,
  Haze: fogImg,
  Smoke: fogImg,
};

const Weather = () => {
  const navigate = useNavigate();
  const { lat, lon } = useParams();
  const [weatherDescription, setWeatherDescription] = useState("");
  const [weatherType, setWeatherType] = useState("");
  const [locationName, setLocationName] = useState("");
  const [temperature, setTemperature] = useState("");
  const [weatherImgType, setWeatherImgType] = useState("");
  3;
  const searchWeather = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2f26da6fb39093c3a6b6f3b61989f718&units=metric&lang=it`, {})
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })

      .then((weather) => {
        // console.log("ciao sono searchWeather e ti do i parametri: " + lat + " " + lon);

        setWeatherDescription(weather.weather[0].description);
        setWeatherType(weather.weather[0].main);
        setLocationName(weather.name);
        setTemperature(weather.main.temp);

        // const mainType = "Rain";
        const mainType = weather.weather[0].main;
        const imgIcon = weatherImgsMap[mainType] || null;
        setWeatherImgType(imgIcon);

        /*  if (weatherType === "Clouds") {
          weatherImgType = cloudsImg;
          console.log(weatherImgType);
        } */
      })
      .catch((error) => {
        console.error("Si è verificato un errore:", error);
        navigate(`/error`);
      });
  };
  useEffect(() => {
    searchWeather(lat, lon);
  }, [lat, lon]);

  return (
    <>
      <Container className="mt-5">
        <Row className="align-items-start">
          <Col xs={3} md="auto" className="d-flex justify-content-center">
            <img src={umbrellaCoyote} alt="Coyote" className="img-fluid" style={{ maxWidth: "200px", width: "100%" }} />
          </Col>

          <Col>
            <Row className="justify-content-center text-center">
              <Col xs={12}>
                <h3 className="fw-bold mb-4 cityName">{locationName}</h3>
              </Col>
              <Col xs={12}>
                <h4 className="fw-bold mb-4">{weatherDescription}</h4>
              </Col>

              <Col xs={12} md="auto" className="d-flex align-items-center justify-content-center weather-block-lg">
                <Row>
                  <Col xs={12} md={6}>
                    <img src={weatherImgType} className="img-fluid weatherImg mb-5 " alt="Meteo Icon" />{" "}
                  </Col>
                  <Col xs={12} md={6} className="d-flex flex-column align-items-center">
                    <h2 className="temperature mb-0">{temperature}</h2>
                    <small className="unit" style={{ marginTop: "-0.5em" }}>
                      °C
                    </small>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Weather;
