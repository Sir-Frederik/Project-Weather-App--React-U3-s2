import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import rainImg from "../assets/WeatherIcon/Rain.png";
import cloudsImg from "../assets/WeatherIcon/clouds.png";
import clearImg from "../assets/WeatherIcon/Sun.png";
import thunderImg from "../assets/WeatherIcon/Storm.png";
import drizzleImg from "../assets/WeatherIcon/Drizzle.png";
import snowImg from "../assets/WeatherIcon/Snow.png";
import fogImg from "../assets/WeatherIcon/Fog.png";

import umbrellaCoyote from "../assets/wile_umbrella.png";
import bugsSun from "../assets/bugs_sun.png";
import tweetyCloud from "../assets/tweety_clouds.png";
import coyoteThunder from "../assets/coyote_thunder.png";
import snowMan from "../assets/snowman.png";
import coyoteFog from "../assets/fog.png";

const weatherImgsMap = {
  Rain: { icon: rainImg, funny: umbrellaCoyote },
  Clouds: { icon: cloudsImg, funny: tweetyCloud },
  Clear: { icon: clearImg, funny: bugsSun },
  Thunderstorm: { icon: thunderImg, funny: coyoteThunder },
  Drizzle: { icon: drizzleImg, funny: umbrellaCoyote },
  Snow: { icon: snowImg, funny: snowMan },
  Mist: { icon: fogImg, funny: coyoteFog },
  Fog: { icon: fogImg, funny: coyoteFog },
  Dust: { icon: fogImg, funny: coyoteFog },
  Sand: { icon: fogImg, funny: coyoteFog },
  Haze: { icon: fogImg, funny: coyoteFog },
  Smoke: { icon: fogImg, funny: coyoteFog },
};

const Weather = () => {
  const navigate = useNavigate();
  const { lat, lon } = useParams();
  const [weatherDescription, setWeatherDescription] = useState("");
  const [weatherType, setWeatherType] = useState("");
  const [locationName, setLocationName] = useState("");
  const [temperature, setTemperature] = useState("");
  const [weatherImgType, setWeatherImgType] = useState("");
  const [funnyImgType, setFunnyImgType] = useState("");
  const [forecastIcon1, setForecastIcon1] = useState("");
  const [forecastIcon2, setForecastIcon2] = useState("");
  const [forecastIcon3, setForecastIcon3] = useState("");
  const [forecastIcon4, setForecastIcon4] = useState("");
  const [forecastIcon5, setForecastIcon5] = useState("");

  const searchWeather = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2f26da6fb39093c3a6b6f3b61989f718&units=metric&lang=it`, {})
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })

      .then((weather) => {
        setWeatherDescription(weather.weather[0].description);
        setWeatherType(weather.weather[0].main);
        setLocationName(weather.name);
        setTemperature(weather.main.temp);

        const mainType = weather.weather[0].main;
        const mappedImages = weatherImgsMap[mainType] || {};
        const imgIcon = mappedImages.icon || null;
        const funnyImg = mappedImages.funny || null;
        // const funnyImg = mappedImages.funny || null;

        setWeatherImgType(imgIcon);
        setFunnyImgType(funnyImg);
      })
      .catch((error) => {
        console.error("Si è verificato un errore:", error);
        navigate("/error");
      });
  };
  const forecast = (lat, lon) => {
    fetch(`api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=2f26da6fb39093c3a6b6f3b61989f718&units=metric&lang=it`, {})
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((forecast) => {
        setForecastIcon1(forecast.list[0].weather[0].icon);
        setForecastIcon2(forecast.list[1].weather[1].icon);
        setForecastIcon3(forecast.list[2].weather[2].icon);
        setForecastIcon4(forecast.list[3].weather[3].icon);
        setForecastIcon5(forecast.list[4].weather[4].icon);
        console.log("ciaos ono l'icona: " + forecastIcon1);
      })
      .catch((error) => {
        console.error("Si è verificato un errore:", error);
        navigate("/error");
      });
  };

  useEffect(() => {
    searchWeather(lat, lon);
    // forecast(lat, lon);
  }, [lat, lon]);

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <>
      <Container className="mt-5">
        <Row className="align-items-start">
          <Col xs={3} md="auto" className="d-flex justify-content-center">
            <img src={funnyImgType} alt="funny Image" className="img-fluid funnyImg" />
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
        <Button variant="primary" onClick={handleGoHome}>
          Homepage
        </Button>

        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <img src={`https://openweathermap.org/img/wn/${forecastIcon1}@2x.png`} alt="Weather icon" />
              </td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Weather;
