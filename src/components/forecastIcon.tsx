import type { components } from "@/lib/weather-gov-schema";
import { CloudDrizzle, CloudRain, CloudSunRain, Moon, Sun } from "lucide-react";

type Period = components["schemas"]["GridpointForecastPeriod"];

export const ForecastIcon = (props: { period: Period }) => {
  const { period } = props;

  const className = "justify-self-center mx-3";

  const chancePrecipitation = period.probabilityOfPrecipitation?.value;
  if (chancePrecipitation && chancePrecipitation > 0) {
    if (chancePrecipitation < 30) {
      return <CloudSunRain className={className} />;
    } else if (chancePrecipitation < 60) {
      return <CloudDrizzle className={className} />;
    } else {
      return <CloudRain className={className} />;
    }
  }

  if (period.isDaytime === false) {
    return <Moon className={className} />;
  }

  return <Sun className={className} />;
};
