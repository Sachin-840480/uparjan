import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getSubDistricts,
  getCircles,
  getHalkas,
  getMaujas,
  getCrops,
  getOfficers,
  submitFarmerLandDetails,
} from "../services/farmerService";
import {
  initialFarmerLandDetails,
  initialLandRecord,
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE_BYTES,
} from "../types/farmerTypes";

const MAX_QUINTAL_PER_ACRE = 16;

function validateLandRecord(record) {
  if (!record.circleId) return "Select circle";
  if (!record.halkaId) return "Select halka";
  if (!record.maujaId) return "Select mauja";
  if (!record.cropId) return "Select crop";
  if (!record.landType) return "Select land type";

  const totalRakba =
    parseFloat(record.rakbaIrrigated || 0) +
    parseFloat(record.rakbaUnirrigated || 0);

  if (totalRakba <= 0) return "Rakba must be > 0";

  const maxQtl = totalRakba * MAX_QUINTAL_PER_ACRE;

  const totalExpected =
    parseFloat(record.procurementIrrigated || 0) +
    parseFloat(record.procurementUnirrigated || 0);

  if (totalExpected > maxQtl)
    return `Expected crop exceeds limit (max ${maxQtl} qtl for ${totalRakba} acres)`;

  return null;
}

export default function useFarmerLandDetails() {
  const navigate = useNavigate();

  const { farmerId, aadhaar, farmerName, districtId, registrationStatus } =
    useSelector((state) => state.farmer);

  const [formData, setFormData] = useState(initialFarmerLandDetails);
  const [draftRecord, setDraftRecord] = useState(initialLandRecord);
  const [loading, setLoading] = useState(false);

  const [subDistricts, setSubDistricts] = useState([]);
  const [circles, setCircles] = useState([]);
  const [halkas, setHalkas] = useState([]);
  const [maujas, setMaujas] = useState([]);
  const [crops, setCrops] = useState([]);
  const [officers, setOfficers] = useState([]);

  useEffect(() => {
    if (!farmerId || registrationStatus === "REGISTERED") {
      navigate("/farmer/details");
      return;
    }

    getCrops()
      .then((res) => setCrops(res.data))
      .catch(() => toast.error("Failed to load crops"));

    if (districtId) {
      getSubDistricts(districtId)
        .then((res) => setSubDistricts(res.data))
        .catch(() => toast.error("Failed to load sub-districts"));

      getOfficers(districtId)
        .then((res) => setOfficers(res.data))
        .catch(() => toast.error("Failed to load officers"));
    }
  }, [farmerId, districtId, registrationStatus]);

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast.error("Only JPEG, JPG, PDF allowed");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error("File must be under 512 KB");
      e.target.value = "";
      return;
    }
    setFormData((prev) => ({ ...prev, landDocument: file }));
  };

  const handleDraftChange = (e) => {
    const { name, value } = e.target;
    setDraftRecord((prev) => ({ ...prev, [name]: value }));

    if (name === "circleId") {
      setHalkas([]);
      setMaujas([]);
      setDraftRecord((prev) => ({ ...prev, circleId: value, halkaId: "", maujaId: "" }));
      if (value) {
        getHalkas(value)
          .then((res) => setHalkas(res.data))
          .catch(() => toast.error("Failed to load halkas"));
      }
    }

    if (name === "halkaId") {
      setMaujas([]);
      setDraftRecord((prev) => ({ ...prev, halkaId: value, maujaId: "" }));
      if (value) {
        getMaujas(value)
          .then((res) => setMaujas(res.data))
          .catch(() => toast.error("Failed to load maujas"));
      }
    }
  };

  const handleSubDistrictChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, subDistrictId: value }));
    setCircles([]);
    if (value) {
      getCircles(value)
        .then((res) => setCircles(res.data))
        .catch(() => toast.error("Failed to load circles"));
    }
  };

  const addLandRecord = () => {
    const err = validateLandRecord(draftRecord);
    if (err) {
      toast.error(err);
      return;
    }
    setFormData((prev) => ({
      ...prev,
      landRecords: [...prev.landRecords, { ...draftRecord, id: Date.now() }],
    }));
    setDraftRecord(initialLandRecord);
    toast.success("Land record added");
  };

  const removeLandRecord = (id) => {
    setFormData((prev) => ({
      ...prev,
      landRecords: prev.landRecords.filter((r) => r.id !== id),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.landType) { toast.error("Select land type"); return; }
    if (!formData.subDistrictId) { toast.error("Select sub-district"); return; }
    if (formData.landRecords.length === 0) { toast.error("Add at least one land record"); return; }
    if (!formData.verifyingOfficerId) { toast.error("Select verifying officer"); return; }

    setLoading(true);
    try {
      await submitFarmerLandDetails(farmerId, formData);
      toast.success("Land details submitted");
      navigate("/farmer/dashboard");
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
    draftRecord,
    loading,
    subDistricts,
    circles,
    halkas,
    maujas,
    crops,
    officers,
    handleFormChange,
    handleFileChange,
    handleDraftChange,
    handleSubDistrictChange,
    addLandRecord,
    removeLandRecord,
    handleSubmit,
  };
}
