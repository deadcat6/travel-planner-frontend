import * as React from "react";
import {useState} from "react";
import {placeType} from "./PlanView";
import {SearchBar} from "./SearchBar";
export const NewPlace = (props: { addNewPlace: (arg0: placeType) => void; }) => {
  const [place, setPlace] = useState<placeType>({
      id: "string",
      note: "string",
      placeDuration: {
        startTime: new Date(),
        endTime: new Date(),
      },
      //iris
      type: 0,
      title: "string",
      image: "string",
      geo: {
        lat: "string",
        lng: "string",
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
      {/*  你的其他form组件*/}
    </div>
  );
}