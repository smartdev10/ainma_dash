import React from "react";
import GoogleMapReact from 'google-map-react';

// ...
const AnyReactComponent = ({ text }) => <div>{text}</div>;

export class MapContainer extends React.Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  constructor(props) {
    super(props);
  
    this.state = {
      mapsApiLoaded: false,
      mapInstance: null,
      mapsapi: null,
    };
  }
  apiLoaded= (map, maps) => {
    this.setState({
      mapsApiLoaded: true,
      mapInstance: map,
      mapsapi: maps,
    });
  }
  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          onGoogleApiLoaded={({ map, maps }) => {
            this.apiLoaded(map, maps);
          }}
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{ key: "AIzaSyDhClG2mx_HZ8YILy3PRxZKTw75im7hfQg" }}
          defaultZoom={this.props.zoom}>
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
           {mapsApiLoaded && <SearchBox map={mapInstance} mapsapi={mapsapi} />}
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapContainer