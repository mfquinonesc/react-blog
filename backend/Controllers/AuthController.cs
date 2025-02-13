using backend.Services;
using Microsoft.AspNetCore.Mvc;
using backend.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{

    [ApiController]
    [Route("api/auth")]
    [AllowAnonymous]
    public class AuthController:ControllerBase
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
        public dynamic Login (LoginDto login)
        {
            return _service.Login(login);
        }

    }
}