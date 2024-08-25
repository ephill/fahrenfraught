import { GeoLocation } from "@/lib/geoLocation";
import { GetForecastResponse, GetPointResponse } from "@/lib/types";

export async function getWeatherData(location: GeoLocation) {
  const point = (await fetch(
    `https://api.weather.gov/points/${location.latitude},${location.longitude}`,
  ).then((res) => res.json())) as GetPointResponse;

  const forecast = (await fetch(point.properties.forecast!).then((res) =>
    res.json(),
  )) as GetForecastResponse;

  return { point, forecast };
}
