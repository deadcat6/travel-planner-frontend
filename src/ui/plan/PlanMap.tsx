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
import mapMarker from './icons/map-marker.svg'

type MapOptions = google.maps.MapOptions;
type DirectionResult = google.maps.DirectionsResult;
type LatLngLiteral = google.maps.LatLngLiteral;

export const PlanMap = ({selectedPlace}) => {
    const center = selectedPlace.geo.lat !== 0 ? {
        lat: selectedPlace.geo.lat,
        lng: selectedPlace.geo.lng
    } : { 
        lat: 48.8584, 
        lng: 2.2945 
    };
    const [places, setPlaces] = useState<placeType[]>([]);
    useEffect(() => {
        setPlaces([...places, selectedPlace])
    }, [selectedPlace])

    const [directions, setDirections] = useState<DirectionResult>();

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
    // console.log("coor",placesCoord)
    // const source = placesCoord[1];
    // const selectedMarker = new Array()
    // const addMarker = (position : LatLngLiteral) => {
    //     selectedMarker.push(position)
    // }
    const fetchDirections = () => {
        const wayPoints = new Array();
        if (placesCoord.length === 2){
            return;
        }
        for (var i = 2; i < placesCoord.length-1; i++){
            //push rest of points to wayPoints
            const temp = {
                location: new google.maps.LatLng(placesCoord[i].lat, placesCoord[i].lng)
            }
            wayPoints.push(temp);
        }
        console.log(wayPoints)
        const src = placesCoord[1];
        const dest = placesCoord[placesCoord.length-1];
        const service = new google.maps.DirectionsService();
            service.route({
                origin: src,
                destination: dest,
                waypoints: wayPoints,
                travelMode: google.maps.TravelMode.DRIVING,
            }, (result,status) => {
                if (status === "OK" && result) {
                    setDirections(directions => result)
                }
            })
    }
    return (
        <div className = "container">
            <div className = "controls">
                {/* <h1> Map</h1> */}

            </div>
            <div className = "map">
                <Button onClick = {fetchDirections}>Get Directions</Button>
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
                {directions && <DirectionsRenderer directions={directions}/>}
                </GoogleMap>
            </div>
        </div>
    )

}