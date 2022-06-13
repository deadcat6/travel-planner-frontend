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
  title: string,
  image: string,
  note:  string,
  rating: number, // google api
  placeDuration: {
  startTime: Date,
  endTime: Date,
  }
  type: typeOfPlace
  geo: {
    lat: string,
    lng: string,
  }
  //p1
  popularity: number, //counter
};

export const PlanView = () => {
  const [plan, setPlan] = useState<planType>();


  return (
    <div>
      plan view page
    </div>

  )
}