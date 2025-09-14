using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;


namespace Backend.Controllers
{
    [ApiController]
    [Route("api/rol")]
    [Authorize]
    public class RolController : ControllerBase
    {
        private readonly RolService _service;

        public RolController(RolService service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("{id}")]
        public dynamic GeTById(int id)
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