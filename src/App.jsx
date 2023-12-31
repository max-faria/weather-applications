import { useState } from "react";
import "./App.css";
import Forecast from "./components/forecast/Forecast";
import Seacrh from "./components/search/Search";
import CurrentWeather from "./components/current-weather/currentWeather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api.js";
import AccordionTest from "./components/accordion-test/AccordionTest";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setforecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
    const [lat, lon] = searchData.value.split("  ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setforecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));

    console.log(lat);
    console.log(lon);
  };

  console.log(currentWeather);
  console.log(forecast);

  return (
    <div id="App" className="container">
      <Seacrh onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
      <AccordionTest
        title="Accordion Teste"
        text="Texte teste do accordion. "
      />
    </div>
  );
}

export default App;
