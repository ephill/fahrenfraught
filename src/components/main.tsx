"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Weather } from "@/components/weather";
import { geocodeLocation, LocationSuggestion } from "@/lib/geocode";
import { GeoLocation } from "@/lib/geoLocation";
import { cn } from "@/lib/utils";
import { useLocationSuggestions } from "@/lib/useLocationSuggestions";
import { LocateFixed, Loader2, Search } from "lucide-react";
import { FormEvent, KeyboardEvent, useState } from "react";

export const Main = () => {
  const [location, setLocation] = useState<GeoLocation | undefined>();
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const { suggestions, loading: suggestionsLoading } = useLocationSuggestions(
    query,
    showSuggestions,
  );
  const suggestionsOpen = showSuggestions && suggestions.length > 0;

  const selectSuggestion = (suggestion: LocationSuggestion) => {
    setQuery(suggestion.label);
    setShowSuggestions(false);
    setActiveIndex(-1);
    setError(undefined);
    setLocation(suggestion.location);
  };

  const onSearch = async (event: FormEvent) => {
    event.preventDefault();
    if (suggestionsOpen && activeIndex >= 0) {
      selectSuggestion(suggestions[activeIndex]);
      return;
    }
    setShowSuggestions(false);
    setError(undefined);
    setLoading(true);
    try {
      setLocation(await geocodeLocation(query));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!suggestionsOpen) {
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (event.key === "Escape") {
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  };

  const onUseMyLocation = () => {
    setShowSuggestions(false);
    setError(undefined);
    if (!navigator.geolocation) {
      setError("Location isn't available here. Try searching instead.");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      () => {
        setError("Unable to access your location. Try searching instead.");
        setLoading(false);
      },
      { timeout: 10000 },
    );
  };

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8 md:p-16 lg:p-24">
      <div className="flex w-full max-w-md flex-col gap-2">
        <form onSubmit={onSearch} className="flex w-full gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setShowSuggestions(true);
                setActiveIndex(-1);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setShowSuggestions(false)}
              onKeyDown={onInputKeyDown}
              placeholder="City, zip code, or address"
              aria-label="Location"
              autoComplete="off"
              role="combobox"
              aria-expanded={suggestionsOpen}
              aria-controls="location-suggestions"
              className={cn(showSuggestions && suggestionsLoading && "pr-9")}
            />
            {showSuggestions && suggestionsLoading && (
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              >
                <Loader2 className="h-4 w-4 animate-spin" />
              </span>
            )}
            {suggestionsOpen && (
              <ul
                id="location-suggestions"
                role="listbox"
                className="absolute z-50 mt-1 max-h-64 w-full overflow-auto rounded-md border border-input bg-background py-1 shadow-md"
              >
                {suggestions.map((suggestion, index) => (
                  <li key={suggestion.label} role="option" aria-selected={index === activeIndex}>
                    <button
                      type="button"
                      // onMouseDown fires before the input's blur, so the
                      // selection registers before the dropdown closes.
                      onMouseDown={(event) => {
                        event.preventDefault();
                        selectSuggestion(suggestion);
                      }}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={cn(
                        "block w-full px-3 py-2 text-left text-sm",
                        index === activeIndex && "bg-accent text-accent-foreground",
                      )}
                    >
                      {suggestion.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Button type="submit" size="icon" disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            <span className="sr-only">Search</span>
          </Button>
        </form>
        <Button
          type="button"
          variant="outline"
          onClick={onUseMyLocation}
          disabled={loading}
          className="gap-2"
        >
          <LocateFixed className="h-4 w-4" />
          Use my location
        </Button>
        {error && <span className="text-center text-destructive">{error}</span>}
      </div>
      {location && <Weather location={location} />}
    </main>
  );
};
