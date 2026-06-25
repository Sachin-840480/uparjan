import axiosClient from "../../core/api/axiosClient";
console.log("axiosClient =", axiosClient);
export const getDistricts = async () => {
  return await axiosClient.get("/districts");
};