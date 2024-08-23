import { ForecastIcon } from "@/components/forecastIcon";
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
    const celsius = convertFahrenheitToCelsius(temperature);
    return `${temperature}° F / ${celsius.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}° C`;
  }, [temperature]);

  return (
    <div className="col-span-3 grid grid-cols-subgrid items-center gap-0 rounded bg-accent px-2 py-1">
      <div>{period.name}</div>
      <ForecastIcon period={period} />
      <div className="text-end">{temperatureDisplay}</div>
    </div>
  );
};
