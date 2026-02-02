using Eszi.Demo.Database;
using Eszi.Demo.Database.Models;
using Eszi.Demo.Server.Dtos;
using Eszi.Demo.Server.Dtos.Auth;
using Eszi.Demo.Server.Dtos.Options;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        private readonly CoreDbContext coreDbContext;

        public AuthController(IOptions<JwtOptions> options, CoreDbContext coreDbContext)
        {
            this.options = options;
            this.coreDbContext = coreDbContext;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public ActionResult Register(UserDto userDto)
        {
            var hasher = new PasswordHasher<object>();
            var passwordHash = hasher.HashPassword(null!, userDto.Password);

            // Kézi mappelés (mapper pl.: Automapper, Mapster)
            var user = new User
            {
                Id = 0,
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                Email = userDto.Email,
                PasswordHash = passwordHash,
            };

            coreDbContext.Users.Add(user);
            coreDbContext.SaveChanges();

            return NoContent();
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public ActionResult Login(LoginRequest request)
        {
            var user = coreDbContext
                .Users
                .Include(u => u.UserRoles)
                    .ThenInclude(ur => ur.Role)
                .SingleOrDefault(u => u.Email == request.Email);

            if(user == null)
            {
                return Unauthorized();
            }

            var hasher = new PasswordHasher<object>();

            var result = hasher.VerifyHashedPassword(null!, user.PasswordHash, request.Password);

            if(result == PasswordVerificationResult.Failed)
            {
                return Unauthorized();
            }

            var accessToken = GenerateJwtToken(user);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                Expires = DateTime.UtcNow.AddMinutes(options.Value.ExpiresInMinutes),
                SameSite = SameSiteMode.Lax
            };

            HttpContext.Response.Cookies.Append(Constants.AccessTokenCookieKey, accessToken, cookieOptions);

            return Ok(accessToken);
        }

        [Authorize]
        [HttpGet("cookietoken")]
        public async Task<ActionResult<string>> GetTokenFromCookie()
        {
            Request.Cookies.TryGetValue(Constants.AccessTokenCookieKey, out string? accessToken);

            if(string.IsNullOrEmpty(accessToken))
            {
                return Unauthorized();
            }

            return Ok(accessToken);
        }

        [Authorize]
        [HttpPost("Logout")]
        public ActionResult Logout()
        {
            HttpContext.Response.Cookies.Delete(Constants.AccessTokenCookieKey);

            return Ok();
        }

        private string GenerateJwtToken(User user)
        {
            var jwt = options.Value;

            var claims = new List<Claim>
            {
                new(ClaimTypes.Name, user.Email), // Ez kerül majd a HttpContext.User.Identity.Name -be
                new(ClaimTypes.Email, user.Email),
                new("firstName", user.FirstName),
                new("lastName", user.LastName),
            };

            claims.AddRange(user.UserRoles.Select(ur => new Claim(ClaimTypes.Role, ur.Role.Name)));

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
