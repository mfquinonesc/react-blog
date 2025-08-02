using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Backend.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers
{

    [ApiController]
    [Route("api/auth")]
    [AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private readonly UserService _service;
        public AuthController(UserService service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("signup")]
        public dynamic Create(UserDto dto)
        {
            return _service.Create(dto);
        }

        [HttpPost]
        [Route("login")]
        public dynamic Login(LoginDto login)
        {
            return _service.Login(login);
        }

        [HttpPost]
        [Route("demo")]
        public dynamic Demo()
        {
            return _service.Demo();
        }

        [Authorize]
        [HttpGet("verify")]
        public dynamic Verify()
        {
            if (User.Identity != null && User.Identity.IsAuthenticated)
            {
                var username = User.Identity.Name;
                return new { loggedIn = true, username };
            }

            return new { loggedIn = false };
        }       
    }
}