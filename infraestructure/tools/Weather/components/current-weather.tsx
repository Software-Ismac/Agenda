import React from "react";
import { Card, CardBody, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";

interface CurrentWeatherProps {
  weatherData: any; // Replace 'any' with a more specific type if possible
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weatherData }) => {
  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const temperature = weatherData?.current?.temperature_2m;
  const apparentTemperature = weatherData?.current?.apparent_temperature;
  const humidity = weatherData?.current?.relative_humidity_2m;
  const windSpeed = weatherData?.hourly?.wind_speed_10m?.[0];
  const uvIndex = weatherData?.hourly?.uv_index?.[0];
  const isDay = weatherData?.current?.is_day === 1;
  const hourlyTemperatures = weatherData?.hourly?.temperature_2m?.slice(0, 8);
  const hourlyTimestamps = weatherData?.hourly?.time?.slice(0, 8);

  const getWeatherIcon = () => {
    if (isDay) {
      return "lucide:sun";
    } else {
      return "lucide:moon";
    }
  };

  const getWeatherDescription = () => {
    if (isDay) {
      return "Soleado";
    } else {
      return "Despejado";
    }
  };

  const getRainChance = () => {
    const rain = weatherData?.hourly?.rain?.[0];
    if (rain > 0) {
      return `${Math.round(rain * 100)}% de lluvia`;
    } else {
      return "0% de lluvia";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <Icon icon={getWeatherIcon()} className="text-6xl text-yellow-500" />
          <div>
            <h2 className="text-4xl font-bold">{temperature}°C</h2>
            <p className="text-default-500">{getWeatherDescription()}</p>
          </div>
        </div>

        <div className="mt-4 md:mt-0 flex flex-col items-end">
          <div className="flex items-center gap-2">
            <p className="text-sm text-default-500">Sensación térmica:</p>
            <p className="font-medium">{apparentTemperature}°C</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-default-500">Humedad:</p>
            <p className="font-medium">{humidity}%</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-default-500">Viento:</p>
            <p className="font-medium">{windSpeed} km/h</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Hoy</h3>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {hourlyTemperatures?.map((temp: number, index: number) => {
            const time = hourlyTimestamps[index].split('T')[1].slice(0, 5);
            return (
              <Card key={index} className="border border-default-200">
                <CardBody className="p-2 text-center">
                  <p className="text-xs text-default-500">{time}</p>
                  <Icon
                    icon={isDay ? "lucide:sun" : "lucide:moon"}
                    className={`text-xl mx-auto my-2 ${isDay ? "text-yellow-500" : "text-blue-400"}`}
                  />
                  <p className="text-sm font-medium">{temp}°C</p>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Chip color="success" variant="flat" startContent={<Icon icon="lucide:umbrella" />}>
          {getRainChance()}
        </Chip>
        <Chip color="primary" variant="flat" startContent={<Icon icon="lucide:wind" />}>
          Viento ligero
        </Chip>
        <Chip color="warning" variant="flat" startContent={<Icon icon="lucide:sun" />}>
          UV: {uvIndex} Moderado
        </Chip>
      </div>
    </div>
  );
};
