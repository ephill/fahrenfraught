import { ForecastPeriod } from "@/components/forecastPeriod";
import { ForecastDay, GetForecastResponse, Period } from "@/lib/types";
import { useMemo } from "react";

export const ForecastPeriods = (props: { forecast: GetForecastResponse }) => {
  const { forecast } = props;

  const groupedByDay = useMemo(() => {
    const ret: ForecastDay[] = [];
    if (
      forecast.properties?.periods &&
      forecast.properties.periods.length > 0
    ) {
      const periods = forecast.properties.periods;
      let currentDate = new Date(periods[0].startTime!);
      let day: Period | undefined = undefined;
      let night: Period | undefined = undefined;
      for (const p of periods) {
        const date = new Date(p.startTime!);
        if (date.getDate() === currentDate.getDate()) {
          if (p.isDaytime) {
            day = p;
          } else {
            night = p;
          }
        } else {
          ret.push({ date: currentDate, day, night });
          currentDate = date;
          day = p.isDaytime ? p : undefined;
          night = p.isDaytime ? undefined : p;
        }
      }
    }

    return ret;
  }, [forecast.properties?.periods]);

  return (
    <div className="grid grid-cols-[minmax(0,_1fr)_auto_minmax(0,_1fr)] gap-y-2">
      {groupedByDay.map((day) => (
        <ForecastPeriod key={day.date.getUTCMilliseconds()} day={day} />
      ))}
    </div>
  );
};
