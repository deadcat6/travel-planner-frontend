import {useState} from "react";
export type userType = {
  id: string,
  plans: planType[],
  username: string,
  password: string,
  email: string,
  // p1
  avatar: string,
  selfDesc: string,
  follower: userType[],
  subscribe: userType[],
};
export type planType = {
  id: string,
  title: string,
  owner: userType[],
  days: tripDayType[],
  planDuration: {
    startDay: Date,
    endDay: Date,
  },
  note: string,
  //p1
  desc: string,
  tag: string[],
  likes: number,
};
export type tripDayType = {
  date:Date,
  places: placeType[],
};
export enum typeOfPlace {
  hotel,
  restaurant,
  attraction,
  other,
}
export type placeType = {
  id: string,
  //songHan
  note:  string,
  placeDuration: {
  startTime: Date,
  endTime: Date,
  },

  //iris
  type: typeOfPlace,
  title: string,
  image: string,
  geo: {
    lat: string,
    lng: string,
  }
  rating: number, // google api

  //p1
  popularity: number, //counter
};

import {NewPlace} from './NewPlace';

export const PlanView = () => {
  const [plan, setPlan] = useState<planType>({
    id: "string",
    title: "string",
    owner: [],
    days: [],
    planDuration: {
      startDay: new Date(),
      endDay: new Date(),
    },
    note: "string",
    //p1
    desc: "string",
    tag: [],
    likes: 1,

  });

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

  return (
    <div>
      <NewPlace addNewPlace={(place: placeType)=>{console.log(place);}}/>
    </div>


  )
}