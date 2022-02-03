import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { GoogleMap, Marker, Overlay } from "./src";

function renderLoadingStatus(status: Status) {
  return <h1>{status}</h1>;
}

function App() {
  const [text, setText] = useState("Moin!");
  return (
    <div style={{ width: "80vw", margin: "10vh auto" }}>
      <Wrapper
        apiKey={import.meta.env.VITE_API_KEY}
        render={renderLoadingStatus}
      >
        <GoogleMap style={{ height: "80vh", marginBottom: "1em" }} autoFit>
          <Marker position={{ lat: 48.137154, lng: 11.576124 }} />
          <MyMarker position={{ lat: 52.520008, lng: 13.404954 }} />
          <Overlay position={{ lat: 53.551086, lng: 9.993682 }}>
            <div
              style={{
                transform: "translateX(-50%)",
                backgroundColor: "#fff",
                borderRadius: "5px",
                padding: "10px",
                boxShadow: "5px 5px 10px #000",
              }}
            >
              {text}
            </div>
          </Overlay>
        </GoogleMap>
      </Wrapper>
      <input value={text} onChange={(ev) => setText(ev.target.value)} />
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
