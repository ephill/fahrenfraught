import { GeoLocation } from "@/lib/geoLocation";
import type { components, paths } from "@/lib/weather-gov-schema";

export type GetPointResponse =
  paths["/points/{point}"]["get"]["responses"]["200"]["content"]["application/geo+json"];

export type RelativeLocation = components["schemas"]["RelativeLocationGeoJson"];

export type GetForecastResponse =
  paths["/gridpoints/{wfo}/{x},{y}/forecast"]["get"]["responses"]["200"]["content"]["application/geo+json"];

export async function getWeatherData(location: GeoLocation) {
  const point = (await fetch(
    `https://api.weather.gov/points/${location.latitude},${location.longitude}`,
  ).then((res) => res.json())) as GetPointResponse;

  const forecast = (await fetch(point.properties.forecast!).then((res) =>
    res.json(),
  )) as GetForecastResponse;

  return { point, forecast };
}
