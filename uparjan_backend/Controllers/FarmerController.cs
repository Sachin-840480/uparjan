using System.Collections.Concurrent;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using uparjan_backend.Models;

namespace uparjan_backend.Controllers;

[ApiController]
[Route("api/farmer")]
public class FarmerController : ControllerBase
{
    private static readonly ConcurrentDictionary<string, FarmerRecord> _store = new();

    private readonly IWebHostEnvironment _env;

    public FarmerController(IWebHostEnvironment env) => _env = env;

    [HttpPost("/api/farmer-register")]
    public IActionResult Register([FromBody] RegisterFarmerRequest req)
    {
        if (!System.Text.RegularExpressions.Regex.IsMatch(req.Aadhar, @"^\d{12}$"))
            return BadRequest(Fail("Aadhaar must be 12 digits"));

        if (req.Password.Length < 8)
            return BadRequest(Fail("Password min 8 characters"));

        if (string.IsNullOrWhiteSpace(req.FarmerName))
            return BadRequest(Fail("Farmer name required"));

        if (_store.Values.Any(f => f.Aadhar == req.Aadhar))
            return Conflict(Fail("Aadhaar already registered"));

        var farmerId = GenerateFarmerId();

        var record = new FarmerRecord
        {
            FarmerId = farmerId,
            DistrictId = req.DistrictId,
            MspId = req.MspId,
            Aadhar = req.Aadhar,
            FarmerName = req.FarmerName,
            PasswordHash = BCryptHash(req.Password),
            Status = "REGISTERED",
        };

        _store[farmerId] = record;

        return Ok(new ApiResponse<RegisterFarmerResponse>(
            true,
            "Registration successful",
            new RegisterFarmerResponse(farmerId, "Registration approved by DSO")
        ));
    }

    [HttpPost("{farmerId}/details")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> SubmitDetails(
        string farmerId,
        [FromForm] FarmerDetailsRequest req)
    {
        if (!_store.TryGetValue(farmerId, out var farmer))
            return NotFound(Fail("Farmer not found"));

        if (farmer.Status != "REGISTERED")
            return BadRequest(Fail("Details already submitted"));

        var aadhaarPath = await SaveFile(req.AadhaarFile, farmerId, "aadhaar");
        if (aadhaarPath is null)
            return BadRequest(Fail("Aadhaar file invalid or missing"));

        var passbookPath = await SaveFile(req.BankPassbookFile, farmerId, "passbook");
        if (passbookPath is null)
            return BadRequest(Fail("Bank passbook file invalid or missing"));

        farmer.Details = new FarmerDetails
        {
            MobileNo = req.MobileNo,
            BlockId = req.BlockId,
            PanchayatId = req.PanchayatId,
            VillageId = req.VillageId,
            FatherHusbandName = req.FatherHusbandName,
            Category = req.Category,
            BankId = req.BankId,
            BranchId = req.BranchId,
            IfscCode = req.IfscCode,
            AccountNo = req.AccountNo,
            PatwariHalkaNo = req.PatwariHalkaNo,
            AadhaarFilePath = aadhaarPath,
            BankPassbookFilePath = passbookPath,
        };

        farmer.Status = "DETAILS_SUBMITTED";

        return Ok(new ApiResponse<object>(true, "Details saved successfully", null));
    }

    [HttpPut("{farmerId}/land-details")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> SubmitLandDetails(
        string farmerId,
        [FromForm] FarmerLandDetailsRequest req)
    {
        if (!_store.TryGetValue(farmerId, out var farmer))
            return NotFound(Fail("Farmer not found"));

        if (farmer.Status == "REGISTERED")
            return BadRequest(Fail("Submit basic details first"));

        LandPayload? payload;
        try
        {
            payload = JsonSerializer.Deserialize<LandPayload>(
                req.Payload,
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                    NumberHandling = System.Text.Json.Serialization.JsonNumberHandling.AllowReadingFromString
                }
            );
        }
        catch
        {
            return BadRequest(Fail("Invalid land payload"));
        }

        if (payload is null || payload.LandRecords.Count == 0)
            return BadRequest(Fail("At least one land record required"));

        foreach (var record in payload.LandRecords)
        {
            var totalAcre = record.RakbaIrrigated + record.RakbaUnirrigated;
            var maxQtl = totalAcre * 16;
            var totalQtl = record.ProcurementIrrigated + record.ProcurementUnirrigated;

            if (totalQtl > maxQtl)
                return BadRequest(Fail(
                    $"Land record exceeds 16 qtl/acre limit (max {maxQtl} qtl for {totalAcre} acres)"
                ));
        }

        if (req.LandDocument is not null)
            await SaveFile(req.LandDocument, farmerId, "land-doc");

        farmer.Status = "LAND_SUBMITTED";

        return Ok(new ApiResponse<object>(true, "Land details submitted successfully", null));
    }

    [HttpGet("{farmerId}")]
    public IActionResult GetFarmer(string farmerId)
    {
        if (!_store.TryGetValue(farmerId, out var farmer))
            return NotFound(Fail("Farmer not found"));

        return Ok(new ApiResponse<FarmerRecord>(true, "OK", farmer));
    }

    private static string GenerateFarmerId()
    {
        var today = DateTime.Now;
        var seq = Random.Shared.Next(100, 999);
        return $"{today:yyyyMMdd}{seq:000}";
    }

    private static string BCryptHash(string password)
    {
        var bytes = System.Security.Cryptography.SHA256.HashData(
            System.Text.Encoding.UTF8.GetBytes(password)
        );
        return Convert.ToHexString(bytes);
    }

    private static readonly string[] AllowedMimeTypes =
        ["image/jpeg", "image/jpg", "application/pdf"];

    private const long MaxFileSizeBytes = 512 * 1024;

    private async Task<string?> SaveFile(IFormFile? file, string farmerId, string tag)
    {
        if (file is null) return null;
        if (!AllowedMimeTypes.Contains(file.ContentType)) return null;
        if (file.Length > MaxFileSizeBytes) return null;

        var uploadsDir = Path.Combine(_env.ContentRootPath, "Uploads", farmerId);
        Directory.CreateDirectory(uploadsDir);

        var ext = Path.GetExtension(file.FileName);
        var fileName = $"{tag}_{DateTime.UtcNow:yyyyMMddHHmmss}{ext}";
        var fullPath = Path.Combine(uploadsDir, fileName);

        await using var stream = System.IO.File.Create(fullPath);
        await file.CopyToAsync(stream);

        return fullPath;
    }

    private static object Fail(string message) =>
        new ApiResponse<object>(false, message, null);
}

public class LandPayload
{
    public string LandType { get; set; } = "";
    public string SubDistrictId { get; set; } = "";
    public string VerifyingOfficerId { get; set; } = "";
    public List<LandRecord> LandRecords { get; set; } = [];
}

public class LandRecord
{
    public string CircleId { get; set; } = "";
    public string HalkaId { get; set; } = "";
    public string MaujaId { get; set; } = "";
    public string CropId { get; set; } = "";
    public string VolumeNoInRegII { get; set; } = "";
    public string PageNoInRegII { get; set; } = "";
    public string PlotNo { get; set; } = "";
    public string KhasraNo { get; set; } = "";
    public decimal RakbaIrrigated { get; set; }
    public decimal RakbaUnirrigated { get; set; }
    public decimal ProcurementIrrigated { get; set; }
    public decimal ProcurementUnirrigated { get; set; }
}
