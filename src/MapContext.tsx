import { createContext, useContext } from "react";

export type MapContextValue = {
  map: google.maps.Map | null;
  addMarker: (marker: google.maps.Marker) => void;
  removeMarker: (marker: google.maps.Marker) => void;
  extendBounds: (
    point?: google.maps.LatLng | google.maps.LatLngLiteral | null
  ) => void;
};

export const MapContext = createContext<MapContextValue | undefined>(undefined);

export function useMapContext() {
  const ctx = useContext(MapContext);
  if (!ctx) throw new Error("No map context found");
  return ctx;
}

export function useMap() {
  const { map } = useMapContext();
  if (!map) throw new Error("No map found in map context");
  return map;
}
