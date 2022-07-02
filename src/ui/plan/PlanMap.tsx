import React from 'react';
import {useState, useMemo, useCallback, useRef,useEffect} from "react";
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    DirectionsRenderer,
  } from '@react-google-maps/api';
import {placeType} from "./PlanView";
import {Button} from '@mantine/core';
import {TempleBuddhistRounded } from '@mui/icons-material';
import mapMarker from '../assets/icons/map-marker.svg';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

type MapOptions = google.maps.MapOptions;
type DirectionResult = google.maps.DirectionsResult;
// type LatLngLiteral = google.maps.LatLngLiteral;

export const PlanMap = ({selectedPlace, initialCenter, directions, placeMap, mapLength}) => {
    const initial = Object.keys(initialCenter).length !== 0 ? initialCenter: { 
        lat: 48.8584, 
        lng: 2.2945 
    };
    const center = selectedPlace.geo.lat !== 0 ? {
        lat: selectedPlace.geo.lat,
        lng: selectedPlace.geo.lng
    } : initial
    // console.log(center)
    const [places, setPlaces] = useState<placeType[]>([]);
    useEffect(() => {
        setPlaces([...places, selectedPlace])
    }, [selectedPlace])

    const [placesCoord, setplacesCoord] = useState<{lat : number, lng :number}[]>();
    useEffect(()=> {
        const tempCoord = places.map(place => place.id !== "" ? ({
            lat: place.geo.lat,
            lng: place.geo.lng
        }) : { 
            lat: 0, 
            lng: 0
        })
        setplacesCoord(placesCoord => tempCoord)
    },[places])
 
    const [direction, setDirection] = useState<DirectionResult>();
    useEffect(() => {
        if (direction !== undefined){
            setDirection(direction => undefined)
        }
        setDirection(direction => directions)
        // console.log(direction)
    },[directions])

    const options = useMemo<MapOptions>(() => ({
        mapId: "4caeda6124b510c6",
        disabledDefaultUI: true,
        clickableIcons: false,
        streetViewControl: false,
    }), []);
    const mapRef = useRef<GoogleMap>();
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_PLACES_API_KEY!
    });
    //receive instance of map once complete loading
    const onLoad = useCallback(map => (mapRef.current = map),[]);

    if (!isLoaded) return <div>Loading...</div> 

    const resetMap = () => {
        let tempArr : placeType[] = [];
        console.log("State Changed")
        for (let values of placeMap.values()){
            if (values && values[0].id !== ''){
                values.forEach((place : placeType) => {
                tempArr.push(place);
            })
          }
        }
        setPlaces(tempArr)
        setDirection(undefined)
        console.log(placesCoord)
    }

    return (
        <div className = "container">
            <div className = "map">
                {/* <Button onClick = {fetchDirections}>Get Directions</Button> */}
                <Tooltip title="Reset Map">
                    <IconButton onClick={resetMap} aria-label="Reset Map">
                        <RefreshIcon color="primary" fontSize="large"/> 
                    </IconButton>
                </Tooltip>
                {/* <Button onClick = {resetMap}>Reset Map</Button> */}
                <GoogleMap
                    zoom={10} 
                    center={center}
                    mapContainerClassName = "map-container"
                    options = {options}
                    onLoad={onLoad}
                > 
                {/* {directions && directions.map(direction => <DirectionsRenderer directions={direction}/>)} */}
                {placesCoord.map(coord => coord !== null ? 
                    <Marker 
                        position={coord}
                        icon = {{
                            url: mapMarker,
                            scaledSize:  new google.maps.Size(25,30)
                        }}
                    />: null)}
                {direction && <DirectionsRenderer directions={direction}/>}
                </GoogleMap>
            </div>
        </div>
    )

}