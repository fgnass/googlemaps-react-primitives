import { ReactElement, ReactPortal, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useMapContext } from "./MapContext.js";

import { useMapEffect } from "./mapUtils.js";

interface OverlayView extends google.maps.OverlayView {
  render(content: ReactElement): ReactPortal | undefined;
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

    constructor(options: OverlayOptions) {
      super();
      this.position = options.position;
      this.containerDiv = document.createElement("div");
      this.containerDiv.style.position = "absolute";
      if (options.preventMapHits) {
        // Stop clicks etc. from bubbling up to the map.
        ReactOverlayView.preventMapHitsAndGesturesFrom(this.containerDiv);
      }
    }

    render(content: ReactElement) {
      if (this.containerDiv) {
        return ReactDOM.createPortal(content, this.containerDiv);
      }
    }

    moveTo(position: google.maps.LatLngLiteral) {
      this.position = position;
      // force a re-draw...
      this.notify("map");
    }

    /** Called when the popup is added to the map. */
    onAdd() {
      this.getPanes()!.floatPane.appendChild(this.containerDiv);
    }

    /** Called when the popup is removed from the map. */
    onRemove() {
      if (this.containerDiv.parentElement) {
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

function createOverlay(
  map: google.maps.Map,
  options: OverlayOptions,
  callback: (view: OverlayView) => void
) {
  if (!OverlayView) OverlayView = createOverlayClass();
  const view = new OverlayView(options);
  view.setMap(map);
  callback(view);
  return () => {
    view.setMap(null);
  };
}

export function Overlay({
  position,
  preventMapHits,
  children,
}: OverlayOptions & {
  children: ReactElement;
}) {
  const { map, extendBounds } = useMapContext();
  const [view, setView] = useState<OverlayView>();

  useEffect(() => {
    if (!view && map) {
      extendBounds(position);
      return createOverlay(map, { position, preventMapHits }, setView);
    }
  }, [map]);

  useMapEffect(() => {
    if (view) {
      view.moveTo(position);
    }
  }, [view, position]);

  return view?.render(children) ?? null;
}
