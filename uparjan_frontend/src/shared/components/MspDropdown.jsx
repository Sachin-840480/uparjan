export default function MspDropdown({ mspList, value, onChange }) {
  return (
    // <select name="msp" value={value} onChange={onChange} className="form-input">
    <select name="mspId" value={value} onChange={onChange} className="form-input">
      <option value="">Select MSP</option>

      {mspList.map((msp) => (
        <option key={msp.id} value={msp.id}>
          {msp.name}
        </option>
      ))}
    </select>
  );
}
