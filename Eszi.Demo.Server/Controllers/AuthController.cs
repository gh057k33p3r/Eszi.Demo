using Eszi.Demo.Server.Dtos.Auth;
using Eszi.Demo.Server.Dtos.Options;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Eszi.Demo.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IOptions<JwtOptions> options;

        public AuthController(IOptions<JwtOptions> options)
        {
            this.options = options;
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public ActionResult Login(LoginRequest request)
        {
            // Fake adatbázis
            if(request.Email != "admin" || request.Password != "password")
            {
                return Unauthorized();
            }

            var accessToken = GenerateJwtToken(request.Email);

            return Ok(accessToken);
        }

        private string GenerateJwtToken(string email)
        {
            var jwt = options.Value;

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, email), // Ez kerül majd a HttpContext.User.Identity.Name -be
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.Role, "User"),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwt.Issuer,
                audience: jwt.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(jwt.ExpiresInMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
