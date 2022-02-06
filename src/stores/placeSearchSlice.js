import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'placeSearch',
  initialState: {
    selected: null,
    data: [],
    status: 'idle',
    error: null,
    loading: false,
    value: 0,
  },
  reducers: {
    setSelected: (state, action) =>{
      state.selected = action.payload;
    },
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  },
});

export const { increment, decrement, incrementByAmount, setSelected } = slice.actions;

export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

export const fetchData = createAsyncThunk('placeSearch/fetchData', async () => {
  const response = await fetch('');
  console.log(response)
  //const response = await client.get('/fakeApi/posts')
  return response.data
})

export const selectCount = state => state.placeSearch.value;

export const selectData = state => state.placeSearch.data;
export const selectLoading = state => state.placeSearch.loading;

export default slice.reducer;