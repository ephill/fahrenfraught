import type { components, paths } from "@/lib/weather-gov-schema";

export type Period = components["schemas"]["GridpointForecastPeriod"];

export interface ForecastDay {
  date: Date;
  day?: Period;
  night?: Period;
}

export type GetPointResponse =
  paths["/points/{point}"]["get"]["responses"]["200"]["content"]["application/geo+json"];

export type RelativeLocation = components["schemas"]["RelativeLocationGeoJson"];

export type GetForecastResponse =
  paths["/gridpoints/{wfo}/{x},{y}/forecast"]["get"]["responses"]["200"]["content"]["application/geo+json"];
