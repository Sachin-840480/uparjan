// // import { useEffect, useState } from "react";

// // import { useDispatch, useSelector } from "react-redux";

// // import { getDistricts } from "../../../master/district/districtService";

// // import { getMspList } from "../../../master/msp/mspService";

// // import { setDistricts } from "../../../master/district/districtSlice";

// // import { setMspList } from "../../../master/msp/mspSlice";

// // import { registerFarmer } from "../services/farmerService";

// // import { initialFarmerForm } from "../types/farmerTypes";

// // export default function useFarmerRegistration() {
// //   const dispatch = useDispatch();

// //   const districts = useSelector((state) => state.district.districts);

// //   const mspList = useSelector((state) => state.msp.mspList);

// //   const [formData, setFormData] = useState(initialFarmerForm);

// //   useEffect(() => {
// //     loadDistricts();
// //     loadMspData();
// //   }, []);

// //   const loadDistricts = async () => {
// //     if (districts.length > 0) return;

// //     const response = await getDistricts();

// //     dispatch(setDistricts(response.data));
// //   };

// //   const loadMspData = async () => {
// //     if (mspList.length > 0) return;

// //     const response = await getMspList();

// //     dispatch(setMspList(response.data));
// //   };

// //   const handleChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (formData.password !== formData.rePassword) {
// //       alert("Passwords do not match");
// //       return;
// //     }

// //     await registerFarmer(formData);

// //     alert("Farmer Registered");
// //   };

// //   return {
// //     districts,
// //     mspList,
// //     formData,
// //     handleChange,
// //     handleSubmit,
// //   };
// // }

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// import { getDistricts } from "../../../master/district/districtService";
// import { getMspList } from "../../../master/msp/mspService";
// import { setDistricts } from "../../../master/district/districtSlice";
// import { setMspList } from "../../../master/msp/mspSlice";
// import { setFarmerSession } from "../farmerSlice";
// import { registerFarmer } from "../services/farmerService";
// import { initialFarmerForm } from "../types/farmerTypes";

// const AADHAR_REGEX = /^\d{12}$/;
// const PASSWORD_MIN_LENGTH = 8;

// function validate(formData) {
//   if (!formData.districtId) return "Select a district";
//   if (!formData.mspId) return "Select an MSP";
//   if (!AADHAR_REGEX.test(formData.aadhar)) return "Aadhaar must be 12 digits";
//   if (!formData.farmerName.trim()) return "Farmer name required";
//   if (formData.password.length < PASSWORD_MIN_LENGTH)
//     return `Password min ${PASSWORD_MIN_LENGTH} characters`;
//   if (formData.password !== formData.rePassword) return "Passwords do not match";
//   return null;
// }

// export default function useFarmerRegistration() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const districts = useSelector((state) => state.district.districts);
//   const mspList = useSelector((state) => state.msp.mspList);

//   const [formData, setFormData] = useState(initialFarmerForm);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!districts.length) {
//       getDistricts()
//         .then((res) => dispatch(setDistricts(res.data)))
//         .catch(() => toast.error("Failed to load districts"));
//     }
//     if (!mspList.length) {
//       getMspList()
//         .then((res) => dispatch(setMspList(res.data)))
//         .catch(() => toast.error("Failed to load MSP list"));
//     }
//   }, []);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const error = validate(formData);
//     if (error) {
//       toast.error(error);
//       return;
//     }

//     setLoading(true);
//     try {
//       const { password, rePassword, ...payload } = formData;
//       const res = await registerFarmer({ ...payload, password });

//       const { farmerId } = res.data;

//       dispatch(
//         setFarmerSession({
//           farmerId,
//           aadhaar: formData.aadhar,
//           farmerName: formData.farmerName,
//           districtId: formData.districtId,
//           registrationStatus: "REGISTERED",
//         })
//       );

//       toast.success("Registration successful");
//       navigate("/farmer/details");
//     } catch (err) {
//       const message = err?.response?.data?.message || "Registration failed";
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { districts, mspList, formData, handleChange, handleSubmit, loading };
// }

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getBlocks,
  getPanchayats,
  getVillages,
  getBanks,
  getBranches,
  submitFarmerDetails,
} from "../services/farmerService";
import { setFarmerSession } from "../farmerSlice";
import {
  initialFarmerDetails,
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE_BYTES,
} from "../types/farmerTypes";

