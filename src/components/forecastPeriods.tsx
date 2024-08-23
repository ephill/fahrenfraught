import { ForecastPeriod } from "@/components/forecastPeriod";
import { GetForecastResponse } from "@/lib/getWeatherData";

export const ForecastPeriods = (props: { forecast: GetForecastResponse }) => {
  const { forecast } = props;

  return (
    <>
      {forecast.properties?.periods &&
        forecast.properties.periods.map((p) => (
          <ForecastPeriod key={p.number!} period={p} />
        ))}
    </>
  );
};
