import { configureStore } from "@reduxjs/toolkit";

import districtReducer from "../master/district/districtSlice";
import mspReducer from "../master/msp/mspSlice";
import authReducer from "../auth/store/authSlice";
import farmerReducer from "../modules/farmer/hooks/farmerSlice";

const store = configureStore({
  reducer: {
    district: districtReducer,
    msp: mspReducer,
    auth: authReducer,
    farmer: farmerReducer,
  },
});

export default store;
