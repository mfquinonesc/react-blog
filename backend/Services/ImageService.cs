using backend.Data;
using backend.Models;
using backend.Utilities;

namespace backend.Services
{
    public class ImageService : Service
    {
        public ImageService(BlogReactDbContext context) : base(context) {}

        public dynamic Create(Image image)
        {
            if (image.PostId > 0 && image.UserId > 0)
                return new { status = false, message = "Only one parameter is allowed: either PostId or UserId", image };

            if (image.UserId > 0 && !_context.Users.Any(p => p.UserId == image.UserId))
                return new { status = false, message = "User does not exist", image };

            if (image.PostId > 0 && !_context.Posts.Any(p => p.PostId == image.PostId))
                return new { status = false, message = "Post does not exist", image };

            // There has to be only one image by post or user 
            var imgs= _context.Images.Where(i => i.PostId == image.PostId || i.UserId == image.UserId).ToList();            
            
            _context.Images.RemoveRange(imgs);

            _context.Images.Add(image);
            _context.SaveChanges();

            return new { status = true, message = "Ok", image };
        }

        public dynamic GetById(int id)
        {
            var image = _context.Images.Where(i=> i.ImageId == id).FirstOrDefault();

            if(image != null && image.Url != null)
            {
                return new { status = true, message = "Ok", image };
            }

            return new { status = false, message = "The file is missed" , image };
        }

        public void SaveImage(IFormFile file, int postId, int userId = 0)
        {               
            if (file == null || file.Length == 0 || !FileHandler.AllowedFileTypes.Contains(file.ContentType))
                return;

            if (!((postId > 0 && userId == 0) || (postId == 0 && userId > 0)))
                return;

            if (!_context.Users.Any(p => p.UserId == userId) && !_context.Posts.Any(p => p.PostId == postId))
                return;
        
            string url = FileHandler.Save(file);

            Image image = new()
            {
                Url = url,
                PostId = postId,
                UserId = userId
            };

            this.Create(image);
        }

    }

}