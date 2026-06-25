import DistrictDropdown from "../../../shared/components/DistrictDropdown";

import MspDropdown from "../../../shared/components/MspDropdown";

import "./FarmerRegistration.css";

export default function FarmerForm({
  districts,
  mspList,
  formData,
  handleChange,
  handleSubmit,
}) {
  return (
    <div className="registration-container">
      <div className="registration-card">
        <h2>Farmer Registration</h2>

        <form onSubmit={handleSubmit}>
          <DistrictDropdown
            districts={districts}
            value={formData.district}
            onChange={handleChange}
          />

          <MspDropdown
            mspList={mspList}
            value={formData.msp}
            onChange={handleChange}
          />

          <input
            type="text"
            name="aadhar"
            placeholder="Aadhar Number"
            value={formData.aadhar}
            onChange={handleChange}
            className="form-input"
          />

          <input
            type="text"
            name="farmerName"
            placeholder="Farmer Name"
            value={formData.farmerName}
            onChange={handleChange}
            className="form-input"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
          />

          <input
            type="password"
            name="rePassword"
            placeholder="Retype Password"
            value={formData.rePassword}
            onChange={handleChange}
            className="form-input"
          />

          <button className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
}
