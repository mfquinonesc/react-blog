using Backend.Models;
using Backend.Dtos;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/user")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly UserService _service;
        public UserController(UserService service)
        {
            _service = service;
        }

        [HttpPut]
        [Route("{id}")]
        public dynamic Update(int id, UserDto dto)
        {
            return _service.Update(id, dto);
        }

        [HttpDelete]
        [Route("{id}")]
        public dynamic Delete([FromQuery] int id)
        {
            return _service.Delete(id);
        }

        [HttpGet]
        [Route("{id}")]
        public dynamic GetById(int id)
        {
            return _service.GetById(id);
        }

        [HttpGet]
        public dynamic GetAll()
        {
            return _service.GetAll();
        }

    }
}