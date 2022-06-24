import * as React from "react";
import {useState} from "react";
import {NewPlace} from './NewPlace';
import {PlanMap} from './PlanMap';
import DayCard from './DayCard';
import {SearchBar} from './SearchBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

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

////////////////

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

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (

    <div>
      <Box sx={{ flexGrow: 1}}>
        <Grid container spacing={2}>
          <Grid item xs={2.5}  sx={{
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
              <NewPlace addNewPlace={(newPlace: placeType)=>{console.log(place);}}/>
            </TabPanel>

            <TabPanel value={value} index={1}>
              
              <DayCard/>
              <DayCard/>
              <DayCard/>
              <DayCard/>
            </TabPanel>
  
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
