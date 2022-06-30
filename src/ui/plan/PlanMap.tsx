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

type MapOptions = google.maps.MapOptions;
type DirectionResult = google.maps.DirectionsResult;
// type LatLngLiteral = google.maps.LatLngLiteral;

export const PlanMap = ({selectedPlace, initialCenter, directions}) => {
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
    // useEffect(() => {
    //     setPlaces(placeList)
    // },[placeList])

    const [direction, setDirection] = useState<DirectionResult>();
    useEffect(() => {
        if (direction !== undefined){
            setDirection(direction => undefined)
        }
        setDirection(direction => directions)
        console.log(direction)
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
    const placesCoord = places.map(place => place.id !== "" ? ({
        lat: place.geo.lat,
        lng: place.geo.lng
    }) : { 
        lat: 0, 
        lng: 0
    })

    return (
        <div className = "container">
            <div className = "map">
                {/* <Button onClick = {fetchDirections}>Get Directions</Button> */}
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