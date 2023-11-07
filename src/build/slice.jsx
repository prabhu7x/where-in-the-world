import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { nanoid } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk(
    'api', async()=>{
    const response = await axios.get('data.json')
    return response.data
    } 
)

const initialState = {
    data: [],
    status: 'idle'
}

const slicer = createSlice({
    name: 'api',
    initialState,
    reducers:{
    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchData.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(fetchData.fulfilled, (state, action)=>{
            state.status = 'success'
            const loaded_data = action.payload.map((country,index)=>{
                country.countryId = index
                country.id = nanoid()
                return country
            })
            state.data = state.data.concat(loaded_data)
        })
        .addCase(fetchData.rejected, (state)=>{
            state.status = 'failed'
        })
    }
})

export const selectById = (state, id) =>
  state.jsonData.data.find((country) => country.countryId === Number(id));

export default slicer.reducer; 