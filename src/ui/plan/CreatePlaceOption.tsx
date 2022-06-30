import React from 'react'
import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import { Title, Box, Checkbox, Image, Button, Group, MultiSelect, Text,Textarea } from '@mantine/core';
import { placeType } from "./PlanView";

export const CreatePlaceOption = ({selectedPlace, setPlace, submitHandler}) => {
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
          timeRange: '',
          placeProperty: '',
        },
    });

    const submitPlace = e => {
        e.preventDefault();
        setPlace({
            ...selectedPlace,
            id: selectedPlace.placeId,
            placeDuration: form.values.timeRange,
            // placeDuration: {
            //     startTime: form.values.timeRange[0],
            //     endTime: form.values.timeRange[1],
            // },
            title: selectedPlace.name,
            address: selectedPlace.address,
            geo: {
              lat : selectedPlace.geo.lat,
              lng : selectedPlace.geo.lng
            },
            type: selectedPlace.type,
            rating: selectedPlace.rating,
            image: selectedPlace.photoReference,
        });
        submitHandler();
    }

    return (
        <Box className='create'>
            <Title order={2}>Submit a Place Option</Title>
            <form onSubmit={submitPlace}>
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
                    withPlaceholder
                    placeholder={<Text align="center">This image contained the scenery of place</Text>}
                />
 
                {/* <DateRangePicker
                    name="timeRange"
                    label="Duration Time"
                    placeholder="Pick dates range"
                    {...form.getInputProps('timeRange')}
                /> */}

                <DatePicker 
                    name="time"
                    label="Duration Time" 
                    placeholder="Pick a date" 
                    {...form.getInputProps('timeRange')}
                    required 
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

                <Group position="right" mt="md">
                    <Button type="submit">Add Place to List</Button>  
                </Group>
            </form>
        </Box>
    )
}

