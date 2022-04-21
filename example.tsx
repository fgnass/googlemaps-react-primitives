import React from "react";
import ReactDOM from "react-dom";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import {
  GoogleMap,
  Marker,
  SvgMarker,
  Overlay,
  Polyline,
  EncodedPolyline,
} from "./src";

const styles = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [
      {
        color: "#f2f2f2",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [
      {
        gamma: 0.01,
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [
      {
        saturation: -31,
      },
      {
        lightness: -33,
      },
      {
        weight: 2,
      },
      {
        gamma: 0.8,
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "labels",
    stylers: [
      {
        visibility: "on",
      },
      {
        lightness: "14",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#848484",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "simplified",
      },
      {
        color: "#b9b9b9",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
      {
        color: "#6d6d6d",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#dfdfdf",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9c9c9c",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#dedede",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9c9c9c",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
];

function renderLoadingStatus(status: Status) {
  return <h1>{status}</h1>;
}

function App() {
  return (
    <div style={{ width: "80vw", margin: "10vh auto" }}>
      <Wrapper
        libraries={["geometry"]}
        apiKey={import.meta.env.VITE_API_KEY}
        render={renderLoadingStatus}
      >
        <GoogleMap
          style={{ height: "80vh", marginBottom: "1em" }}
          fullscreenControl={false}
          mapTypeControl={false}
          streetViewControl={false}
          zoomControl={false}
          keyboardShortcuts={false}
          backgroundColor="#c8c8c8"
          styles={styles}
          onClick={console.log}
          autoFit
        >
          <Marker
            position={{lat: 48.137154, lng: 11.576124}}
            onClick={(e: any) => console.log("Marker clicked", e)}
          />
          <MyMarker position={{lat: 52.520008, lng: 13.404954}}/>
          <Marker
            position={{lat: 48.210033, lng: 16.363449}}
            onClick={(e: any) => console.log("Marker clicked", e)}
          />
          <SvgMarker
            position={{ lat: 48.864716, lng: 2.349014 }}
            svg={`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="#e74c3c" d="M12 0a8 8 0 0 0-7 12l7 12 7-12a8 8 0 0 0-7-12zm0 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
              <path fill="#c0392b" d="M12 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
            </svg>`}
          />
          <Overlay position={{ lat: 53.551086, lng: 9.993682 }}>
            <div
              style={{
                transform: "translateX(-50%)",
                backgroundColor: "#fff",
                borderRadius: "5px",
                padding: "10px",
                boxShadow: "5px 5px 10px #0005",
              }}
            >
              Moin!
            </div>
          </Overlay>
          <Polyline
            path={[
              { lat: 48.137154, lng: 11.576124 },
              { lat: 48.210033, lng: 16.363449 },
            ]}
            strokeColor="red"
          />
          <EncodedPolyline locations="ayp_I}cypAgkhElgyS" strokeColor="teal" />
        </GoogleMap>
      </Wrapper>
    </div>
  );
}

function MyMarker(props: google.maps.MarkerOptions) {
  return (
    <Marker
      {...props}
      icon={{
        path: "M9 22C9 22 18 16 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 16 9 22 9 22ZM12 9C12 10.6569 10.6569 12 9 12C7.34315 12 6 10.6569 6 9C6 7.34315 7.34315 6 9 6C10.6569 6 12 7.34315 12 9Z",
        strokeColor: "#FFFFFF",
        fillColor: "#009A9E",
        fillOpacity: 0.8,
        scale: 1.5,
        anchor: new google.maps.Point(9, 22),
      }}
    />
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
