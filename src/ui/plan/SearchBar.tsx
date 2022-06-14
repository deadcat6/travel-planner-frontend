import * as React from "react";
import {useState} from "react";
import {placeType} from "./PlanView";
import {BASE_URL} from "../../constants"
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import axios from "axios";

export const SearchBar = (props) => {
  const [address, setAddress] = React.useState("")
  const [img, setImg] = React.useState("")


  const placeInfo = {
    address : "",
    coordinates : {
      lat : null,
      lng : null
    },
    type : "",
    placeId : "",
    name : "",
    photoReference : "",
    rating : 0
  }

  const fetchDetail  = (placeID) => {
    const detailUrl = `${BASE_URL}/details/json?place_id=${placeID}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`
    axios.get(detailUrl).then(response=>{
      const placeData = response.data.result;
      const photoReference = placeData.photos[0].photo_reference;

      placeInfo.name = placeData.name === null ? "" : placeData.name;
      placeInfo.rating = placeData.rating === null ? 0 : placeData.rating;
      placeInfo.type = placeData.types === null ? "" : placeData.types[0];
      
      fetchPhoto(photoReference)
      // console.log(placeData)
    }).catch(error => {
      console.log('err in fetch place detail', error)
    })
  }

  const fetchPhoto = (photoReference) => {
    const getPhotoUrl = `${BASE_URL}/photo?maxheight=100&photo_reference=${photoReference}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`
    axios.get(getPhotoUrl, {responseType: 'blob'} ).then(response=>{
      const photoUrl = URL.createObjectURL(response.data);
      placeInfo.photoReference = photoUrl === null ? "" : photoUrl

      setImg(photoUrl)
      console.log(placeInfo)
    }).catch(error => {
      console.log('err in fetch place photo', error)
    })
  }

  const handleSelect = async(value) => {
    //get geoInfo from geoCoder
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);

    //replace input with complete address
    setAddress(value);

    const placeID = results[0].place_id;
    
    placeInfo.address = value;
    placeInfo.placeId = placeID;
    placeInfo.coordinates = latLng;

    fetchDetail(placeID);
  }

  const onChangeHandler = () => {
    props.setPlace(...props.place, {
      id: placeInfo.placeId,
      title: placeInfo.name,
      address: placeInfo.address,
      geo: {
        lat : placeInfo.coordinates.lat,
        lng : placeInfo.coordinates.lng
      },
      type: placeInfo.type,
      rating: placeInfo.rating,
      image: placeInfo.photoReference
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
        <img src = {img}/>
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