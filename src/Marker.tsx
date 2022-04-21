import { useEffect, useRef } from "react";
import { useMapContext } from "./MapContext";

import { useMapEffect } from "./mapUtils";

interface Props extends google.maps.MarkerOptions {
  onClick?: Function;
}

export function Marker({
  onClick,
  ...options
}: Props) {
  const marker = useRef<google.maps.Marker>();
  const { map, addMarker, removeMarker } = useMapContext();
  useEffect(() => {
    if (!marker.current) {
      marker.current = new google.maps.Marker({ ...options, map });
      addMarker(marker.current);

      if (onClick) {
        marker.current.addListener("click", () => onClick(marker.current));
      }

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
      marker.current.setOptions(options);
    }
  }, [marker.current, options]);

  return null;
}
