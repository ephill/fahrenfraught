import { GetForecastResponse, GetPointResponse } from "@/lib/types";
import { createContext } from "react";

export const WeatherContext = createContext<{
  point: GetPointResponse;
  forecast: GetForecastResponse;
} | null>(null);
