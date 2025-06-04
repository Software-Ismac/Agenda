import React from "react";
import { Card, CardBody, Tabs, Tab, Divider, Button } from "@heroui/react";
import { WeatherHeader } from "./components/weather-header";
import { CurrentWeather } from "./components/current-weather";
import { ForecastSection } from "./components/forecast-section";
import { WeatherDetails } from "./components/weather-details";

export default function App() {
  const [selected, setSelected] = React.useState("today");
  const [weatherData, setWeatherData] = React.useState(null);
  const getData = async () => {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=-0.2309&longitude=-78.5211&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m,rain,precipitation,soil_temperature_0cm,soil_moisture_0_to_1cm,wind_speed_10m,uv_index,temperature_800hPa&current=temperature_2m,relative_humidity_2m,is_day,apparent_temperature&timezone=auto&past_days=5"
    );
    const data = await response.json();
    setWeatherData(data);
  };
  React.useEffect(() => {
    getData();
  }, []);
  console.log(weatherData);
  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <Card className="overflow-visible shadow-md">
          <CardBody className="p-0 overflow-hidden">
            <WeatherHeader />

            <div className="p-4 md:p-6">
              <Tabs
                aria-label="Weather options"
                selectedKey={selected}
                //@ts-ignore
                onSelectionChange={(key: Key) => setSelected(key as string)}
                variant="underlined"
                color="primary"
                classNames={{
                  tabList: "gap-6",
                  cursor: "w-full",
                  tab: "px-0 h-12",
                }}
              >
                <Tab key="today" title="Hoy" />
                <Tab key="forecast" title="Pronóstico" />
                <Tab key="details" title="Detalles" />
              </Tabs>

              <div className="mt-6">
                {selected === "today" && <CurrentWeather weatherData={weatherData} />}
                {selected === "forecast" && <ForecastSection weatherData={weatherData} />}
                {selected === "details" && <WeatherDetails weatherData={weatherData} />}
              </div>
            </div>

            <Divider />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
