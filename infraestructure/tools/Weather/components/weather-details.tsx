import React from "react";
import { Card, CardBody, Progress } from "@heroui/react";
import { Icon } from "@iconify/react";

interface WeatherDetailsProps {
  weatherData: any; // Replace 'any' with a more specific type if possible
}

export const WeatherDetails: React.FC<WeatherDetailsProps> = ({
  weatherData,
}) => {
  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const apparentTemperature = weatherData?.current?.apparent_temperature;
  const humidity = weatherData?.current?.relative_humidity_2m;
  const windSpeed = weatherData?.hourly?.wind_speed_10m?.[0];
  const uvIndex = weatherData?.hourly?.uv_index?.[0];

  const details = [
    {
      icon: "lucide:thermometer-sun",
      title: "Sensación térmica",
      value: `${apparentTemperature}°C`,
      color: "danger",
    },
    {
      icon: "lucide:droplets",
      title: "Humedad",
      value: `${humidity}%`,
      progress: humidity,
      color: "primary",
    },
    {
      icon: "lucide:wind",
      title: "Viento",
      value: `${windSpeed} km/h`,
      subtitle: "Dirección: NE",
      color: "default",
    },
    {
      icon: "lucide:gauge",
      title: "Presión",
      value: "1013 hPa",
      subtitle: "Normal",
      color: "default",
    },
    {
      icon: "lucide:eye",
      title: "Visibilidad",
      value: "10 km",
      subtitle: "Excelente",
      color: "success",
    },
    {
      icon: "lucide:sun",
      title: "Índice UV",
      value: `${uvIndex}`,
      subtitle: "Moderado",
      progress: uvIndex * 10,
      color: "warning",
    },
    {
      icon: "lucide:sunrise",
      title: "Amanecer",
      value: "06:45",
      color: "warning",
    },
    {
      icon: "lucide:sunset",
      title: "Atardecer",
      value: "21:15",
      color: "danger",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Detalles del clima</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {details.map((detail, index) => (
          <Card key={index} className="border border-default-200">
            <CardBody className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full bg-${detail.color}-100`}>
                  <Icon
                    icon={detail.icon}
                    className={`text-xl text-${detail.color}`}
                  />
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium">{detail.title}</p>
                  {detail.subtitle && (
                    <p className="text-xs text-default-500">
                      {detail.subtitle}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-semibold">{detail.value}</p>
                </div>
              </div>

              {detail.progress && (
                <Progress
                  value={detail.progress}
                  color={detail.color as any}
                  size="sm"
                  className="mt-2"
                />
              )}
            </CardBody>
          </Card>
        ))}
      </div>

      <Card className="border border-default-200">
        <CardBody>
          <h4 className="text-medium font-medium mb-2">Calidad del aire</h4>
          <Progress
            value={75}
            color="success"
            size="md"
            showValueLabel
            label="Buena"
            className="mb-2"
          />
          <p className="text-xs text-default-500">
            Índice de calidad del aire: 75/100 - Condiciones favorables para
            actividades al aire libre
          </p>
        </CardBody>
      </Card>
    </div>
  );
};
