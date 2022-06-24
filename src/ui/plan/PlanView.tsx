import * as React from "react";
import {useState} from "react";
import {NewPlace} from './NewPlace';
import {PlanMap} from './PlanMap';
import {SearchBar} from './SearchBar';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LeftFunctionBar from "./LeftFunctionBar";

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
  //iris
  id: string,
  type: string,
  title: string,
  image: string,
  geo: {
    lat: number,
    lng: number,
  }
  rating: number, // google api
  //songHan
  note:  string,
  placeDuration: {
    startTime: Date,
    endTime: Date,
  }
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
        lat: 0,
        lng: 0,
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
            <LeftFunctionBar />
          </Grid>

          <Grid item xs={8}>
            <SearchBar place={place} setPlace={setPlace}/>
            <PlanMap selectedPlace={place}/>
          </Grid>
        </Grid>
      </Box>

    </div>
  )
}