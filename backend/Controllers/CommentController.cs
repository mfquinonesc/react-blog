using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/comment")]
    [Authorize]
    public class CommentController : ControllerBase
    {
        private readonly CommentService _service;
        public CommentController(CommentService service)
        {
            _service = service;
        }

        [HttpPost]
        public dynamic Create(Comment comment)
        {
            return _service.Create(comment);
        }

        [HttpPut]
        [Route("{id}")]
        public dynamic Update(int id, Comment comment)
        {
            return _service.Update(id, comment);
        }

        [HttpDelete]
        [Route("{id}")]
        public dynamic Delete(int id)
        {
            return _service.Delete(id);
        }

    }
}