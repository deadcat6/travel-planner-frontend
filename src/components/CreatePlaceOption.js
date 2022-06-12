import React from 'react'

const Create = () => {

    return (
        <div className='create'>
            <h2>Submit a Place Option</h2>
            <form>
                <label>Id</label>
                <input
                    type="text"
                />

                <label>Title</label>
                <textarea
                    required
                ></textarea>

                <label>Image</label>

                <label>Duration Time</label>
                <textarea
                    placeholder='Start Time'
                    required
                ></textarea>
                <textarea
                    placeholder='End Time'
                    required
                ></textarea>

                <label>Property</label>
                <select>
                    <option value="hotel"></option>
                    <option value="museum"></option>
                    <option value="garden"></option>
                    <option value="hot spring"></option>
                </select>

                <label>Description</label>

                <label>Cost</label>

                <label>Rating</label>

                <label>Popularity</label>

                <button>Add Place to List</button>
            </form>
        </div>
    )
}

export default Create