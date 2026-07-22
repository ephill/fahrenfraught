import { ForecastPeriods } from "@/components/forecastPeriods";
import { Location } from "@/components/location";
import { GeoLocation } from "@/lib/geoLocation";
import { getWeatherData } from "@/lib/getWeatherData";
import { GetForecastResponse, GetPointResponse } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export const Weather = (props: { location: GeoLocation }) => {
  const { location } = props;

  const [forecast, setForecast] = useState<GetForecastResponse>();
  const [point, setPoint] = useState<GetPointResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    getWeatherData(location)
      .then((res) => {
        // Ignore responses from a location the user has already moved on from.
        if (!active) {
          return;
        }
        setForecast(res.forecast);
        setPoint(res.point);
        setLoading(false);
      })
      .catch(() => {
        if (active) {
          setError(true);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [location]);

  if (error) {
    return (
      <span className="text-center text-destructive">
        Couldn&apos;t load the forecast for this location.
      </span>
    );
  }

  if (loading || !point || !forecast) {
    return (
      <Loader2
        className="h-8 w-8 animate-spin text-muted-foreground"
        aria-label="Loading forecast"
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <Location point={point} />
      <ForecastPeriods forecast={forecast} />
    </div>
  );
};
