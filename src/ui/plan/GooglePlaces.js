import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

function GooglePlaces() {
  const [address, setAddress] = React.useState("")

  const handleSelect = async(value) => {}


  return (
  //value: user input
  //onChange: change input value
  //onSelect: when one suggestion is selected
  <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
      <div>
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

export default GooglePlaces;
