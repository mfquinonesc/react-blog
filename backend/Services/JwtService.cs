using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services
{
    public class JwtService
    {
        private readonly IConfiguration _config;
              
        public JwtService(IConfiguration config)
        {
            _config = config;
        }

        public string GenerateToken(string email, int userId)
        {
            var key = Encoding.UTF8.GetBytes(_config["JwtSettings:Secret"]);

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, userId.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, email)
            };

            var token = new JwtSecurityToken(
              claims: claims,
              expires: DateTime.UtcNow.AddHours(2),
              signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}