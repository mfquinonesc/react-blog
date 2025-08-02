using Backend.Services;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Backend.Data;


var builder = WebApplication.CreateBuilder(args);

// Add connection string 
builder.Services.AddSqlServer<BlogReactDbContext>(builder.Configuration.GetConnectionString("BlogReactDb"));

// Json web token Authentication
string key = builder.Configuration["JwtSettings:Secret"];

builder.Services.AddSingleton<JwtService>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters{
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidateAudience = false,
        ValidateIssuer = false,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
    };
});


// Add cors 
builder.Services.AddCors(options => {
    options.AddPolicy("MyAllowSpecificOrigins", policy =>{
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});


// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// Service layer
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<PostService>();
builder.Services.AddScoped<LikeService>();
builder.Services.AddScoped<ImageService>();
builder.Services.AddScoped<CommentService>();
builder.Services.AddScoped<CategoryService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.MapControllers();

app.UseAuthorization();

app.UseCors("MyAllowSpecificOrigins");

app.Run();
