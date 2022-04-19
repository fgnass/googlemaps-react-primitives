import { useEffect, useRef } from "react";
import { useMapContext } from "./MapContext";

import { useMapEffect } from "./mapUtils";

export function Marker(props: google.maps.MarkerOptions) {
  const marker = useRef<google.maps.Marker>();
  const { map, addMarker, removeMarker } = useMapContext();
  useEffect(() => {
    if (!marker.current) {
      marker.current = new google.maps.Marker({ ...props, map });
      addMarker(marker.current);
      return () => {
        if (marker.current) {
          removeMarker(marker.current);
          marker.current = undefined;
        }
      };
    }
  }, []);

  useMapEffect(() => {
    if (marker.current) {
      marker.current.setOptions(props);
    }
  }, [marker.current, props]);

  return null;
}
