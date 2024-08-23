import { GeoLocation } from "@/lib/geoLocation";

export async function getWeatherData(location: GeoLocation) {
  const ret: any = {};
  ret.periods = await fetch(
    `https://api.weather.gov/points/${location.latitude},${location.longitude}`,
  )
    .then((res) => res.json())
    .then((json) => {
      ret.relativeLocation = json.properties.relativeLocation;
      return fetch(json.properties.forecast);
    })
    .then((res) => res.json())
    .then((json) => json.properties.periods);

  return ret;
}
