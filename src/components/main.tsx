"use client";
import { Weather } from "@/components/weather";
import { GeoLocation } from "@/lib/geoLocation";
import { useEffect, useState } from "react";

export const Main = () => {
  const [longLat, setLongLat] = useState<GeoLocation | undefined>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLongLat({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  return (
    <main className="flex flex-1 flex-col items-center justify-center p-8 md:p-16 lg:p-24">
      {!longLat && (
        <span className="text-2xl">Allow location data to continue.</span>
      )}
      {longLat && <Weather location={longLat} />}
    </main>
  );
};
