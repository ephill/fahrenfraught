import { GeoLocation } from "@/lib/geoLocation";

export async function getWeatherData(location: GeoLocation) {
  return await fetch(
    `https://api.weather.gov/points/${location.latitude},${location.longitude}`,
  )
    .then((res) => res.json())
    .then((json) => fetch(json.properties.forecast))
    .then((res) => res.json())
    .then((json) => json.properties.periods);
}
