import { convertFahrenheitToCelsius } from "@/lib/convertTemp";
import { GetForecastResponse } from "@/lib/getWeatherData";

export const ForecastPeriods = (props: { forecast: GetForecastResponse }) => {
  const { forecast } = props;

  return (
    <>
      {forecast.properties?.periods &&
        forecast.properties.periods.map((p) => (
          <div key={p.number}>
            {p.name} = {p.temperature as number} /{" "}
            {convertFahrenheitToCelsius(p.temperature as number)}
          </div>
        ))}
    </>
  );
};
