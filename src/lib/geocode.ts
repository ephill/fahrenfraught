import { GeoLocation } from "@/lib/geoLocation";

interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
}

export interface LocationSuggestion {
  label: string;
  location: GeoLocation;
}

function toSuggestion(result: NominatimResult): LocationSuggestion {
  return {
    label: result.display_name.replace(/, United States$/, ""),
    location: {
      latitude: Number(result.lat),
      longitude: Number(result.lon),
    },
  };
}

/**
 * Searches the OpenStreetMap Nominatim geocoder for US locations matching a
 * free-form query (city, zip code, address, etc.) and returns ranked
 * suggestions. Results are restricted to the US since api.weather.gov only
 * covers US locations.
 */
export async function searchLocations(
  query: string,
  limit = 5,
  signal?: AbortSignal,
): Promise<LocationSuggestion[]> {
  const trimmed = query.trim();
  if (!trimmed) {
    return [];
  }

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", trimmed);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("countrycodes", "us");

  const results = (await fetch(url, { signal }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to look up that location. Please try again.");
    }
    return res.json();
  })) as NominatimResult[];

  return (results ?? []).map(toSuggestion);
}

/**
 * Resolves a free-form location query to a single latitude/longitude, throwing
 * a friendly error when nothing matches.
 */
export async function geocodeLocation(query: string): Promise<GeoLocation> {
  const trimmed = query.trim();
  if (!trimmed) {
    throw new Error("Please enter a location.");
  }

  const [first] = await searchLocations(trimmed, 1);
  if (!first) {
    throw new Error(`No US location found for "${trimmed}".`);
  }

  return first.location;
}
