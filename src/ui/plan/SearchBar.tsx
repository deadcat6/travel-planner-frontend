import * as React from "react";
import {useState} from "react";
import {placeType} from "./PlanView";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

export const SearchBar = (props) => {
  const [address, setAddress] = React.useState("")
  const [coordinates, setCoordinates] = React.useState({
    lat:null,
    lng:null
  })
  const [placeId, setPlaceId] = React.useState("")

  const handleSelect = async(value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    console.log(results)
  }

  const onChangeHandler = () => {
    props.setPlace(...props.place, {
      // type: ,
      // title: ,
      // image: ,
      geo: {
        lat: coordinates.lat,
        lng: coordinates.lng,
      }
    });
  }


  return (
  //value: user input
  //onChange: change input value
  //onSelect: when one suggestion is selected
  <PlacesAutocomplete 
    value={address} 
    onChange={setAddress} 
    onSelect={handleSelect}
  >
    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
      
      <div>
        <p> Latitude:{coordinates.lat} </p>
        <p> Longitude: {coordinates.lng}</p>
        <input {...getInputProps({ placeholder: "Type your destination"})}/>
        <div>
          {loading ? <div> ... Loading </div> : null }
          {suggestions.map((suggestion) => {
            const style = {
              backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
              cursor: "pointer"
            }
            return (
              <div {...getSuggestionItemProps(suggestion, {style})}> 
                {suggestion.description}
              </div>
            )
          })}
        </div>
      </div>
    )}
  </PlacesAutocomplete> 
  );
}