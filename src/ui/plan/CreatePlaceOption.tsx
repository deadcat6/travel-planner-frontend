import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import { Title, Box, Image, Button, Group, MultiSelect, InputWrapper, Text,Textarea } from '@mantine/core';
import {placeType} from "./PlanView";

const Create = () => {
    const [id, setId] = useState(0)
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [property, setProperty] = useState(['Hotel', 'Museum', 'Garden', 'Hot Spring'])
    const [place, setPlace] = useState<placeType> ({
          id: "string",
          note: "string",
          placeDuration: {
              startTime: new Date(),
              endTime: new Date(),
          },
          //iris
          type: "string",
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
    return (
        <Box className='create'>
            <Title order={2}>Submit a Place Option</Title>
            <form>
                <Textarea
                    placeholder={uuidv4()}
                    label="Id"
                    required
                    onChange={event => {
                        setPlace(...place, {image: event.target.value});
                    }}
                />

                <Textarea
                    placeholder="title"
                    label="Title"
                    required
                />

                <Image
                    radius="md"
                    src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                    alt="Random unsplash image"
                />
 
                <InputWrapper label = "Duration Time">
                    <input
                        type="date">
                    </input>
                    <input
                        type="date">
                    </input>
                </InputWrapper>
                
                <MultiSelect
                    label="Place Property "
                    data={property}
                    placeholder="Select items"
                    searchable
                    creatable
                    getCreateLabel={(query) => `+ Create ${query}`}
                    onCreate={(query) => setProperty((current) => [...current, query])}
                />

                <Group position="right" mt="md">
                    <Button>Add Place to List</Button>
                </Group>
            </form>
        </Box>
    )
}

export default Create

