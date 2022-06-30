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
    }
  );

  const submitHandler = () => {
    // console.log(place);
    props.addNewPlace(place.placeDuration,place);
  }


  return (
    <div>
      <SearchBar place={place} setPlace={setPlace}/>
      <CreatePlaceOption selectedPlace={place} setPlace={setPlace} submitHandler={submitHandler}/>
    </div>
  );
}