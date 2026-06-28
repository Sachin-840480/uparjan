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
import { setFarmerSession } from "./farmerSlice";
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

  const {
    farmerId,
    aadhaar,
    farmerName,

    districtId,
    districtName,
  } = useSelector((state) => state.farmer);

  const [formData, setFormData] = useState(initialFarmerDetails);
  const [loading, setLoading] = useState(false);
  const [blocks, setBlocks] = useState([]);
  const [panchayats, setPanchayats] = useState([]);
  const [villages, setVillages] = useState([]);
  const [banks, setBanks] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    if (!farmerId) {
      navigate("/farmer-registration");
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
      setFormData((prev) => ({
        ...prev,
        blockId: value,
        panchayatId: "",
        villageId: "",
      }));
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
      setFormData((prev) => ({
        ...prev,
        bankId: value,
        branchId: "",
        ifscCode: "",
      }));
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
    if (error) { toast.error(error); return; }

    setLoading(true);
    try {
      await submitFarmerDetails(farmerId, formData);

      // Resolve names from loaded lists
      const selectedBlock     = blocks.find((b) => String(b.id) === formData.blockId);
      const selectedPanchayat = panchayats.find((p) => String(p.id) === formData.panchayatId);
      const selectedVillage   = villages.find((v) => String(v.id) === formData.villageId);
      const selectedBank      = banks.find((b) => String(b.id) === formData.bankId);
      const selectedBranch    = branches.find((b) => String(b.id) === formData.branchId);

      dispatch(setFarmerSession({
        registrationStatus: "DETAILS_SUBMITTED",
        mobileNo:          formData.mobileNo,
        fatherHusbandName: formData.fatherHusbandName,
        category:          formData.category,
        patwariHalkaNo:    formData.patwariHalkaNo,
        accountNo:         formData.accountNo,
        ifscCode:          formData.ifscCode,
        blockName:         selectedBlock?.name     || formData.blockId,
        panchayatName:     selectedPanchayat?.name || formData.panchayatId,
        villageName:       selectedVillage?.name   || formData.villageId,
        bankName:          selectedBank?.name      || formData.bankId,
        branchName:        selectedBranch?.name    || formData.branchId,
      }));

      toast.success("Details saved");
      navigate("/farmer-registration/land-details");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    farmerId,
    aadhaar,
    farmerName,
    districtName,
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
