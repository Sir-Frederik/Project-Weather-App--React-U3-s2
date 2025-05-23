import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Weather = () => {
  const navigate = useNavigate();
  const { lat, lon } = useParams();
  const [locationWeather, setLocationWeather] = useState("");

  const searchWeather = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2f26da6fb39093c3a6b6f3b61989f718&units=metric&lang=it`, {})
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })

      .then((weather) => {
        console.log("ciao sono searchWeather e ti do i parametri: " + lat + " " + lon);

        setLocationWeather(weather.weather[0].description);
        console.log(locationWeather);
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

  return <p>{locationWeather}</p>;
};

export default Weather;
