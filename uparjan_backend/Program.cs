var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddPolicy("DevPolicy", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000", "http://localhost:5259")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.Configure<Microsoft.AspNetCore.Http.Features.FormOptions>(opts =>
{
    opts.MultipartBodyLengthLimit = 10 * 1024 * 1024;
});
builder.Services.AddControllers()
    .AddJsonOptions(opts =>
        opts.JsonSerializerOptions.PropertyNamingPolicy =
            System.Text.Json.JsonNamingPolicy.CamelCase);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("DevPolicy");
app.UseAuthorization();
app.MapControllers();

app.Run();