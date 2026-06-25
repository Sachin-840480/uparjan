import { CATEGORIES } from "../types/farmerTypes";
import "./FarmerDetails.css";

export default function FarmerDetailsForm({
  farmerId, aadhaar, farmerName,
  formData, loading,
  blocks, panchayats, villages,
  banks, branches,
  handleChange, handleFileChange, handleSubmit,
}) {
  return (
    <div className="details-container">
      <div className="details-card">
        <div className="details-header">Fill Basic Detail</div>

        {farmerId && (
          <p className="farmer-id-notice">
            Your Farmer ID is <strong>{farmerId}</strong> and your registration is approved by DSO
          </p>
        )}

        <form onSubmit={handleSubmit} className="details-form">
          <div className="form-grid">
            <div className="field-group">
              <label>Aadhaar No. *</label>
              <input value={aadhaar || ""} readOnly className="field-input readonly" />
            </div>

            <div className="field-group">
              <label>Mobile No. *</label>
              <input
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                maxLength={10}
                placeholder="10-digit mobile"
                className="field-input"
              />
            </div>

            <div className="field-group">
              <label>District *</label>
              <input value="(from registration)" readOnly className="field-input readonly" />
            </div>

            <div className="field-group">
              <label>Block *</label>
              <select name="blockId" value={formData.blockId} onChange={handleChange} className="field-select">
                <option value="">Select Block</option>
                {blocks.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>

            <div className="field-group">
              <label>Panchayat *</label>
              <select name="panchayatId" value={formData.panchayatId} onChange={handleChange} className="field-select" disabled={!blocks.length || !formData.blockId}>
                <option value="">Select Panchayat</option>
                {panchayats.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>

            <div className="field-group">
              <label>Village *</label>
              <select name="villageId" value={formData.villageId} onChange={handleChange} className="field-select" disabled={!formData.panchayatId}>
                <option value="">Select Village</option>
                {villages.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
              </select>
            </div>

            <div className="field-group">
              <label>Farmer Name *</label>
              <input value={farmerName || ""} readOnly className="field-input readonly" />
            </div>

            <div className="field-group">
              <label>Father / Husband Name *</label>
              <input name="fatherHusbandName" value={formData.fatherHusbandName} onChange={handleChange} className="field-input" />
            </div>

            <div className="field-group">
              <label>Category *</label>
              <select name="category" value={formData.category} onChange={handleChange} className="field-select">
                <option value="">Select Category</option>
                {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>

            <div className="field-group">
              <label>Bank *</label>
              <select name="bankId" value={formData.bankId} onChange={handleChange} className="field-select">
                <option value="">Select Bank</option>
                {banks.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>

            <div className="field-group">
              <label>Branch *</label>
              <select name="branchId" value={formData.branchId} onChange={handleChange} className="field-select" disabled={!formData.bankId}>
                <option value="">Select Branch</option>
                {branches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>

            <div className="field-group">
              <label>IFSC *</label>
              <input value={formData.ifscCode} readOnly className="field-input readonly" />
            </div>

            <div className="field-group">
              <label>Account No. *</label>
              <input name="accountNo" value={formData.accountNo} onChange={handleChange} className="field-input" />
            </div>

            <div className="field-group">
              <label>Patwari Halka No. *</label>
              <input name="patwariHalkaNo" value={formData.patwariHalkaNo} onChange={handleChange} className="field-input" />
            </div>

            <div className="field-group">
              <label>Aadhaar (JPEG/PDF, ≤512KB) *</label>
              <input type="file" name="aadhaarFile" onChange={handleFileChange} accept=".jpg,.jpeg,.pdf" className="field-file" />
            </div>

            <div className="field-group">
              <label>Bank Passbook (JPEG/PDF, ≤512KB) *</label>
              <input type="file" name="bankPassbookFile" onChange={handleFileChange} accept=".jpg,.jpeg,.pdf" className="field-file" />
            </div>
          </div>

          <p className="file-note">
            1) Upload documents in JPEG/JPG or PDF format only<br />
            2) Document size must be under 512 KB
          </p>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
