import React, {
  createContext,
  CSSProperties,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useMapEffect } from "./mapUtils";

const MapContext = createContext<google.maps.Map | undefined>(undefined);

export function useMap() {
  const map = useContext(MapContext);
  if (!map) throw new Error("No map found in context");
  return map;
}

const defaultOptions = {
  center: { lat: 0, lng: 0 },
  zoom: 4,
};

interface Props extends google.maps.MapOptions {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  autoFit?: boolean;
}

export function GoogleMap({
  className,
  style,
  autoFit,
  children,
  ...options
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  useEffect(() => {
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
    if (map && autoFit) {
      const bounds = new google.maps.LatLngBounds();
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child)) {
          const { position } = child.props;
          if (position) {
            bounds.extend(position);
          }
        }
      });
      if (!bounds.isEmpty()) {
        map.fitBounds(bounds);
      }
    }
  }, [map, autoFit]);
  return (
    <>
      <div ref={ref} className={className} style={style} />
      {map && <MapContext.Provider value={map}>{children}</MapContext.Provider>}
    </>
  );
}
