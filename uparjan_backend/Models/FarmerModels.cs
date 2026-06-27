namespace uparjan_backend.Models;

// ── Requests ──────────────────────────────────────────────────
public record RegisterFarmerRequest(
    string DistrictId,
    string MspId,
    string Aadhar,
    string FarmerName,
    string Password
);

public class FarmerDetailsRequest
{
    public string MobileNo { get; set; } = "";
    public string BlockId { get; set; } = "";
    public string PanchayatId { get; set; } = "";
    public string VillageId { get; set; } = "";
    public string FatherHusbandName { get; set; } = "";
    public string Category { get; set; } = "";
    public string BankId { get; set; } = "";
    public string BranchId { get; set; } = "";
    public string IfscCode { get; set; } = "";
    public string AccountNo { get; set; } = "";
    public string PatwariHalkaNo { get; set; } = "";
    public IFormFile? AadhaarFile { get; set; }
    public IFormFile? BankPassbookFile { get; set; }
}

public class FarmerLandDetailsRequest
{
    // JSON payload field (stringified from React FormData)
    public string Payload { get; set; } = "";
    public IFormFile? LandDocument { get; set; }
}

// ── Responses ─────────────────────────────────────────────────
public record RegisterFarmerResponse(string FarmerId, string Message);
public record ApiResponse<T>(bool Success, string Message, T? Data);

// ── In-memory store ───────────────────────────────────────────
public class FarmerRecord
{
    public string FarmerId { get; set; } = "";
    public string DistrictId { get; set; } = "";
    public string MspId { get; set; } = "";
    public string Aadhar { get; set; } = "";
    public string FarmerName { get; set; } = "";
    public string PasswordHash { get; set; } = "";
    public string Status { get; set; } = "REGISTERED"; // REGISTERED | DETAILS_SUBMITTED | LAND_SUBMITTED
    public FarmerDetails? Details { get; set; }
}

public class FarmerDetails
{
    public string MobileNo { get; set; } = "";
    public string BlockId { get; set; } = "";
    public string PanchayatId { get; set; } = "";
    public string VillageId { get; set; } = "";
    public string FatherHusbandName { get; set; } = "";
    public string Category { get; set; } = "";
    public string BankId { get; set; } = "";
    public string BranchId { get; set; } = "";
    public string IfscCode { get; set; } = "";
    public string AccountNo { get; set; } = "";
    public string PatwariHalkaNo { get; set; } = "";
    public string? AadhaarFilePath { get; set; }
    public string? BankPassbookFilePath { get; set; }
}