import * as React from "react";
import {useState} from "react";
// @ts-ignore
import {NewPlace} from './NewPlace.tsx';


import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}  sx={{
            width: 300,
            color: 'black',
          }}>
            <NewPlace addNewPlace={(newPlace: placeType)=>{console.log(place);}}/>
          </Grid>
          <Grid item xs={8}>
            <div>123</div>
          </Grid>
        </Grid>
      </Box>

    </div>


  )
}