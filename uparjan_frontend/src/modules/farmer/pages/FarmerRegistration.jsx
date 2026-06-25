import FarmerForm from "../components/FarmerForm";

import useFarmerRegistration from "../hooks/useFarmerRegistration";

export default function FarmerRegistration() {
  const { districts, mspList, formData, handleChange, handleSubmit } =
    useFarmerRegistration();

  return (
    <FarmerForm
      districts={districts}
      mspList={mspList}
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}
