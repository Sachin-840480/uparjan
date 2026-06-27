using Microsoft.AspNetCore.Mvc;
using uparjan_backend.Data;

namespace uparjan_backend.Controllers;

[ApiController]
[Route("api/master")]
public class MasterController : ControllerBase
{
    [HttpGet("districts")]
    public IActionResult GetDistricts() =>
        Ok(MockData.Districts.Select(d => new { d.Id, d.Name }));

    [HttpGet("msps")]
    public IActionResult GetMsps() =>
        Ok(MockData.MspList.Select(m => new { m.Id, m.Name }));

    [HttpGet("blocks")]
    public IActionResult GetBlocks([FromQuery] string districtId)
    {
        if (string.IsNullOrWhiteSpace(districtId))
            return BadRequest("districtId required");

        var result = MockData.Blocks
            .Where(b => b.ParentId == districtId)
            .Select(b => new { b.Id, b.Name });

        return Ok(result);
    }

    [HttpGet("panchayats")]
    public IActionResult GetPanchayats([FromQuery] string blockId)
    {
        if (string.IsNullOrWhiteSpace(blockId))
            return BadRequest("blockId required");

        var result = MockData.Panchayats
            .Where(p => p.ParentId == blockId)
            .Select(p => new { p.Id, p.Name });

        return Ok(result);
    }

    [HttpGet("villages")]
    public IActionResult GetVillages([FromQuery] string panchayatId)
    {
        if (string.IsNullOrWhiteSpace(panchayatId))
            return BadRequest("panchayatId required");

        var result = MockData.Villages
            .Where(v => v.ParentId == panchayatId)
            .Select(v => new { v.Id, v.Name });

        return Ok(result);
    }

    [HttpGet("banks")]
    public IActionResult GetBanks() =>
        Ok(MockData.Banks.Select(b => new { b.Id, b.Name }));

    [HttpGet("branches")]
    public IActionResult GetBranches([FromQuery] string bankId)
    {
        if (string.IsNullOrWhiteSpace(bankId))
            return BadRequest("bankId required");

        var result = MockData.Branches
            .Where(b => b.BankId == bankId)
            .Select(b => new { b.Id, b.Name, b.IfscCode });

        return Ok(result);
    }

    [HttpGet("sub-districts")]
    public IActionResult GetSubDistricts([FromQuery] string districtId)
    {
        if (string.IsNullOrWhiteSpace(districtId))
            return BadRequest("districtId required");

        var result = MockData.SubDistricts
            .Where(s => s.ParentId == districtId)
            .Select(s => new { s.Id, s.Name });

        return Ok(result);
    }

    [HttpGet("circles")]
    public IActionResult GetCircles([FromQuery] string subDistrictId)
    {
        if (string.IsNullOrWhiteSpace(subDistrictId))
            return BadRequest("subDistrictId required");

        var result = MockData.Circles
            .Where(c => c.ParentId == subDistrictId)
            .Select(c => new { c.Id, c.Name });

        return Ok(result);
    }

    [HttpGet("halkas")]
    public IActionResult GetHalkas([FromQuery] string circleId)
    {
        if (string.IsNullOrWhiteSpace(circleId))
            return BadRequest("circleId required");

        var result = MockData.Halkas
            .Where(h => h.ParentId == circleId)
            .Select(h => new { h.Id, h.Name });

        return Ok(result);
    }

    [HttpGet("maujas")]
    public IActionResult GetMaujas([FromQuery] string halkaId)
    {
        if (string.IsNullOrWhiteSpace(halkaId))
            return BadRequest("halkaId required");

        var result = MockData.Maujas
            .Where(m => m.ParentId == halkaId)
            .Select(m => new { m.Id, m.Name });

        return Ok(result);
    }

    [HttpGet("crops")]
    public IActionResult GetCrops() =>
        Ok(MockData.Crops.Select(c => new { c.Id, c.Name }));

    [HttpGet("officers")]
    public IActionResult GetOfficers([FromQuery] string districtId) =>
        Ok(MockData.Officers.Select(o => new { o.Id, o.Name }));
}
