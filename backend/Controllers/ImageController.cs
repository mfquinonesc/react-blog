using backend.Models;
using backend.Services;
using backend.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/image")]
    [Authorize]
    public class ImageController:ControllerBase
    {
        private readonly ImageService _service;

        public ImageController(ImageService service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("file")]
        [AllowAnonymous]
        public dynamic GetFile([FromQuery]int id)
        {
            var obj = _service.GetById(id);

            if(obj.status)
            {
                Image image = obj.image;
                FileHandler file = FileHandler.Retrieve(image.Url);
                return File(file.Bytes, file.MimeType);
            }

            return NotFound();                
        }


    }
}