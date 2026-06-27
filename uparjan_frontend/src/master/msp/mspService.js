import axiosClient from "../../core/api/axiosClient";

// export const getMspList = async () => {
//   return await axiosClient.get("/msp");
// };

export const getMspList = async () => axiosClient.get("/master/msps");
