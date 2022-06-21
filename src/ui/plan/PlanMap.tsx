import { useState, useMemo, useCallback, useRef } from "react";
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
  } from '@react-google-maps/api'

type MapOptions = google.maps.MapOptions;
type DirectionResult = google.maps.DirectionsResult;

export const PlanMap = ({selectedPlace}) => {
    const place = selectedPlace
    const center = place.geo.lat !== '' ? {
        lat: place.geo.lat,
        lng: place.geo.lng
    } : { 
        lat: 48.8584, 
        lng: 2.2945 
    };
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
    return (
        <div className = "container">
            <div className = "controls">
                {/* <h1> Map</h1> */}

            </div>
            <div className = "map">
                <GoogleMap 
                    zoom={10} 
                    center={center}
                    mapContainerClassName = "map-container"
                    options = {options}
                    onLoad={onLoad}
                > 
                {selectedPlace.id !== '' ? <Marker position={center} /> : null}
                
                
                </GoogleMap>
            </div>
        </div>
    )

}