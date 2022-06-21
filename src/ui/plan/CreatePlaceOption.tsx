import React from 'react'
import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { DateRangePicker } from '@mantine/dates';
import { Title, Box, Checkbox, Image, Button, Group, MultiSelect, Text,Textarea } from '@mantine/core';
import { placeType } from "./PlanView";

const Create = () => {
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
                    placeholder="title"
                    label="Title"
                    required
                    {...form.getInputProps('title')}
                />

                <Image
                    height={240}
                    width={400}
                    radius="sm"
                    src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
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

                <Group position="right" mt="md">
                    <Button type="submit">Add Place to List</Button>  
                </Group>
            </form>
        </Box>
    )
}

export default Create

