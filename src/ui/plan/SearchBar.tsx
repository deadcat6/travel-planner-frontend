import * as React from "react";
import {useState, Fragment} from "react";
import {placeType} from "./PlanView";
import {BASE_URL, PHOTO_HEIGHT, PHOTO_WIDTH} from "../../constants"
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from '@mui/icons-material/Clear';
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import { Title, Box, Checkbox, Image, Button, Group, MultiSelect, Text,Textarea } from '@mantine/core';

export const SearchBar = (props) => {
  const [address, setAddress] = React.useState("")
  const [img, setImg] = React.useState("")
  const [placeInfo, setPlaceInfo] = React.useState({
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
  })

  const fetchDetail  = (placeID) => {
    const detailUrl = `${BASE_URL}/details/json?place_id=${placeID}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`
    axios.get(detailUrl).then(response=>{
      const placeData = response.data.result;
      setPlaceInfo(placeInfo => ({
        ...placeInfo, 
        name : placeData.name === null ? "" : placeData.name,
        rating : placeData.rating === null ? 0 : placeData.rating,
        type : placeData.types === null ? "" : placeData.types[0]
      }))
      

      //request photo if the place has any
      if (placeData.photos != null) {
        const photoReference = placeData.photos[0].photo_reference;
        fetchPhoto(photoReference)
      }
      // console.log(placeInfo)
    }).catch(error => {
      console.log('err in fetch place detail', error)
    })
  }

  const fetchPhoto = (photoReference) => {
    // console.log("fetch photo");
    const getPhotoUrl = `${BASE_URL}/photo?maxheight=${PHOTO_HEIGHT}&maxwidth=${PHOTO_WIDTH}&photo_reference=${photoReference}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`
    axios.get(getPhotoUrl, {responseType: 'blob'} ).then(response=>{
      const photoUrl = URL.createObjectURL(response.data);
      setPlaceInfo(placeInfo => ({
        ...placeInfo, 
        photoReference : photoUrl === null ? "" : photoUrl
      }))
      setImg(photoUrl)
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
    setPlaceInfo(placeInfo => ({
      ...placeInfo, 
      address : value,
      placeId : placeID,
      coordinates : latLng,
    }))

    fetchDetail(placeID);
  }

  const handleCloseClick = () => {
    setAddress("")
  };

  const [property, setProperty] = useState(
    ['Hotel', 'Restaurant', 'Museum', 'Entertainment', 'Historical Site', 'Natural Attraction', 'Sports'])

  const form = useForm({
      initialValues: {
        title: '',
        image: '',
        timeRange: '',
        placeProperty: [],
      },
  });

  const submitPlace = e => {
    e.preventDefault()
    const temp = {
      id: placeInfo.placeId,
      address: placeInfo.address,
      geo: {
        lat : placeInfo.coordinates.lat,
        lng : placeInfo.coordinates.lng
      },
      type: placeInfo.type,
      rating: placeInfo.rating,
      image: placeInfo.photoReference,
      placeDuration: form.values.timeRange,
      title: form.values.title,
      properties: form.values.placeProperty
    }
    // console.log(temp)
    props.updatePlace(temp)
  }

  return (
  //value: user input
  //onChange: change input value
  //onSelect: when one suggestion is selected
  <Fragment>
    <PlacesAutocomplete
      value={address} 
      onChange={setAddress} 
      onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps}) => (
        <div className="search-bar-container">
          <div className="search-input-container">
            {/* <img src = {img}/> */}
            {/* <SvgIcon component={StarIcon} inheritViewBox /> */}
            <input {...getInputProps({ 
              placeholder: 'Search your destination',
              className: 'search-input',
            })}/>
            {address.length > 0 && (
              <ClearIcon className = "clear-button" 
                onClick={handleCloseClick}/>
            )}
            <SearchIcon className="search-icon"/>
          </div>
          
          <div className="autocomplete-container">
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
      )}
    </PlacesAutocomplete>

    <Box className='create'>
      <form onSubmit={submitPlace}>
        <Textarea
            placeholder={placeInfo.name}
            label="Place Name"
            required
            {...form.getInputProps('title')}
        />

        <Image
            height={240}
            width={400}
            radius="sm"
            src={img}
            withPlaceholder
            placeholder={<Text align="center">This image contained the scenery of place</Text>}
        />

        <DatePicker 
            name="time"
            label="Visit Time" 
            placeholder="Pick a date" 
            {...form.getInputProps('timeRange')}
            required 
        />
        
        <MultiSelect
            name="placeProperty"
            label="Custom Tags"
            data={property}
            placeholder="Select items"
            searchable
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => setProperty((current) => [...current, query])}
            {...form.getInputProps('placeProperty')}
        />

        <Group position="right" mt="md">
            <Button type="submit">Add Place to List</Button>  
        </Group>
       </form>
    </Box>
  </Fragment>
  );
}