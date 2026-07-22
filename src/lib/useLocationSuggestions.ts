import { LocationSuggestion, searchLocations } from "@/lib/geocode";
import { useEffect, useState } from "react";

/**
 * Debounced autocomplete suggestions for a location query. Fetching only
 * happens while `enabled` is true (e.g. it is switched off right after the user
 * picks a suggestion) and for queries of at least three characters. In-flight
 * requests are aborted when the query changes so only the latest wins.
 */
export function useLocationSuggestions(
  query: string,
  enabled: boolean,
): { suggestions: LocationSuggestion[]; loading: boolean } {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const trimmed = query.trim();
    if (!enabled || trimmed.length < 3) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    const timer = setTimeout(() => {
      searchLocations(trimmed, 5, controller.signal)
        .then((results) => {
          setSuggestions(results);
          setLoading(false);
        })
        .catch(() => {
          // Ignore aborted/transient errors; the form submit surfaces real ones.
          // A stale/aborted request already had a fresh run reset `loading`.
          if (!controller.signal.aborted) {
            setLoading(false);
          }
        });
    }, 350);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, enabled]);

  return { suggestions, loading };
}
