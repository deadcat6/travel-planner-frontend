import React from 'react'
import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { DateRangePicker } from '@mantine/dates';
import { Title, Box, Checkbox, Image, Button, Group, MultiSelect, Text,Textarea } from '@mantine/core';
import { placeType } from "./PlanView";

export const CreatePlaceOption = ({selectedPlace}) => {
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

    //const obj = 
    // props.setPlace({
    //     ...props.place, 
    //     title: form.title
    //     duration: form.datarange
    //     id: selectedPlace.id..
    //     address: placeInfo.address,
    //     geo: {
    //       lat : placeInfo.coordinates.lat,
    //       lng : placeInfo.coordinates.lng
    //     },
    //     type: placeInfo.type,
    //     rating: placeInfo.rating,
    //     image: placeInfo.photoReference
    //   });

    const [property, setProperty] = useState(['Hotel', 'Museum', 'Garden', 'Hot Spring'])
    const [value, setValue] = useState<[Date | null, Date | null]>([
        new Date(2022, 0, 1),
        new Date(2022, 0, 5),
    ]);

    const form = useForm({
        initialValues: {
          id: '',
          title: '',
          image: '',
          dataRange: '',
          placeProperty: '',
          save: false,
        },
    });

    return (
        <Box className='create'>
            <Title order={2}>Submit a Place Option</Title>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <Textarea
                    placeholder={uuidv4()}
                    label="Id"
                    required
                    {...form.getInputProps('id')}
                />

                <Textarea
                    placeholder={selectedPlace.title}
                    label="Title"
                    required
                    {...form.getInputProps('title')}
                />

                <Image
                    height={240}
                    width={400}
                    radius="sm"
                    src={selectedPlace.image}
                    alt="Random unsplash image"
                    withPlaceholder
                    placeholder={<Text align="center">This image contained the scenery of place</Text>}
                />
 
                <DateRangePicker
                    name="dataRange"
                    label="Duration Time"
                    placeholder="Pick dates range"
                    {...form.getInputProps('dataRange')}
                />
                
                <MultiSelect
                    name="placeProperty"
                    label="Place Property"
                    data={property}
                    placeholder="Select items"
                    searchable
                    creatable
                    getCreateLabel={(query) => `+ Create ${query}`}
                    onCreate={(query) => setProperty((current) => [...current, query])}
                    {...form.getInputProps('placeProperty')}
                />

                {/* const clickSubmit = () => {
                    setPlace(
                        .....
                    )
                    submitHandler()
                } */}

                <Group position="right" mt="md">
                    <Button type="submit">Add Place to List</Button>  
                </Group>
            </form>
        </Box>
    )
}

