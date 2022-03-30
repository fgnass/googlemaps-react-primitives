import React from "react";
import { Marker } from "./Marker";

export type SvgMarkerProps = Omit<google.maps.MarkerOptions, "icon"> & {
  svg: string;
  width?: number;
  height?: number;
};

export function SvgMarker({
  svg,
  width = 45,
  height = 45,
  ...props
}: SvgMarkerProps) {
  return (
    <Marker
      {...props}
      icon={{
        url: `data:image/svg+xml;base64,${window.btoa(svg)}`,
        scaledSize: new google.maps.Size(width, height),
      }}
    />
  );
}
