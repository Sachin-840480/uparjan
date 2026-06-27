namespace uparjan_backend.Data;

public static class MockData
{
    public static readonly List<MasterItem> Districts =
    [
        new("1", "Ranchi"),
        new("2", "Dhanbad"),
        new("3", "Bokaro"),
    ];

    public static readonly List<MasterItem> MspList =
    [
        new("1", "NAMKUM"),
        new("2", "KANKE"),
        new("3", "HATIA"),
    ];

    public static readonly List<MasterItem> Banks =
    [
        new("1", "STATE BANK OF INDIA"),
        new("2", "BANK OF BARODA"),
        new("3", "PUNJAB NATIONAL BANK"),
    ];

    public static readonly List<BranchItem> Branches =
    [
        new("1", "1", "LALPUR",   "SBIN0012623"),
        new("2", "1", "RANCHI",   "SBIN0000001"),
        new("3", "2", "BOKARO",   "BARB0BOKARX"),
        new("4", "3", "DHANBAD",  "PUNB0001200"),
    ];

    public static readonly List<MasterItem> Crops =
    [
        new("1", "धान साधा"),
        new("2", "धान महीन"),
        new("3", "गेहूँ"),
    ];

    // Cascading
    public static readonly List<CascadeItem> Blocks =
    [
        new("1", "1", "NAMKUM"),
        new("2", "1", "KANKE"),
        new("3", "2", "JHARIA"),
        new("4", "3", "CHAS"),
    ];

    public static readonly List<CascadeItem> Panchayats =
    [
        new("1", "1", "AARA"),
        new("2", "1", "BERO"),
        new("3", "2", "HEHAL"),
        new("4", "3", "SIJHUA"),
    ];

    public static readonly List<CascadeItem> Villages =
    [
        new("1", "1", "Ara (CT)"),
        new("2", "1", "Nagri"),
        new("3", "2", "Hehal Toli"),
        new("4", "3", "Sijhua East"),
    ];

    public static readonly List<CascadeItem> SubDistricts =
    [
        new("1", "1", "SILLI"),
        new("2", "1", "TAMAR"),
        new("3", "2", "NIRSA"),
    ];

    public static readonly List<CascadeItem> Circles =
    [
        new("1", "1", "सिल्ली"),
        new("2", "1", "रातु"),
        new("3", "2", "तमाड़"),
    ];

    public static readonly List<CascadeItem> Halkas =
    [
        new("1", "1", "हल्का-01"),
        new("2", "1", "हल्का-02"),
        new("3", "2", "हल्का-01"),
    ];

    public static readonly List<CascadeItem> Maujas =
    [
        new("1", "1", "रातु"),
        new("2", "2", "मकुन्दा"),
        new("3", "3", "लटमा"),
    ];

    public static readonly List<MasterItem> Officers =
    [
        new("1", "Shri Rajesh Kumar (DSO Ranchi)"),
        new("2", "Shri Amit Singh (DSO Dhanbad)"),
    ];
}

public record MasterItem(string Id, string Name);
public record CascadeItem(string Id, string ParentId, string Name);
public record BranchItem(string Id, string BankId, string Name, string IfscCode);
