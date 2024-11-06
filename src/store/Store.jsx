import { configureStore } from '@reduxjs/toolkit'
import movieReducer from "./reducers/movieSlice.jsx"
import tvReducer from "./reducers/tvSlice.jsx"
import personReducer from "./reducers/personSlice.jsx"

export const store = configureStore({
  reducer: {
    movie:movieReducer,
    tv:tvReducer,
    person:personReducer,
  },
})