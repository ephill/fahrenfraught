import { ForecastIcon } from "@/components/forecastIcon";
import { convertFahrenheitToCelsius } from "@/lib/convertTemp";
import { ForecastDay } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

function convertToDisplayString(temperature?: number) {
  if (temperature) {
    const celsius = convertFahrenheitToCelsius(temperature);
    return `${temperature}° F / ${celsius.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}° C`;
  }

  return undefined;
}

export const ForecastPeriod = (props: { day: ForecastDay }) => {
  const { day } = props;

  // TODO (EvanP): Temperature as number is deprecated, switch to quantitative
  // value
  const dayTemperature = day.day?.temperature as number;
  const nightTemperature = day.night?.temperature as number;

  const dayTemperatureDisplay = useMemo(() => {
    return convertToDisplayString(dayTemperature);
  }, [dayTemperature]);

  const nightTemperaturDisplay = useMemo(() => {
    return convertToDisplayString(nightTemperature);
  }, [nightTemperature]);

  const isFullDay = useMemo(
    () =>
      dayTemperatureDisplay !== undefined &&
      nightTemperaturDisplay !== undefined,
    [dayTemperatureDisplay, nightTemperaturDisplay],
  );

  return (
    <div
      className={cn(
        "col-span-3 grid grid-cols-subgrid items-center rounded bg-accent px-4 py-2",
        {
          "grid-rows-2": isFullDay,
          "gap-y-2": isFullDay,
          "grid-rows-1": !isFullDay,
        },
      )}
    >
      <div className="row-span-2">{day.day?.name || day.night?.name}</div>
      {day.day && (
        <>
          <ForecastIcon period={day.day} />
          <div className="text-end">{dayTemperatureDisplay}</div>
        </>
      )}
      {day.night && (
        <>
          <ForecastIcon period={day.night} />
          <div className="text-end">{nightTemperaturDisplay}</div>
        </>
      )}
    </div>
  );
};
