import * as React from "react";
import {useState} from "react";
import {placeType} from "./PlanView";
import {SearchBar} from "./SearchBar";
import {CreatePlaceOption} from "./CreatePlaceOption";

export const NewPlace = (props) => {
  const [place, setPlace] = useState<placeType>({
      id: "",
      note: "",
      placeDuration: new Date(),
      //iris
      type: "",
      title: "",
      image: "",
      geo: {
        lat: 0,
        lng: 0,
      },
      rating: 0, // google api
      popularity: 0, //counter
      properties: []
    }
  );

  const updatePlace = (placeInfo) => {
    // setPlace(place => placeInfo)
    props.setPlace({
      ...place,
      id: placeInfo.id,
      note: "",
      placeDuration: placeInfo.placeDuration.getTime(),
      //iris
      type: placeInfo.type,
      title: placeInfo.title,
      image: placeInfo.image,
      geo: {
        lat: placeInfo.geo.lat,
        lng: placeInfo.geo.lng,
      },
      rating: placeInfo.rating, // google api
      popularity: 0, //counter
      properties: placeInfo.properties
    })
    console.log(placeInfo)
  }

  return (
    <div>
      <SearchBar updatePlace={updatePlace} />
      {/* <CreatePlaceOption selectedPlace={place} setPlace={setPlace} submitHandler={submitHandler}/> */}
    </div>
  );
}