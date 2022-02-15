import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'placeSearch',
  initialState: {
    selected: null,
    data: [],
    status: 'idle',
    error: null,
    loading: false,
    histories:[],
  },
  reducers: {
    setSelected: (state, action) =>{
      state.selected = action.payload;
      if(action.payload) {
        let tempHistories = [...state.histories] ?? [];
        const duplicateIndex = tempHistories?.findIndex((item) => item.place_id === action.payload.place_id) ?? -1;

        if(action.payload.structured_formatting){
          action.payload.matched_substrings = [];
          action.payload.structured_formatting.main_text_matched_substrings = [];
        }
        
        if(duplicateIndex === -1){
          tempHistories = [{...action.payload, history: true}, ...tempHistories];
          if(tempHistories.length > 2)
            tempHistories = tempHistories.slice(0, 2)
        }
        state.histories = tempHistories;
      }
    },
  },
});

export const { setSelected, setHistory } = slice.actions;

export const fetchData = createAsyncThunk('placeSearch/fetchData', async () => {
  const response = await fetch('');
  console.log(response)
  //ToDo: Implement fetch Google Suggested Place  API
  //const response = await client.get('/fakeApi/posts')
  return response.data
});

export const selectData = state => state.placeSearch.data;
export const selectLoading = state => state.placeSearch.loading;
export const selectHistories = state => state.placeSearch.histories;

export default slice.reducer;