import React from "react";
import GoogleMapReact from 'google-map-react';
import SearchBox from "./SearchBox";
import Marker from "./Marker";

// ...

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      mapsApiLoaded: false,
      mapInstance: null,
      mapsapi: null,
      center: {...this.props.center}
    };
  }
   
  static defaultProps = {
    zoom: 11
  };

  handleClick = (event,tw)=>{
    console.log(event ,tw)
    this.props.setPosition({
      coordinates:[event.lat,event.lng]
    })
   this.setState({
    center:{
      lat:event.lat,
      lng:event.lng
    }
  })
  }
  onPlacesChanged = (place) => {
    console.log(place[0])
    this.props.setPosition({
      adresse:place[0].formatted_address,
      coordinates:[place[0].geometry.location.lat(),place[0].geometry.location.lng()]
    })
   this.setState({
     center:{
       lat:place[0].geometry.location.lat(),
       lng:place[0].geometry.location.lng()
     }
   })
  }
  apiLoaded= (map, maps) => {
    this.setState({
      mapsApiLoaded: true,
      mapInstance: map,
      mapsapi: maps,
    });
  }
  render() {
    const { mapsApiLoaded , mapInstance , mapsapi }= this.state
    return (
      <div style={{ height: '70vh', width: '100%' }}>
        <GoogleMapReact
          onGoogleApiLoaded={({ map, maps }) => {
            this.apiLoaded(map, maps);
          }}
          onClick={this.handleClick}
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{ 
            key: "AIzaSyBenv6GN3Pxg-v45u-w9MumY7chTHUq1VE",
            libraries: ['places'],
           }}
          defaultZoom={this.props.zoom}
          center={this.state.center}
          >
         
           {mapsApiLoaded && <SearchBox className="searchbox" onPlacesChanged={this.onPlacesChanged} map={mapInstance} mapsapi={mapsapi} />}
           <Marker
            {...this.state.center}
            name="My Marker"
            color="red"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapContainer