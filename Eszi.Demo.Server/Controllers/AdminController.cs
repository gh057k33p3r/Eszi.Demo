using Eszi.Demo.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Eszi.Demo.Server.Controllers
{
    [Authorize(Roles = BuiltInRoles.Admin)] // Ez mehet method szinten is
    [ApiController]
    [Route("[controller]")]
    public class AdminController : ControllerBase
    {
        [HttpGet]
        public ActionResult<string> Get()
        {
            return Ok("Hello from Admin");
        }
    }
}
