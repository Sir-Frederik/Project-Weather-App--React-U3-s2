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
import Footer from "./Footer";

// Mi serve per selezionare le immagini corrette in base alle informazioni delle api
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

//Mi serve a selezionare un array di oggetti che prenderà solo i giorni alle 12:00. Mi garantisce di prendere 5 giorni diversi
let dailyForecast = [];

const Weather = () => {
  //Qui dichiaro tutti gli stati che mi serviranno
  const navigate = useNavigate();
  const { lat, lon } = useParams();

  const [weatherDescription, setWeatherDescription] = useState("");
  const [weatherType, setWeatherType] = useState("");
  const [locationName, setLocationName] = useState("");
  const [temperature, setTemperature] = useState("");

  //gli stati delle immagini e delle icone grosse (quelle piccole del forecast le prendo dalle api)
  const [weatherImgType, setWeatherImgType] = useState("");
  const [funnyImgType, setFunnyImgType] = useState("");
  const [forecastIcon1, setForecastIcon1] = useState("");
  const [forecastIcon2, setForecastIcon2] = useState("");
  const [forecastIcon3, setForecastIcon3] = useState("");
  const [forecastIcon4, setForecastIcon4] = useState("");
  const [forecastIcon5, setForecastIcon5] = useState("");

  // gli stati che mi salveranno le temperature del forecast
  const [forecastTmp1, setForecastTmp1] = useState("");
  const [forecastTmp2, setForecastTmp2] = useState("");
  const [forecastTmp3, setForecastTmp3] = useState("");
  const [forecastTmp4, setForecastTmp4] = useState("");
  const [forecastTmp5, setForecastTmp5] = useState("");

  // gli stati che mi salveranno le date del forecast
  const [forecastDate1, setForecastDate1] = useState("");
  const [forecastDate2, setForecastDate2] = useState("");
  const [forecastDate3, setForecastDate3] = useState("");
  const [forecastDate4, setForecastDate4] = useState("");
  const [forecastDate5, setForecastDate5] = useState("");

  //Questo mi servirà per stampare le data corrente.
  const [nowDate, setNowDate] = useState("");

  //Qesta funzione fetch mi carica il meteo corrente, converito in italiano e in unità di misura metrica (°C, m/s qualora mi servisse la vel del vento)
  const searchWeather = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2f26da6fb39093c3a6b6f3b61989f718&units=metric&lang=it`, {})
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })

      .then((weather) => {
        // qui setto gli stati della descrizione, immagini, e temperatura, che poi renderizzerò nel return.
        setWeatherDescription(weather.weather[0].description);
        setWeatherType(weather.weather[0].main);
        setLocationName(weather.name);
        setTemperature(weather.main.temp);
        //qui setto lo stato nowDate e ci metto il valore dt in formato unix. Lo converto in una data moltiplicandolo per 1000 e lo converto in stringa.
        // Noto però che la data fornita non è quella del fuso  orario della città, ma quella di Roma.
        setNowDate(new Date(weather.dt * 1000).toLocaleString());
        console.log(nowDate + "data  attuale");

        //qui mi collego a weatherImgMap per usare le immagini e le icone correte in base al contenuto del meteo dell'api
        const mainType = weather.weather[0].main;
        const mappedImages = weatherImgsMap[mainType] || {};
        const imgIcon = mappedImages.icon || null;
        const funnyImg = mappedImages.funny || null;

        setWeatherImgType(imgIcon);
        setFunnyImgType(funnyImg);
      })
      .catch((error) => {
        console.error("Si è verificato un errore:", error);
        navigate("/error");
      });
  };

  //Con questa api posso vedere il meteo per 5 giorni, ogni 3 ore, ma a me serviranno solo 5 rilevazioni alle 12:00
  const forecast = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=2f26da6fb39093c3a6b6f3b61989f718&units=metric&lang=it`, {})
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((forecast) => {
        // Qui vado a riempire l'array specificato prima, selezionando tutti i valori che hanno "12:00:00" nel dt_txt del json.
        dailyForecast = forecast.list.filter((item) => item.dt_txt.endsWith("12:00:00")).slice(0, 5);
        // console.log(dailyForecast);

        //Mi garantisco  che i valori siano almeno 5 e setto gli stati delle icone, della temperatura  e della data in base ai valori del mio array.
        if (dailyForecast.length >= 5) {
          setForecastIcon1(dailyForecast[0].weather[0].icon);
          setForecastIcon2(dailyForecast[1].weather[0].icon);
          setForecastIcon3(dailyForecast[2].weather[0].icon);
          setForecastIcon4(dailyForecast[3].weather[0].icon);
          setForecastIcon5(dailyForecast[4].weather[0].icon);

          setForecastTmp1(dailyForecast[0].main.temp);
          setForecastTmp2(dailyForecast[1].main.temp);
          setForecastTmp3(dailyForecast[2].main.temp);
          setForecastTmp4(dailyForecast[3].main.temp);
          setForecastTmp5(dailyForecast[4].main.temp);

          //qui mi chiamerò la funzione formatShortDate specificata in basso
          setForecastDate1(formatShortDate(dailyForecast[0].dt_txt));
          setForecastDate2(formatShortDate(dailyForecast[1].dt_txt));
          setForecastDate3(formatShortDate(dailyForecast[2].dt_txt));
          setForecastDate4(formatShortDate(dailyForecast[3].dt_txt));
          setForecastDate5(formatShortDate(dailyForecast[4].dt_txt));
        }
      })
      .catch((error) => {
        console.error("Si è verificato un errore:", error);
        navigate("/error");
      });
  };

  // questa funzione mi tronca ritorna la data con solo il giorno ed il mese.
  const formatShortDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  // questo useEffect si carica appena il componente viene renderizzato e mi fa partire le due funzioni di fetch.
  useEffect(() => {
    searchWeather(lat, lon);
    forecast(lat, lon);
  }, [lat, lon]);

  //gestisce il pulsante, mi fa tornare alla main route.
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <>
      {/* Qui mi creo tutta la struttura estetica e mi stampo le informazioni. Ci sto ancora lavorando.  */}
      <div className="d-flex flex-column min-vh-100">
        <Container className="mt-5 flex-grow-1">
          <Row className="align-items-start">
            <Col xs={3} md="auto" className="d-flex justify-content-center">
              <img src={funnyImgType} alt="funny Image" className="img-fluid funnyImg" />
            </Col>

            <Col>
              <Row className="justify-content-center text-center">
                <Col xs={12}>
                  <h3 className="fw-bold mb-3 cityName">{locationName}</h3>
                </Col>
                <Col>
                  <h5> Meteo Attuale ( {nowDate} )</h5>
                </Col>
                <Col xs={12}>
                  <h4 className="fw-bold  mt-4 fs-2">{weatherDescription.toUpperCase()}</h4>
                </Col>

                <Col xs={12} md="auto" className="d-flex align-items-center justify-content-center weather-block-lg">
                  <Row>
                    <Col xs={12} md={6}>
                      <img src={weatherImgType} className="img-fluid weatherImg mb-5 " alt="Meteo Icon" />{" "}
                    </Col>
                    <Col xs={12} md={6} className="d-flex flex-column align-items-center">
                      <h2 className="temperature mb-0">{temperature}</h2>
                      <small className="unit">°C</small>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Container className="mt-2">
            <Button variant="primary" onClick={handleGoHome}>
              Homepage
            </Button>
            <h2 className="mt-4"> Meteo dei prossimi giorni:</h2>
            <Table bordered className="mt-3 mb-5">
              <thead>
                <tr>
                  <th>
                    <h5> {forecastDate1} </h5>
                  </th>
                  <th>
                    <h5> {forecastDate2} </h5>
                  </th>
                  <th>
                    <h5> {forecastDate3} </h5>
                  </th>
                  <th>
                    <h5> {forecastDate4} </h5>
                  </th>
                  <th>
                    <h5> {forecastDate5} </h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img src={`https://openweathermap.org/img/wn/${forecastIcon1}@2x.png`} alt="Weather icon" />
                  </td>
                  <td>
                    {" "}
                    <img src={`https://openweathermap.org/img/wn/${forecastIcon2}@2x.png`} alt="Weather icon" />
                  </td>
                  <td>
                    <img src={`https://openweathermap.org/img/wn/${forecastIcon3}@2x.png`} alt="Weather icon" />
                  </td>
                  <td>
                    <img src={`https://openweathermap.org/img/wn/${forecastIcon4}@2x.png`} alt="Weather icon" />
                  </td>
                  <td>
                    <img src={`https://openweathermap.org/img/wn/${forecastIcon5}@2x.png`} alt="Weather icon" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5> {forecastTmp1} °C </h5>
                  </td>
                  <td>
                    <h5> {forecastTmp2} °C </h5>
                  </td>
                  <td>
                    <h5> {forecastTmp3} °C </h5>
                  </td>
                  <td>
                    <h5> {forecastTmp4} °C </h5>
                  </td>
                  <td>
                    <h5> {forecastTmp5} °C </h5>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Container>
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default Weather;
