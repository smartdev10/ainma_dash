import React from "react";
import GoogleMapReact from 'google-map-react';

// ...

export class MapContainer extends React.Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  handleGoogleMapApi = (map, maps) => {
    let directionsService = new maps.DirectionsService()
    let directionsDisplay = new maps.DirectionsRenderer()
    directionsDisplay.setMap(map)
    const { ride } = this.props
    const {startPoint , destination} = ride
    directionsService.route(
      {
        travelMode: 'DRIVING',
        origin: `${startPoint.coordinates[0]},${startPoint.coordinates[1]}` || startPoint.adresse  ,
        destination: `${destination.coordinates[0]},${destination.coordinates[1]}` || destination.adresse
      },
      (DirectionsResult, DirectionsStatus) => {
        console.log('DirectionsResult', DirectionsResult)
        console.log('DirectionsStatus', DirectionsStatus)
        if (DirectionsStatus === 'OK') {
          directionsDisplay.setDirections(DirectionsResult);
        }
      }
    )
  }
  render() {
    const { ride } = this.props
    const { startPoint } = ride
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          onGoogleApiLoaded={({ map, maps }) => this.handleGoogleMapApi(map, maps)}
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{ key: "AIzaSyDhClG2mx_HZ8YILy3PRxZKTw75im7hfQg" }}
          defaultCenter={{
            lat:startPoint.coordinates[0],
            lng:startPoint.coordinates[1]
          }}
          defaultZoom={this.props.zoom}>
          
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapContainer