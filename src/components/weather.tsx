import { ForecastPeriods } from "@/components/forecastPeriods";
import { Location } from "@/components/location";
import { GeoLocation } from "@/lib/geoLocation";
import { getWeatherData } from "@/lib/getWeatherData";
import { GetForecastResponse, GetPointResponse } from "@/lib/types";
import { WeatherContext } from "@/lib/weatherContext";
import { useEffect, useState } from "react";

export const Weather = (props: { location: GeoLocation }) => {
  const { location } = props;

  const [forecast, setForecast] = useState<GetForecastResponse>();
  const [point, setPoint] = useState<GetPointResponse>();
  useEffect(() => {
    getWeatherData(location).then((res) => {
      setForecast(res.forecast);
      setPoint(res.point);
    });
  }, [location]);

  if (!point || !forecast) {
    return null;
  }

  return (
    <WeatherContext.Provider
      value={{
        point,
        forecast,
      }}
    >
      <div className="flex flex-col gap-3">
        <Location point={point} />
        <ForecastPeriods forecast={forecast} />
      </div>
    </WeatherContext.Provider>
  );
};
