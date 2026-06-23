import { createSlice } from "@reduxjs/toolkit";

const mspSlice = createSlice({
  name: "msp",

  initialState: {
    mspList: [],
  },

  reducers: {
    setMspList: (state, action) => {
      state.mspList = action.payload;
    },
  },
});

export const { setMspList } =
  mspSlice.actions;

export default mspSlice.reducer;