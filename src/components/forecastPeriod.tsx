import { convertFahrenheitToCelsius } from "@/lib/convertTemp";
import type { components } from "@/lib/weather-gov-schema";

type Period = components["schemas"]["GridpointForecastPeriod"];

export const ForecastPeriod = (props: { period: Period }) => {
  const { period } = props;
  return (
    <div key={period.number}>
      {period.name} = {period.temperature as number} /{" "}
      {convertFahrenheitToCelsius(period.temperature as number)}
    </div>
  );
};
