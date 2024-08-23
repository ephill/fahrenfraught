import { convertFahrenheitToCelsius } from "@/lib/convertTemp";
import type { components } from "@/lib/weather-gov-schema";
import { useMemo } from "react";

type Period = components["schemas"]["GridpointForecastPeriod"];

export const ForecastPeriod = (props: { period: Period }) => {
  const { period } = props;

  // TODO (EvanP): Temperature as number is deprecated, switch to quantitative
  // value
  const temperature = period.temperature as number;

  const temperatureDisplay = useMemo(() => {
    const t = temperature as number;
    return `${t}° F / ${convertFahrenheitToCelsius(t)}° C`;
  }, [temperature]);

  return (
    <div>
      {period.name} = {temperatureDisplay}
    </div>
  );
};
