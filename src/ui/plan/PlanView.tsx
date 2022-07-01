import * as React from "react";
import {useState, useEffect} from "react";
import {NewPlace} from './NewPlace';
import {PlanMap} from './PlanMap';
import {SearchBar} from './SearchBar';
import {Footer} from "../Footer"
import {Header} from "../Header"
import DayCard from './DayCard';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { NestCamWiredStandSharp } from "@mui/icons-material";

type DirectionResult = google.maps.DirectionsResult;

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
  planDuration: Date,
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
  placeDuration: Date,
  //p1
  popularity: number, //counter
  properties: string[]
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export const PlanView = (props) => {
  const [plan, setPlan] = useState<planType>({
    id: "string",
    title: "string",
    owner: [],
    days: [],
    planDuration: new Date(),
    note: "string",
    //p1
    desc: "string",
    tag: [],
    likes: 1,
  });

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

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

 
  //const [placeMap, setPlaceMap] = useState(new SortedMap())
  const [placeMap, setPlaceMap] = useState(new Map<Date, placeType[] | undefined>())
  useEffect(() => {
    const k = place.placeDuration
    if (placeMap.has(k)){
      const placeList = placeMap.get(k);
      placeList?.push(place)
      setPlaceMap(placeMap => placeMap.set(k,placeList))
    } else {
      const placeList = new Array<placeType>();
      placeList?.push(place)
      setPlaceMap(placeMap => placeMap.set(k, placeList))
    }
    // console.log(placeMap)
  }, [place])


  const getDirections = (places) => {
    fetchDirections(places);
  }

  const [directions, setDirections] = useState<DirectionResult>();

  const fetchDirections = (places) => {
    const placesCoord = places.map(place => place.id !== "" ? ({
      lat: place.geo.lat,
      lng: place.geo.lng
    }) : { 
        lat: 0, 
        lng: 0
    })
    
    if (placesCoord.length === 1){
      alert("Please add more destinations to get direction!")
      return
    }
    const wayPoints = new Array();
    if (placesCoord.length > 2){
      for (var i = 1; i < placesCoord.length-1; i++){
        //push rest of points to wayPoints
        const temp = {
            location: new google.maps.LatLng(placesCoord[i].lat, placesCoord[i].lng)
        }
        wayPoints.push(temp);
      }
    }
    // console.log(placesCoord)
    // console.log(wayPoints)
    const src = placesCoord[0];
    const dest = placesCoord[placesCoord.length-1];
    const service = new google.maps.DirectionsService();
    service.route({
        origin: src,
        destination: dest,
        waypoints: wayPoints,
        travelMode: google.maps.TravelMode.DRIVING,
    }, (result,status) => {
        if (status === "OK" && result) {
          if (directions !== undefined){
            // console.log("clean directions")
            setDirections(directions => undefined)
          }
            setDirections(directions => result)
        }
    })
  }

  const planViewDeleteDay=(date)=>{
    let newMap=new Map(placeMap)
    newMap.delete(date)
    setPlaceMap(newMap);
  }
  

  
  return (
    <div>
      <Header />
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
          <Grid item xs={4}  sx={{
            width: 300,
            color: 'black',
          }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Search Place" {...a11yProps(0)} sx={{mx: "auto"}} />
                <Tab label="View Plan" {...a11yProps(1)} sx={{mx: "auto"}}/>
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <NewPlace place={place} setPlace={setPlace} />
            </TabPanel>

            <TabPanel value={value} index={1}>
            {

                [...placeMap.entries()].sort().map((entry) => {
                const[key,value] = entry;
                if (value && value[0].id !== ''){
                  return (<DayCard date = {key} placeList = {value} getDirections={getDirections} DayCardDelete={(date)=>{planViewDeleteDay(date)}}/>)
                }
              })
              
              // Array.from(new Map([...placeMap.entries()].sort()).entries()).map((entry) => {
              //   const[key,value] = entry;
              //   if (value && value[0].id !== ''){
              //     return (<DayCard date = {key} placeList = {value} getDirections={getDirections} DayCardDelete={(date)=>{planViewDeleteDay(date)}}/>)
              //   }
              // })

              // Array.from(placeMap.entries()).map((entry) => {
              //   const[key,value] = entry;
              //   if (value && value[0].id !== ''){
              //     return (<DayCard date = {key} placeList = {value} getDirections={getDirections} DayCardDelete={(date)=>{planViewDeleteDay(date)}}/>)
              //   }
              // })
            }
            </TabPanel>
  
          </Grid>
          <Grid item xs={8}>
            {/* <SearchBar place={place} setPlace={setPlace}/> */}
            <PlanMap selectedPlace={place} initialCenter = {props.center} directions={directions}/>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </div>
  )
}