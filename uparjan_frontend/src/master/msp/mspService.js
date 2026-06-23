import axiosClient from "../../core/api/axiosClient";

export const getMspList = async () => {
  return await axiosClient.get("/msp");
};