import { ForecastPeriods } from "@/components/forecastPeriods";
import { Location } from "@/components/location";
import { GeoLocation } from "@/lib/geoLocation";
import {
  GetForecastResponse,
  GetPointResponse,
  getWeatherData,
} from "@/lib/getWeatherData";
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
    <div className="flex flex-col gap-2">
      <Location point={point} />
      <ForecastPeriods forecast={forecast} />
    </div>
  );
};
