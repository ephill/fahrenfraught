import { Location } from "@/components/location";
import { convertFahrenheitToCelsius } from "@/lib/convertTemp";
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
    <>
      <div className="flex flex-col">
        <Location point={point} />
        {forecast.properties?.periods &&
          forecast.properties.periods.map((p) => (
            <div key={p.number}>
              {p.name} = {p.temperature as number} /{" "}
              {convertFahrenheitToCelsius(p.temperature as number)}
            </div>
          ))}
      </div>
    </>
  );
};
