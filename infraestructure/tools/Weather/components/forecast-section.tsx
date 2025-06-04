import React from "react";
import { Card, CardBody, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";

interface ForecastSectionProps {
  weatherData: any; // Replace 'any' with a more specific type if possible
}

interface ForecastItem {
  day: string;
  date: string;
  icon: string;
  temp: string;
  tempMin: string;
  condition: string;
  precipitation: string;
}

export const ForecastSection: React.FC<ForecastSectionProps> = ({ weatherData }) => {
  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const forecast = weatherData?.daily?.time?.map((date: string, index: number) => {
    const maxTemp = weatherData?.daily?.temperature_2m_max[index];
    const minTemp = weatherData?.daily?.temperature_2m_min[index];
    const day = new Date(date).toLocaleDateString('es-ES', { weekday: 'long' });
    const formattedDate = new Date(date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });

    return {
      day: day.charAt(0).toUpperCase() + day.slice(1),
      date: formattedDate,
      icon: "lucide:cloud-sun", // Replace with logic to determine icon based on weather conditions
      temp: `${maxTemp}°C`,
      tempMin: `${minTemp}°C`,
      condition: "Parcialmente nublado", // Replace with actual weather condition
      precipitation: "10%" // Replace with actual precipitation data
    };
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Pronóstico de 5 días</h3>

      <Card>
        <CardBody className="p-0">
          {forecast?.map((day: ForecastItem, index: number) => (
            <React.Fragment key={index}>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10">
                    <Icon icon={day.icon} className="text-2xl text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{day.day}</p>
                    <p className="text-xs text-default-500">{day.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-xs text-default-500 hidden md:block">
                    <p>{day.condition}</p>
                    <p>Precipitación: {day.precipitation}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-default-500">{day.tempMin}</span>
                    <span className="font-semibold">{day.temp}</span>
                  </div>
                </div>
              </div>
              {index < forecast.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </CardBody>
      </Card>

      <div className="text-center text-sm text-default-500 mt-4">
        <p>Datos actualizados hace 30 minutos</p>
      </div>
    </div>
  );
};
