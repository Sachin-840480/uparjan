import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  farmerId: null,
  aadhaar: null,
  farmerName: null,
  districtId: null,
  districtName: null,
  mspName: null,
  blockName: null,
  panchayatName: null,
  villageName: null,
  fatherHusbandName: null,
  mobileNo: null,
  category: null,
  patwariHalkaNo: null,
  bankName: null,
  branchName: null,
  ifscCode: null,
  accountNo: null,
  registrationStatus: null,
};

const farmerSlice = createSlice({
  name: "farmer",
  initialState,
  reducers: {
    setFarmerSession(state, action) {
      return { ...state, ...action.payload };
    },
    clearFarmerSession() {
      return initialState;
    },
  },
});

export const { setFarmerSession, clearFarmerSession } = farmerSlice.actions;
export default farmerSlice.reducer;