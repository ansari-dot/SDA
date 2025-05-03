import { createSlice } from '@reduxjs/toolkit'


const hotelSlice = createSlice({
    name: 'hotel',
    initialState: {},
    reducers: {
        setHotel: (state, action) => {
            state.hotelDetail = action.payload;
        }
    }
})
export const { setHotel } = hotelSlice.actions;
export default hotelSlice.reducer;