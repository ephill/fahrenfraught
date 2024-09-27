import { ForecastIcon } from "@/components/forecastIcon";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { convertFahrenheitToCelsius } from "@/lib/convertTemp";
import { getHourlyForecast } from "@/lib/getWeatherData";
import { ForecastDay, GetHourlyForecastResponse } from "@/lib/types";
import { cn } from "@/lib/utils";
import { WeatherContext } from "@/lib/weatherContext";
import { useCallback, useContext, useMemo, useState } from "react";

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

  const weatherContext = useContext(WeatherContext);
  const [hourlyForecast, setHourlyForecast] =
    useState<GetHourlyForecastResponse>();

  const loadHourlyForecast = useCallback(
    async (load: boolean) => {
      if (load && weatherContext?.point) {
        // TODO (EvanP): getHourlyForecast fetches the hourly forecast for the
        // entire week so we should probably move this up.
        setHourlyForecast(await getHourlyForecast(weatherContext.point));
      }
    },
    [weatherContext?.point],
  );

  const todayHourlyPeriods = useMemo(() => {
    if (hourlyForecast) {
      return hourlyForecast.properties.periods?.filter((p) => {
        if (p.startTime) {
          const st = new Date(p.startTime);
          if (
            st.getMonth() === day.date.getMonth() &&
            st.getDay() === day.date.getDay() &&
            st.getFullYear() === day.date.getFullYear()
          ) {
            return true;
          }
        }

        return false;
      });
    }

    return [];
  }, [hourlyForecast, day.date]);

  return (
    <Collapsible className="contents" onOpenChange={loadHourlyForecast}>
      <CollapsibleTrigger asChild>
        <div
          className={cn(
            "col-span-3 grid grid-cols-subgrid items-center rounded bg-accent px-4 py-2 hover:cursor-pointer",
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
      </CollapsibleTrigger>
      <CollapsibleContent>
        {todayHourlyPeriods?.map((p) => (
          <div key={p.number}>
            {/* TODO (EvanP): Temperature as number is deprecated, switch to 
             quantitative value */}
            {p.startTime} {p.temperature as number}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};
