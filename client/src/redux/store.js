import { configureStore } from '@reduxjs/toolkit'
import placeReducer from './placeSlice'
import hotelReducer from './hotelSlice'
export const store = configureStore({
    reducer: {
        place: placeReducer,
        hotel: hotelReducer
    }


})