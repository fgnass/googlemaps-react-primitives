import { useEffect, useState } from "react";
import { useMapContext } from "./MapContext";

import { useMapEffect } from "./mapUtils";

export function Marker(props: google.maps.MarkerOptions) {
  const [marker, setMarker] = useState<google.maps.Marker>();
  const { map, addMarker, removeMarker } = useMapContext();
  useEffect(() => {
    if (!marker) {
      const m = new google.maps.Marker({ ...props, map });
      addMarker(m);
      setMarker(m);
      // remove marker from map on unmount
      return () => {
        removeMarker(m);
      };
    }
  }, []);

  useMapEffect(() => {
    if (marker) {
      marker.setOptions(props);
    }
  }, [marker, props]);

  return null;
}
