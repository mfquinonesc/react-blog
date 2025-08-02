using Microsoft.AspNetCore.Mvc;
using Backend.Services;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/like")]
    [Authorize]
    public class LikeController:ControllerBase
    {
        private readonly LikeService _service;

        public LikeController(LikeService service)
        {
            _service = service;
        }

        [HttpPost]
        public dynamic Create(Like like)
        {
            return _service.Create(like);
        }

        [HttpDelete]
        [Route("{id}")]
        public dynamic Delete(int id)
        {
            return _service.Delete(id);
        }

    }    
}