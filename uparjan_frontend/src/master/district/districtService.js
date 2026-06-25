import axiosClient from "../../core/api/axiosClient";

export const getDistricts = async () => {
  return await axiosClient.get("/districts");
};
