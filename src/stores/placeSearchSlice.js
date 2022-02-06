import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'placeSearch',
  initialState: {
    selected: null,
    data: [],
    status: 'idle',
    error: null,
    loading: false
  },
  reducers: {
    setSelected: (state, action) =>{
      state.selected = action.payload;
    },
  },
});

export const { setSelected } = slice.actions;

export const fetchData = createAsyncThunk('placeSearch/fetchData', async () => {
  const response = await fetch('');
  console.log(response)
  //ToDo: Implement fetch Google Suggested Place  API
  //const response = await client.get('/fakeApi/posts')
  return response.data
});

export const selectData = state => state.placeSearch.data;
export const selectLoading = state => state.placeSearch.loading;

export default slice.reducer;