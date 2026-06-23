import { createSlice } from "@reduxjs/toolkit";

const districtSlice = createSlice({
  name: "district",

  initialState: {
    districts: [],
  },

  reducers: {
    setDistricts: (state, action) => {
      state.districts = action.payload;
    },
  },
});

export const { setDistricts } =
  districtSlice.actions;

export default districtSlice.reducer;