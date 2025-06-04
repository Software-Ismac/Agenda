import React, { useState, useEffect } from "react";

import { Icon } from "@iconify/react";
import dayjs from "dayjs";

export const WeatherHeader = () => {
  const [currentDateTime, setCurrentDateTime] = useState(dayjs());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(dayjs());
    }, 60000); // Update every minute

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Icon icon="lucide:map-pin" />
            Ismac Tumbaco-Quito
          </h1>
          <p className="text-sm opacity-90">
            {currentDateTime.format("dddd, DD de MMMM • HH:mm")}
          </p>
        </div>
      </div>
    </div>
  );
};
