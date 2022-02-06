import { configureStore } from '@reduxjs/toolkit'

import placeSearchReducer from './stores/placeSearchSlice'
// import filtersReducer from './features/filters/filtersSlice'

const store = configureStore({
  reducer: {
    placeSearch: placeSearchReducer,
    //filters: filtersReducer
  }
})

export default store
// The thunk middleware was automatically added