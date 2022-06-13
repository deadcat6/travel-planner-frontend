import * as React from "react";
import {useState} from "react";
import {placeType} from "./PlanView";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

export const SearchBar = (props) => {

  const onChangeHandler = () => {
    props.setPlace(...props.place, {
      title: "changed by search bar component",
    });
  }

  const [address, setAddress] = React.useState("")
  const [coordinates, setCoordinates] = React.useState({
    lat:null,
    lng:null
  })

  const handleSelect = async(value) => {
    const results = geocodeByAddress(value);
    console.log(results)
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
        <input {...getInputProps({ placeholder: "Type your address"})}/>
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