import { useEffect, useState } from "react";

import { useMap } from "./GoogleMap";
import { useMapEffect } from "./mapUtils";

export function Marker(props: google.maps.MarkerOptions) {
  const [marker, setMarker] = useState<google.maps.Marker>();
  const map = useMap();
  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker({ ...props, map }));
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useMapEffect(() => {
    if (marker) {
      marker.setOptions(props);
    }
  }, [marker, props]);

  return null;
}
