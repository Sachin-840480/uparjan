import axiosClient from "../../core/api/axiosClient";

export const getDistricts = async () => axiosClient.get("/master/districts");
