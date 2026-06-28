export const initialFarmerForm = {
  districtId: "",
  mspId: "",
  aadhar: "",
  farmerName: "",
  password: "",
  rePassword: "",
};

export const initialFarmerDetails = {
  mobileNo: "",
  blockId: "",
  panchayatId: "",
  villageId: "",
  fatherHusbandName: "",
  category: "",
  bankId: "",
  branchId: "",
  ifscCode: "",
  accountNo: "",
  patwariHalkaNo: "",
  aadhaarFile: null,
  bankPassbookFile: null,
};

export const initialLandRecord = {
  circleId: "",
  halkaId: "",
  maujaId: "",
  cropId: "",
  volumeNoInRegII: "",
  pageNoInRegII: "",
  plotNo: "",
  khasraNo: "",
  rakbaIrrigated: "",
  rakbaUnirrigated: "",
  procurementIrrigated: "",
  procurementUnirrigated: "",
};

export const initialFarmerLandDetails = {
  landType: "",
  subDistrictId: "",
  landRecords: [],
  landDocument: null,
  verifyingOfficerId: "",
};

export const CATEGORIES = [
  { value: "GENERAL", label: "General" },
  { value: "OBC", label: "OBC" },
  { value: "SC", label: "SC" },
  { value: "ST", label: "ST" },
];

export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/jpg", "application/pdf"];
export const MAX_FILE_SIZE_BYTES = 512 * 1024; 
