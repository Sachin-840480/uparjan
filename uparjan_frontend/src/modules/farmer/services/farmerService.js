import axiosClient from "../../../core/api/axiosClient";

export const registerFarmer = async (data) => {
  return await axiosClient.post("/farmer-register", data);
};

export const submitFarmerDetails = async (farmerId, data) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  return await axiosClient.post(`/farmer/${farmerId}/details`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const submitFarmerLandDetails = async (farmerId, data) => {
  const formData = new FormData();

  const { landDocument, landRecords, ...rest } = data;

  formData.append("payload", JSON.stringify({ ...rest, landRecords }));

  if (landDocument) {
    formData.append("landDocument", landDocument);
  }

  return await axiosClient.put(`/farmer/${farmerId}/land-details`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Master data
export const getBlocks = async (districtId) =>
  axiosClient.get(`/master/blocks?districtId=${districtId}`);

export const getPanchayats = async (blockId) =>
  axiosClient.get(`/master/panchayats?blockId=${blockId}`);

export const getVillages = async (panchayatId) =>
  axiosClient.get(`/master/villages?panchayatId=${panchayatId}`);

export const getBanks = async () => axiosClient.get("/master/banks");

export const getBranches = async (bankId) =>
  axiosClient.get(`/master/branches?bankId=${bankId}`);

export const getSubDistricts = async (districtId) =>
  axiosClient.get(`/master/sub-districts?districtId=${districtId}`);

export const getCircles = async (subDistrictId) =>
  axiosClient.get(`/master/circles?subDistrictId=${subDistrictId}`);

export const getHalkas = async (circleId) =>
  axiosClient.get(`/master/halkas?circleId=${circleId}`);

export const getMaujas = async (halkaId) =>
  axiosClient.get(`/master/maujas?halkaId=${halkaId}`);

export const getCrops = async () => axiosClient.get("/master/crops");

export const getOfficers = async (districtId) =>
  axiosClient.get(`/master/officers?districtId=${districtId}`);
