import { convertFahrenheitToCelsius } from "@/lib/convertTemp";
import { GeoLocation } from "@/lib/geoLocation";
import { getWeatherData } from "@/lib/getWeatherData";
import { useEffect, useState } from "react";

export const Weather = (props: { location: GeoLocation }) => {
  const { location } = props;

  const [periods, setPeriods] = useState<any>();
  useEffect(() => {
    getWeatherData(location).then((res) => setPeriods(res));
  }, [location]);
  return (
    <div className="flex flex-col">
      {periods &&
        periods.map((p: any) => (
          <div key={p.number}>
            {p.name} = {p.temperature} /{" "}
            {convertFahrenheitToCelsius(p.temperature)}
          </div>
        ))}
    </div>
  );
};
