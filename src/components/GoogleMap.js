import React, { Component } from 'react';
//import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
const K_WIDTH = 50;
const K_HEIGHT = 40;

const Marker = ({ text }) => <div style={{
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,
  border: '5px solid #f44336',
  borderRadius: K_HEIGHT/4,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 12,
  fontWeight: 'bold',
  padding: 4, 
}}>{text}</div>;

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // for google map places autocomplete
      address: '',

      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
  
      mapCenter: {
        lat: 49.2827291,
        lng: -123.1207375
      }
    };
  }

  static defaultProps = {
    center: {
      lat: 3.1473265,
      lng: 101.697911
    },
    zoom: 15
  };

  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    this.setState({ address });
    // geocodeByAddress(address)
    //   .then(results => getLatLng(results[0]))
    //   .then(latLng => {
    //     console.log('Success', latLng);

    //     // update center state
    //     this.setState({ mapCenter: latLng });
    //   })
    //   .catch(error => console.error('Error', error));
  };
 handleApiLoaded = (map, maps) => {
    console.log(map, maps)
  };
 
  render() {
    console.log("this.props.selectedPlace", this.props.selectedPlace)
    return (
      <div id='googleMaps' style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}>
          {
            this.props.selectedPlace != null ? <Marker
            lat={this.props.selectedPlace.lat}
            lng={this.props.selectedPlace.lng}
            text={this.props.selectedPlace.placeName}
            /> : 
            <Marker
              lat={3.1473265}
              lng={101.697911}
              text="Maybank Tower (HQ)"
            />
          }
        </GoogleMapReact>
          
        
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedPlace: state.placeSearch.selected
  };
};
export default connect(
  mapStateToProps,
  null
)(MapContainer);