function validateFile(file) {
  if (!file) return "File required";
  if (!ALLOWED_FILE_TYPES.includes(file.type))
    return "Only JPEG, JPG, or PDF allowed";
  if (file.size > MAX_FILE_SIZE_BYTES) return "File must be under 512 KB";
  return null;
}

function validate(data) {
  if (!/^\d{10}$/.test(data.mobileNo)) return "Mobile number must be 10 digits";
  if (!data.blockId) return "Select a block";
  if (!data.panchayatId) return "Select a panchayat";
  if (!data.villageId) return "Select a village";
  if (!data.fatherHusbandName.trim()) return "Father/Husband name required";
  if (!data.category) return "Select a category";
  if (!data.bankId) return "Select a bank";
  if (!data.branchId) return "Select a branch";
  if (!data.accountNo.trim()) return "Account number required";
  if (!data.patwariHalkaNo.trim()) return "Patwari Halka number required";

  const aadhaarErr = validateFile(data.aadhaarFile);
  if (aadhaarErr) return `Aadhaar: ${aadhaarErr}`;

  const passbookErr = validateFile(data.bankPassbookFile);
  if (passbookErr) return `Bank Passbook: ${passbookErr}`;

  return null;
}

export default function useFarmerDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { farmerId, aadhaar, farmerName, districtId } = useSelector(
    (state) => state.farmer
  );

  const [formData, setFormData] = useState(initialFarmerDetails);
  const [loading, setLoading] = useState(false);

  const [blocks, setBlocks] = useState([]);
  const [panchayats, setPanchayats] = useState([]);
  const [villages, setVillages] = useState([]);
  const [banks, setBanks] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    if (!farmerId) {
      navigate("/farmer/register");
      return;
    }
    getBanks()
      .then((res) => setBanks(res.data))
      .catch(() => toast.error("Failed to load banks"));

    if (districtId) {
      getBlocks(districtId)
        .then((res) => setBlocks(res.data))
        .catch(() => toast.error("Failed to load blocks"));
    }
  }, [farmerId, districtId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "blockId") {
      setPanchayats([]);
      setVillages([]);
      setFormData((prev) => ({ ...prev, blockId: value, panchayatId: "", villageId: "" }));
      if (value) {
        getPanchayats(value)
          .then((res) => setPanchayats(res.data))
          .catch(() => toast.error("Failed to load panchayats"));
      }
    }

    if (name === "panchayatId") {
      setVillages([]);
      setFormData((prev) => ({ ...prev, panchayatId: value, villageId: "" }));
      if (value) {
        getVillages(value)
          .then((res) => setVillages(res.data))
          .catch(() => toast.error("Failed to load villages"));
      }
    }

    if (name === "bankId") {
      setBranches([]);
      setFormData((prev) => ({ ...prev, bankId: value, branchId: "", ifscCode: "" }));
      if (value) {
        getBranches(value)
          .then((res) => setBranches(res.data))
          .catch(() => toast.error("Failed to load branches"));
      }
    }

    if (name === "branchId") {
      const selected = branches.find((b) => String(b.id) === value);
      setFormData((prev) => ({
        ...prev,
        branchId: value,
        ifscCode: selected?.ifscCode || "",
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;

    const err = validateFile(file);
    if (err) {
      toast.error(`${name}: ${err}`);
      e.target.value = "";
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate(formData);
    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);
    try {
      await submitFarmerDetails(farmerId, formData);

      dispatch(setFarmerSession({ registrationStatus: "DETAILS_SUBMITTED" }));

      toast.success("Details saved");
      navigate("/farmer/land-details");
    } catch (err) {
      const message = err?.response?.data?.message || "Submission failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    farmerId,
    aadhaar,
    farmerName,
    formData,
    loading,
    blocks,
    panchayats,
    villages,
    banks,
    branches,
    handleChange,
    handleFileChange,
    handleSubmit,
  };
}
