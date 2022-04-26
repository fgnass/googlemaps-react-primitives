import React, { useMemo } from "react";
import { Polyline } from "./Polyline.js";

type Props = Omit<google.maps.PolylineOptions, "path"> & {
  locations: string;
  unescape?: boolean;
};

export function EncodedPolyline({ locations, unescape, ...props }: Props) {
  const path = useMemo(() => {
    const encoded = unescape ? locations.replaceAll("\\\\", "\\") : locations;
    return google.maps.geometry.encoding.decodePath(encoded);
  }, [locations]);
  return <Polyline {...props} path={path} />;
}
