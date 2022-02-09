import { ReactElement, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import { useMap } from "./GoogleMap";
import { useMapEffect } from "./mapUtils";

interface OverlayView extends google.maps.OverlayView {
  updateContent(content: ReactElement): void;
  moveTo(position: google.maps.LatLngLiteral): void;
}

export interface OverlayOptions {
  position: google.maps.LatLngLiteral;
  preventMapHits?: boolean;
}

// We can't create the class before the google maps api is loaded,
// hence we defer its creation until createOverlay is called.
function createOverlayClass() {
  class ReactOverlayView
    extends google.maps.OverlayView
    implements OverlayView
  {
    position: google.maps.LatLngLiteral;
    containerDiv: HTMLDivElement;
    content: ReactElement;
    constructor(content: ReactElement, options: OverlayOptions) {
      super();
      this.content = content;
      this.position = options.position;
      this.containerDiv = document.createElement("div");
      this.containerDiv.style.position = "absolute";
      if (options.preventMapHits) {
        // Stop clicks etc. from bubbling up to the map.
        ReactOverlayView.preventMapHitsAndGesturesFrom(this.containerDiv);
      }
    }

    updateContent(content: ReactElement) {
      this.content = content;
      ReactDOM.render(content, this.containerDiv);
    }

    moveTo(position: google.maps.LatLngLiteral) {
      this.position = position;
      // force a re-draw...
      this.notify("map");
    }

    /** Called when the popup is added to the map. */
    onAdd() {
      this.getPanes()!.floatPane.appendChild(this.containerDiv);
      ReactDOM.render(this.content, this.containerDiv);
    }

    /** Called when the popup is removed from the map. */
    onRemove() {
      if (this.containerDiv.parentElement) {
        ReactDOM.unmountComponentAtNode(this.containerDiv);
        this.containerDiv.parentElement.removeChild(this.containerDiv);
      }
    }

    /** Called each frame when the popup needs to draw itself. */
    draw() {
      const divPosition = this.getProjection().fromLatLngToDivPixel(
        this.position
      )!;

      // Hide the popup when it is far out of view.
      const display =
        Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
          ? "block"
          : "none";

      if (display === "block") {
        this.containerDiv.style.left = Math.round(divPosition.x) + "px";
        this.containerDiv.style.top = Math.round(divPosition.y) + "px";
      }

      if (this.containerDiv.style.display !== display) {
        this.containerDiv.style.display = display;
      }
    }
  }
  return ReactOverlayView;
}

let OverlayView: ReturnType<typeof createOverlayClass>;

function createOverlay(content: ReactElement, options: OverlayOptions) {
  if (!OverlayView) OverlayView = createOverlayClass();
  return new OverlayView(content, options);
}

export function Overlay({
  position,
  preventMapHits,
  children,
}: OverlayOptions & {
  children: ReactElement;
}) {
  const map = useMap();
  const overlayView = useRef<OverlayView>();

  useEffect(() => {
    if (!overlayView.current && map) {
      const ov = createOverlay(children, { position, preventMapHits });
      overlayView.current = ov;
      ov.setMap(map);
      // Remove marker from map on unmount
      return () => {
        ov.setMap(null);
      };
    }
  }, [overlayView, map]);

  useEffect(() => {
    if (overlayView.current) {
      overlayView.current.updateContent(children);
    }
  }, [children]);

  useMapEffect(() => {
    if (overlayView.current) {
      overlayView.current.moveTo(position);
    }
  }, [position]);

  return null;
}
