import { configureStore } from "@reduxjs/toolkit";

import districtReducer from "../master/district/districtSlice";
import mspReducer from "../master/msp/mspSlice";
import authReducer from "../auth/store/authSlice";

const store = configureStore({
  reducer: {
    district: districtReducer,
    msp: mspReducer,
    auth: authReducer,
  },
});

export default store;