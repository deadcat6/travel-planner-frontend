import * as React from "react";
import {useState} from "react";
import {placeType} from "./PlanView";
import {SearchBar} from "./SearchBar";
import {CreatePlaceOption} from "./CreatePlaceOption";
export const NewPlace = (props: { addNewPlace: (arg0: placeType) => void; }) => {
  const [place, setPlace] = useState<placeType>({
      id: "",
      note: "",
      placeDuration: {
        startTime: new Date(),
        endTime: new Date(),
      },
      //iris
      type: "",
      title: "",
      image: "",
      geo: {
        lat: "",
        lng: "",
      },
      rating: 0, // google api
      popularity: 0, //counter
    }
  );

  const submitHandler = () => {
    props.addNewPlace(place);
  }

  return (
    <div>
      <SearchBar place={place} setPlace={setPlace}/>
      <CreatePlaceOption />
    </div>
  );
}