import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
  } from "react-places-autocomplete";
import {useState} from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


import {NewPlace} from '../plan/NewPlace'


const cityInfo = {
    lat: 0,
    lng: 0
}
export const HomeSearch = (props) => {

const navigate = useNavigate();

const [address, setAddress] = useState("");

const handleSelect = async(value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    cityInfo.lat = latLng.lat;
    cityInfo.lng = latLng.lng;
}

const handleCloseClick = () => {
    setAddress("")
};

const directPlan = (e) => {
    e.preventDefault();
    if (address === ""){
        alert("Please input your destination city")
    } else {
        props.setCenter({
            lat: cityInfo.lat,
            lng: cityInfo.lng
        })
        navigate("/planView")
    }
}

return (
    //value: user input
    //onChange: change input value
    //onSelect: when one suggestion is selected
    <PlacesAutocomplete
        value={address} 
        onChange={setAddress} 
        onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps}) => (
        <div className="home-search-container">
            <div className = "home-autocomplete">
                <div className="home-search-input-container">
                    <input {...getInputProps({ 
                        placeholder: 'Which city are you traveling to?',
                        className: 'home-search-input',
                    })}/>
                    {address.length > 0 && (
                        <ClearIcon className = "clear-button" 
                        onClick={handleCloseClick}/>
                    )}
                    <SearchIcon className="search-icon"/>
                </div>
                
                <div className="home-autocomplete-container">
                {suggestions.map((suggestion) => {
                    const className = suggestion.active 
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
        
                    const style = {
                    backgroundColor: suggestion.active ? "#61a7ff" : "#fff",
                    cursor: "pointer"
                    }
                    return (
                    <div {...getSuggestionItemProps(suggestion, {
                        className,
                        style
                    })}> 
                        <span>{suggestion.description}</span>
                    </div>
                    )
                })}
                </div>
            </div>
            <Button variant="contained" className="start-button" onClick={directPlan}>
                Start
            </Button>
        </div>
        )}
    </PlacesAutocomplete>
    )
}
  