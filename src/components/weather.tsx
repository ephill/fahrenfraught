import { convertFahrenheitToCelsius } from "@/lib/convertTemp";
import { GeoLocation } from "@/lib/geoLocation";
import {
  GetForecastResponse,
  GetPointResponse,
  getWeatherData,
  RelativeLocation,
} from "@/lib/getWeatherData";
import { useEffect, useMemo, useState } from "react";

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

  const cityState = useMemo(() => {
    if (point) {
      const relativeLocation = point.properties
        .relativeLocation as RelativeLocation;

      return `${relativeLocation.properties.city}, ${relativeLocation.properties.state}`;
    }
  }, [point]);

  if (!point || !forecast) {
    return null;
  }

  return (
    <>
      <div>Showing location data for {cityState}</div>
      <div className="flex flex-col">
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
