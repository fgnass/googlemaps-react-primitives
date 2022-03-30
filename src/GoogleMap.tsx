import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useMapEffect } from "./mapUtils";

import { MapContext } from "./MapContext";

const defaultOptions = {
  center: { lat: 0, lng: 0 },
  zoom: 4,
};

interface Props extends google.maps.MapOptions {
  className?: string;
  style?: CSSProperties;
  onClick?: (ev: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: ReactNode;
  autoFit?: boolean;
}

export function GoogleMap({
  className,
  style,
  onClick,
  onIdle,
  autoFit,
  children,
  ...options
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  useLayoutEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          ...defaultOptions,
          ...options,
        })
      );
    }
  }, [ref, map]);

  useMapEffect(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  const bounds = useMemo(() => new google.maps.LatLngBounds(), []);
  const markers = useMemo(() => new Set(), []);

  const ctx = useMemo(
    () => ({
      map,
      addMarker(marker: google.maps.Marker) {
        markers.add(marker);
        marker.setMap(map);
        const position = marker.getPosition();
        if (position) bounds.extend(position);
      },
      removeMarker(marker: google.maps.Marker) {
        markers.delete(marker);
        marker.setMap(null);
      },
      extendBounds(
        point?: google.maps.LatLng | google.maps.LatLngLiteral | null
      ) {
        if (point) bounds.extend(point);
      },
    }),
    [map]
  );

  useEffect(() => {
    if (autoFit && map && !bounds.isEmpty()) {
      map.fitBounds(bounds);
    }
  }, [map, autoFit]);

  return (
    <>
      <div ref={ref} className={className} style={style} />
      {map && <MapContext.Provider value={ctx}>{children}</MapContext.Provider>}
    </>
  );
}
