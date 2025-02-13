using backend.Services;
using backend.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/post")]
    [Authorize]
    public class PostController : ControllerBase
    {
        private readonly PostService _service;
        public PostController(PostService service)
        {
            _service = service;
        }

        [HttpPost]
        public dynamic Create(PostDto dto)
        {
            return _service.Create(dto);
        }

        [HttpPut]
        [Route("{id}")]
        public dynamic Update(int id, PostDto dto)
        {
            return _service.Update(id, dto);
        }


        [HttpGet]
        [Route("{id}")]
        public dynamic GetById(int id)
        {
            return _service.GetById(id);
        }


        [HttpGet]
        [AllowAnonymous]
        public dynamic GetAll()
        {
            return _service.GetAll();
        }

        [HttpGet]
        [Route("user")]
        public dynamic GetByUserId([FromQuery] int userId = 0)
        {
            return _service.GetByUserId(userId);
        }

        [HttpDelete]
        [Route("{id}")]
        public dynamic Delete(int id)
        {
            return _service.Delete(id);
        }
    }
}