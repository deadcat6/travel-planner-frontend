import React from 'react'
import { useState, useEffect } from 'react';
import { MultiSelect } from '@mantine/core';

const Create = () => {
    //const [title, ]

    return (
        <div className='create'>
            <h2>Submit a Place Option</h2>
            <form>
                {/* <label>Id</label>
                <input
                    type="text"
                /> */}

                <label>Title</label>
                <textarea
                    required
                ></textarea>

                <label for="url">Image</label>
                <input type="url" name="url" id="url"
                    placeholder="https://example.com"
                    pattern="https://.*" size="30"
                    required>
                </input>

                <label>Duration time</label>
                <input
                    placeholder='Start Time' 
                    type="date">
                </input>
                <input
                    placeholder='End Time' 
                    type="date">
                </input>
                <label>Property</label>
                <select>
                    <option value="hotel">Hotel</option>
                    <option value="museum">Museum</option>
                    <option value="garden">Garden</option>
                    <option value="hot spring">Hot Spring</option>
                </select>

                {/* <label>Description</label>
                <input type="text" /> 

                <label>Cost</label>
                <input type="text" /> 

                <label>Rating</label>
                <input type="text" /> 

                <label>Popularity</label>
                <input type="text" />  */}

                <button>Add Place to List</button>
            </form>
        </div>
    )
}

export default Create