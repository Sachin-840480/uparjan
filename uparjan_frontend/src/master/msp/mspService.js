import axiosClient from "../../core/api/axiosClient";

export const getMspList = async () => axiosClient.get("/master/msps");
