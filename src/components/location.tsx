import { GetPointResponse, RelativeLocation } from "@/lib/types";
import { useMemo } from "react";

export const Location = (props: { point: GetPointResponse }) => {
  const { point } = props;
  const cityState = useMemo(() => {
    if (point) {
      const relativeLocation = point.properties
        .relativeLocation as RelativeLocation;

      return `${relativeLocation.properties.city}, ${relativeLocation.properties.state}`;
    }
  }, [point]);

  return <div className="text-center text-3xl">{cityState}</div>;
};
