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
        new("1", "1", "LALPUR", "SBIN0012623"),
        new("2", "1", "RANCHI", "SBIN0000001"),
        new("3", "2", "BOKARO", "BARB0BOKARX"),
        new("4", "2", "DHANBAD", "BARB0DHANBX"),
        new("5", "3", "CHAS", "PUNB0001200"),
        new("6", "3", "BERMO", "PUNB0001201"),
    ];

    public static readonly List<MasterItem> Crops =
    [
        new("1", "धान साधा"),
        new("2", "धान महीन"),
        new("3", "गेहूँ"),
        new("4", "मक्का"),
    ];

    public static readonly List<CascadeItem> Blocks =
    [
        // Ranchi
        new("1", "1", "NAMKUM"),
        new("2", "1", "KANKE"),
        new("5", "1", "RATU"),

        // Dhanbad
        new("3", "2", "JHARIA"),
        new("6", "2", "BAGHMARA"),

        // Bokaro
        new("4", "3", "CHAS"),
        new("7", "3", "BERMO"),
    ];

    public static readonly List<CascadeItem> Panchayats =
    [
        new("1", "1", "AARA"),
        new("2", "1", "BERO"),
        new("5", "1", "TATI"),

        new("3", "2", "HEHAL"),
        new("6", "2", "PITHORIA"),
        new("7", "2", "SUKURHUTU"),

        new("4", "3", "SIJHUA"),
        new("8", "3", "LOYABAD"),

        new("9", "4", "CHAS EAST"),
        new("10", "4", "CHAS WEST"),

        new("11", "5", "RATU PANCHAYAT"),
        new("12", "6", "BAGHMARA PANCHAYAT"),

        new("13", "7", "BERMO NORTH"),
        new("14", "7", "BERMO SOUTH"),
    ];

   public static readonly List<CascadeItem> Villages =
    [
        new("1", "1", "Ara (CT)"),
        new("2", "1", "Nagri"),

        new("3", "2", "Bero Village"),
        new("4", "2", "Bero Toli"),

        new("5", "3", "Hehal Toli"),
        new("6", "3", "Hehal Basti"),

        new("7", "4", "Sijhua East"),
        new("8", "4", "Sijhua West"),

        new("9", "5", "Tati Village"),

        new("10", "6", "Pithoria"),

        new("11", "7", "Sukurhutu"),

        new("12", "8", "Loyabad"),

        new("13", "9", "Chas East Village 1"),
        new("14", "9", "Chas East Village 2"),

        new("15", "10", "Chas West Village 1"),
        new("16", "10", "Chas West Village 2"),

        new("17", "11", "Ratu Village"),

        new("18", "12", "Baghmara Village"),

        new("19", "13", "Bermo North Village"),

        new("20", "14", "Bermo South Village"),
    ];

    public static readonly List<CascadeItem> SubDistricts =
    [
        new("1", "1", "SILLI"),
        new("2", "1", "TAMAR"),
        new("4", "1", "RATU"),

        new("3", "2", "NIRSA"),
        new("5", "2", "BALIAPUR"),

        new("6", "3", "CHAS"),
    ];

    public static readonly List<CascadeItem> Circles =
    [
        new("1", "1", "सिल्ली"),
        new("2", "1", "रातु"),

        new("3", "2", "तमाड़"),

        new("4", "3", "निरसा"),

        new("5", "4", "रातु सर्कल"),

        new("6", "5", "बलियापुर"),

        new("7", "6", "चास सर्कल"),
    ];

    public static readonly List<CascadeItem> Halkas =
    [
        new("1", "1", "हल्का-01"),
        new("2", "1", "हल्का-02"),

        new("3", "2", "हल्का-01"),

        new("4", "3", "हल्का-01"),

        new("5", "4", "हल्का-01"),

        new("6", "5", "हल्का-01"),

        new("7", "6", "हल्का-01"),

        new("8", "7", "हल्का-01"),
    ];
    public static readonly List<CascadeItem> Maujas =
    [
        new("1", "1", "रातु"),
        new("2", "1", "मकुन्दा"),

        new("3", "2", "लटमा"),

        new("4", "3", "तमाड़"),

        new("5", "4", "निरसा"),

        new("6", "5", "रातु गाँव"),

        new("7", "6", "बलियापुर"),

        new("8", "7", "चास"),

        new("9", "8", "बोकारो"),
    ];
    public static readonly List<MasterItem> Officers =
    [
        new("1", "Shri Rajesh Kumar (DSO Ranchi)"),
        new("2", "Shri Amit Singh (DSO Dhanbad)"),
        new("3", "Shri Sunil Kumar (DSO Bokaro)"),
    ];
}

public record MasterItem(string Id, string Name);
public record CascadeItem(string Id, string ParentId, string Name);
public record BranchItem(string Id, string BankId, string Name, string IfscCode);