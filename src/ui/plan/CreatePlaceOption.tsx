import React from 'react'
import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import { Title, Box, Checkbox, Image, Button, Group, MultiSelect, Text,Textarea } from '@mantine/core';

export const CreatePlaceOption = (props) => {
    const [property, setProperty] = useState(['Hotel', 'Museum', 'Garden', 'Hot Spring'])

    const form = useForm({
        initialValues: {
          title: '',
          image: '',
          timeRange: '',
          placeProperty: [],
        },
    });

    const submitPlace = () => {
        props.setPlace(selectedPlace => ({
            ...props.selectedPlace,
            placeDuration: form.values.timeRange,
            title: form.values.title,
            properties: form.values.placeProperty,
        }));
        console.log(props.selectedPlace)
        props.submitHandler();
    }

    return (
        <Box className='create'>
            <Title order={2}>Submit a Place Option</Title>
            <form onSubmit={form.onSubmit(submitPlace)}>
                <Textarea
                    placeholder={props.selectedPlace.title}
                    label="Title"
                    required
                    {...form.getInputProps('title')}
                />

                <Image
                    height={240}
                    width={400}
                    radius="sm"
                    src={props.selectedPlace.image}
                    withPlaceholder
                    placeholder={<Text align="center">This image contained the scenery of place</Text>}
                />

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

