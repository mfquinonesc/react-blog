using backend.Services;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/category")]
    [Authorize]
    public class CategoryController : ControllerBase
    {
        private readonly CategoryService _service;
        public CategoryController(CategoryService service)
        {
            _service = service;
        }

        [HttpPost]
        public dynamic Create(Category c)
        {
            return _service.Create(c);
        }

        [HttpDelete]
        [Route("{id}")]
        public dynamic Delete(int id)
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

        [HttpPut]
        [Route("{id}")]
        public dynamic Update(int id, Category c)
        {
            return _service.Update(id, c);
        }
    }
}