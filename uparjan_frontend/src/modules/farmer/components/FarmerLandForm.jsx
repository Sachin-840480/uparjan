import "./FarmerLandForm.css";

const LAND_TYPES = [
  { value: "OWN", label: "Own" },
  { value: "LEASE", label: "Lease" },
  { value: "SHARED", label: "Shared" },
];

export default function FarmerLandForm({
  farmerId,
  aadhaar,
  farmerName,
  districtName,
  mspName,
  blockName,
  panchayatName,
  villageName,
  fatherHusbandName,
  mobileNo,
  category,
  patwariHalkaNo,
  bankName,
  branchName,
  ifscCode,
  accountNo,
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
}) {
  return (
    <div className="land-container">
      <div className="land-card">
        <div className="land-header">Farmer Land Info</div>

        {/* Farmer summary */}
        <div className="farmer-summary-grid">
          <div>
            <span>FARMER ID</span> <span>{farmerId}</span>
          </div>
          <div>
            <span>MSP CENTER</span> <span>{mspName}</span>
          </div>
          <div>
            <span>DISTRICT</span> <span>{districtName}</span>
          </div>
          <div>
            <span>BLOCK</span> <span>{blockName}</span>
          </div>
          <div>
            <span>GRAMPANCHAYAT</span>
            <span>{panchayatName}</span>
          </div>
          <div>
            <span>VILLAGE</span> <span>{villageName}</span>
          </div>
          <div>
            <span>NAME</span> <span>{farmerName}</span>
          </div>
          <div>
            <span>FATHER/HUSBAND NAME</span>
            <span>{fatherHusbandName}</span>
          </div>
          <div>
            <span>CONTACT NO</span> <span>xxxxxxxx{mobileNo?.slice(-2)}</span>
          </div>
          <div>
            <span>CATEGORY</span> <span>{category}</span>
          </div>
          <div>
            <span>HALKA NO</span> <span>{patwariHalkaNo}</span>
          </div>
          <div>
            <span>ADHAR NO</span>{" "}
            <span>xxxx-xxxx-xxxx-{aadhaar?.slice(-3)}</span>
          </div>
          <div>
            <span>BANK NAME</span> <span>{bankName}</span>
          </div>
          <div>
            <span>BANK BRANCH</span> <span>{branchName}</span>
          </div>
          <div>
            <span>IFSC CODE</span> <span>xxxxxxxxx-{ifscCode?.slice(-2)}</span>
          </div>
          <div>
            <span>ACCOUNT NO</span>{" "}
            <span>xxxxxxxxx-{accountNo?.slice(-2)}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Land type + Sub district */}
          <div className="section-row">
            <div className="field-group">
              <label>Land Type</label>
              <select
                name="landType"
                value={formData.landType}
                onChange={handleFormChange}
                className="field-select"
              >
                <option value="">— SELECT —</option>
                {LAND_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="field-group">
              <label>Sub District</label>
              <select
                name="subDistrictId"
                value={formData.subDistrictId}
                onChange={handleSubDistrictChange}
                className="field-select"
              >
                <option value="">— SELECT —</option>
                {subDistricts.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Land record entry */}
          <div className="land-record-section">
            <p className="quota-note">Per acre only 16 quintal is allowed</p>

            <div className="land-entry-grid">
              <div className="field-group">
                <label>Circle</label>
                <select
                  name="circleId"
                  value={draftRecord.circleId}
                  onChange={handleDraftChange}
                  className="field-select"
                  disabled={!formData.subDistrictId}
                >
                  <option value="">Select</option>
                  {circles.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-group">
                <label>Halka</label>
                <select
                  name="halkaId"
                  value={draftRecord.halkaId}
                  onChange={handleDraftChange}
                  className="field-select"
                  disabled={!draftRecord.circleId}
                >
                  <option value="">Select</option>
                  {halkas.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-group">
                <label>Mauja</label>
                <select
                  name="maujaId"
                  value={draftRecord.maujaId}
                  onChange={handleDraftChange}
                  className="field-select"
                  disabled={!draftRecord.halkaId}
                >
                  <option value="">Select</option>
                  {maujas.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-group">
                <label>Crop</label>
                <select
                  name="cropId"
                  value={draftRecord.cropId}
                  onChange={handleDraftChange}
                  className="field-select"
                >
                  <option value="">Select</option>
                  {crops.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {["volumeNoInRegII", "pageNoInRegII", "plotNo", "khasraNo"].map(
                (field) => (
                  <div className="field-group" key={field}>
                    <label>{field.replace(/([A-Z])/g, " $1").trim()}</label>
                    <input
                      name={field}
                      value={draftRecord[field]}
                      onChange={handleDraftChange}
                      className="field-input"
                    />
                  </div>
                ),
              )}

              <div className="field-group">
                <label>Rakba Irrigated (Acre)</label>
                <input
                  name="rakbaIrrigated"
                  type="number"
                  min="0"
                  step="0.01"
                  value={draftRecord.rakbaIrrigated}
                  onChange={handleDraftChange}
                  className="field-input"
                />
              </div>

              <div className="field-group">
                <label>Rakba Unirrigated (Acre)</label>
                <input
                  name="rakbaUnirrigated"
                  type="number"
                  min="0"
                  step="0.01"
                  value={draftRecord.rakbaUnirrigated}
                  onChange={handleDraftChange}
                  className="field-input"
                />
              </div>

              <div className="field-group">
                <label>Expected Crop Irrigated (Qtl)</label>
                <input
                  name="procurementIrrigated"
                  type="number"
                  min="0"
                  step="0.01"
                  value={draftRecord.procurementIrrigated}
                  onChange={handleDraftChange}
                  className="field-input"
                />
              </div>

              <div className="field-group">
                <label>Expected Crop Unirrigated (Qtl)</label>
                <input
                  name="procurementUnirrigated"
                  type="number"
                  min="0"
                  step="0.01"
                  value={draftRecord.procurementUnirrigated}
                  onChange={handleDraftChange}
                  className="field-input"
                />
              </div>
            </div>

            <button type="button" className="add-btn" onClick={addLandRecord}>
              Add
            </button>
          </div>

          {/* Land records table */}
          {formData.landRecords.length > 0 && (
            <div className="land-table-wrapper">
              <table className="land-table">
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Circle</th>
                    <th>Halka</th>
                    <th>Mauja</th>
                    <th>Crop</th>
                    <th>Land Type</th>
                    <th>Vol.</th>
                    <th>Page</th>
                    <th>Khasra</th>
                    <th>Irrigated</th>
                    <th>Unirrigated</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.landRecords.map((r) => (
                    <tr key={r.id}>
                      <td>
                        <button
                          type="button"
                          className="remove-btn"
                          onClick={() => removeLandRecord(r.id)}
                        >
                          Remove
                        </button>
                      </td>
                      <td>{r.circleId}</td>
                      <td>{r.halkaId}</td>
                      <td>{r.maujaId}</td>
                      <td>{r.cropId}</td>
                      <td>{r.landType}</td>
                      <td>{r.volumeNoInRegII}</td>
                      <td>{r.pageNoInRegII}</td>
                      <td>{r.khasraNo}</td>
                      <td>{r.rakbaIrrigated}</td>
                      <td>{r.rakbaUnirrigated}</td>
                      <td>
                        {(
                          parseFloat(r.rakbaIrrigated || 0) +
                          parseFloat(r.rakbaUnirrigated || 0)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {formData.landRecords.length === 0 && (
            <p className="no-records">No land record available</p>
          )}

          {/* Land document + officer */}
          <div className="bottom-section">
            <div className="field-group">
              <label>Land Document (JPEG/PDF, ≤512KB)</label>
              <input
                type="file"
                name="landDocument"
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.pdf"
                className="field-file"
              />
            </div>

            <div className="field-group">
              <label>To Be Verified By Officer</label>
              <select
                name="verifyingOfficerId"
                value={formData.verifyingOfficerId}
                onChange={handleFormChange}
                className="field-select"
              >
                <option value="">— SELECT —</option>
                {officers.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="update-btn" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}
