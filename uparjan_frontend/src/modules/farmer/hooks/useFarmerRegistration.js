// import { useEffect, useState } from "react";

// import { useDispatch, useSelector } from "react-redux";

// import { getDistricts } from "../../../master/district/districtService";

// import { getMspList } from "../../../master/msp/mspService";

// import { setDistricts } from "../../../master/district/districtSlice";

// import { setMspList } from "../../../master/msp/mspSlice";

// import { registerFarmer } from "../services/farmerService";

// import { initialFarmerForm } from "../types/farmerTypes";

// export default function useFarmerRegistration() {
//   const dispatch = useDispatch();

//   const districts = useSelector((state) => state.district.districts);

//   const mspList = useSelector((state) => state.msp.mspList);

//   const [formData, setFormData] = useState(initialFarmerForm);

//   useEffect(() => {
//     loadDistricts();
//     loadMspData();
//   }, []);

//   const loadDistricts = async () => {
//     if (districts.length > 0) return;

//     const response = await getDistricts();

//     dispatch(setDistricts(response.data));
//   };

//   const loadMspData = async () => {
//     if (mspList.length > 0) return;

//     const response = await getMspList();

//     dispatch(setMspList(response.data));
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.rePassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     await registerFarmer(formData);

//     alert("Farmer Registered");
//   };

//   return {
//     districts,
//     mspList,
//     formData,
//     handleChange,
//     handleSubmit,
//   };
// }

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getDistricts } from "../../../master/district/districtService";
import { getMspList } from "../../../master/msp/mspService";
import { setDistricts } from "../../../master/district/districtSlice";
import { setMspList } from "../../../master/msp/mspSlice";
import { setFarmerSession } from "./farmerSlice";
import { registerFarmer } from "../services/farmerService";
import { initialFarmerForm } from "../types/farmerTypes";

const AADHAR_REGEX = /^\d{12}$/;
const PASSWORD_MIN_LENGTH = 8;
function validate(formData) {
  if (!formData.districtId) return "Select a district";

  if (!formData.mspId) return "Select an MSP";

  if (!AADHAR_REGEX.test(formData.aadhar)) return "Aadhaar must be 12 digits";

  if (!formData.farmerName.trim()) return "Farmer name required";

  if (formData.password.length < PASSWORD_MIN_LENGTH)
    return `Password min ${PASSWORD_MIN_LENGTH} characters`;

  if (formData.password !== formData.rePassword)
    return "Passwords do not match";

  return null;
}

export default function useFarmerRegistration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const districts = useSelector((state) => state.district.districts);
  const mspList = useSelector((state) => state.msp.mspList);

  const [formData, setFormData] = useState(initialFarmerForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!districts.length) {
      getDistricts()
        .then((res) => dispatch(setDistricts(res.data)))
        .catch(() => toast.error("Failed to load districts"));
    }
    if (!mspList.length) {
      getMspList()
        .then((res) => dispatch(setMspList(res.data)))
        .catch(() => toast.error("Failed to load MSP list"));
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      const { password, rePassword, ...payload } = formData;
      const res = await registerFarmer({ ...payload, password });

      const { farmerId } = res.data.data;
      const selectedDistrict = districts.find((d) => String(d.id) === formData.districtId);
      const selectedMsp = mspList.find((m) => String(m.id) === formData.mspId);

      dispatch(setFarmerSession({
        farmerId,
        aadhaar:      formData.aadhar,
        farmerName:   formData.farmerName,
        districtId:   formData.districtId,
        districtName: selectedDistrict?.name || formData.districtId,
        mspName:      selectedMsp?.name      || formData.mspId,
        registrationStatus: "REGISTERED",
      }));


      toast.success("Registration successful");
      navigate("/farmer-registration/details");
    } catch (err) {
      const message = err?.response?.data?.message || "Registration failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return { districts, mspList, formData, handleChange, handleSubmit, loading };
}
