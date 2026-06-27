export default function DistrictDropdown({ districts, value, onChange }) {
  return (

    // <select
    //   name="district"
    //   value={value}
    //   onChange={onChange}
    //   className="form-input"
    // >
    
    <select
      name="districtId"
      value={value}
      onChange={onChange}
      className="form-input"
    >
      <option value="">Select District</option>

      {districts.map((district) => (
        <option key={district.id} value={district.id}>
          {district.name}
        </option>
      ))}
    </select>
  );
}
