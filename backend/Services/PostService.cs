using Backend.Data;
using Backend.Models;
using Backend.Dtos;
using Backend.Utilities;

namespace Backend.Services
{
    public class PostService : Service, IService<PostDto>
    {
        private readonly ImageService _imageService;
        public PostService(BlogReactDbContext context, ImageService imageService) : base(context)
        {
            _imageService = imageService;
        }

        public dynamic Create(PostDto dto)
        {
            if (!_context.Users.Any(u => u.UserId == dto.UserId))
                return new { status = false, message = $"The user with id {dto.UserId} does not exist", post = dto };

            if (string.IsNullOrEmpty(dto.Content.Trim()) || string.IsNullOrEmpty(dto.Title.Trim()))
                return new { status = false, message = $"The content and the title are required", post = dto };

            Post post = MapperHelper.Map<PostDto, Post>(dto);

            _context.Posts.Add(post);
            _context.SaveChanges();

            if (dto.CategoryIds != null)
                this.SaveCategories(dto.CategoryIds, post.PostId);

            if (dto.ImageFile != null)
                _imageService.SaveImage(dto.ImageFile, post.PostId);

            return new { status = true, message = "Ok", post };
        }

        public dynamic Delete(int postId)
        {
            var post = _context.Posts.Where(p => p.PostId == postId).FirstOrDefault();

            bool status = post != null;
            string message = status ? "Ok" : "Something went wrong";

            if (post != null)
            {
                var likes = _context.Likes.Where(l => l.PostId == postId).ToList();
                _context.Likes.RemoveRange(likes);
                _context.SaveChanges();

                var images = _context.Images.Where(i => i.PostId == postId).ToList();
                _context.Images.RemoveRange(images);
                _context.SaveChanges();

                var pCategories = _context.PostCategories.Where(pc => pc.PostId == postId).ToList();
                _context.PostCategories.RemoveRange(pCategories);
                _context.SaveChanges();

                var comments = _context.Comments.Where(c => c.PostId == postId).ToList();
                _context.Comments.RemoveRange(comments);
                _context.SaveChanges();

                _context.Posts.Remove(post);
                _context.SaveChanges();
            }

            return new { status, message };
        }       

        public dynamic GetById(int id)
        {
            List<Post> post = _context.Posts.Where(p => p.PostId == id).ToList();
            var dto = this.GetDetailedPosts(post);

            return new { post = dto };
        }

        public dynamic GetByUserId(int userId)
        {
            List<Post> posts = _context.Posts.Where(p => p.UserId == userId).OrderBy(p => p.CreatedAt).ToList();
            var dtos = this.GetDetailedPosts(posts, userId);

            return new { posts = dtos };
        }

        public dynamic GetAll()
        {
            List<Post> posts = _context.Posts.OrderBy(p => p.CreatedAt).ToList();
            var dtos = this.GetDetailedPosts(posts);

            return new { posts = dtos };
        }

        public dynamic Update(int id, PostDto dto)
        {
            var post = _context.Posts.Where(p => p.PostId == id && p.UserId == dto.UserId).FirstOrDefault();

            if (post == null)
                return new { status = false, message = $"The post with id {id} does not exist", post = dto };

            post.Content = string.IsNullOrEmpty(dto.Content.Trim()) ? post.Content : dto.Content;
            post.Title = string.IsNullOrEmpty(dto.Title.Trim()) ? post.Title : dto.Title;
            post.UpdatedAt = DateTime.Now;

            _context.Posts.Update(post);
            _context.SaveChanges();

            if (dto.CategoryIds != null)
                this.SaveCategories(dto.CategoryIds, post.PostId);

            if (dto.ImageFile != null)
                _imageService.SaveImage(dto.ImageFile, post.PostId);

            return new { status = true, message = "Ok", post };
        }

        private void SaveCategories(List<int> categoryIds, int postId)
        {
            List<PostCategory> postCategories = _context.PostCategories.Where(pc => pc.PostId == postId).ToList();

            // Remove everything when the list is empty
            if (categoryIds.Count == 0)
            {
                postCategories.ForEach(pc => { _context.PostCategories.Remove(pc); });
                _context.SaveChanges();
                postCategories.Clear();
            }

            // Remove the categories that are not longer chosen            
            postCategories.ForEach(pc =>
            {
                if (!categoryIds.Any(id => id == pc.CategoryId))
                    _context.PostCategories.Remove(pc);
            });

            // Add the new categories 
            categoryIds.ForEach(id =>
            {
                if (_context.Categories.Any(c => c.CategoryId == id) && !_context.PostCategories.Any(pc => pc.CategoryId == id))
                {
                    PostCategory pc = new()
                    {
                        PostId = postId,
                        CategoryId = id
                    };

                    _context.PostCategories.Add(pc);
                }
            });

            _context.SaveChanges();
        }

        private dynamic GetDetailedPosts(List<Post> posts, int userId = 0)
        {
            List<int> postIds = posts.Select(p => p.PostId).ToList();

            var images = _context.Images.Where(i => postIds.Contains(i.PostId)).ToList();
            var likes = _context.Likes.Where(l => postIds.Contains(l.PostId)).ToList();
            var postCategories = _context.PostCategories.Where(pc => postIds.Contains(pc.PostId)).ToList();
            var comments = _context.Comments.Where(c => postIds.Contains(c.PostId)).ToList();
            var categories = _context.Categories.Where(c => postCategories.Select(pc => pc.CategoryId).Contains(c.CategoryId)).ToList();
            var authors = _context.Users.Select(u => new { u.Name, u.Lastname, u.RolId, u.UserId }).ToList();

            List<dynamic> detailedPosts = new();

            posts.ForEach(post =>
            { 
                var postCategoryIds = postCategories.Where(pc => pc.PostId == post.PostId).Select(pc => pc.CategoryId).ToList();

                var categoriesList = categories.Where(c => postCategoryIds.Contains(c.CategoryId)).Select(c => new { c.Name, c.CategoryId }).ToList();

                var postLikes = likes.Where(l => l.PostId == post.PostId).ToList();

                var like = postLikes.Where(l => l.UserId == userId).FirstOrDefault() != null;

                var postComments = comments.Where(c => c.PostId == post.PostId).ToList();

                List<dynamic> authoredComments = new();

                postComments.ForEach(pc=>
                {
                    var commentAuthor = authors.Where(a => a.UserId == pc.UserId).FirstOrDefault();
                    authoredComments.Add(new { comment = pc, author = commentAuthor });
                });

                PostDto dto = MapperHelper.Map<Post, PostDto>(post);

                dto.CategoryIds = postCategoryIds;

                var author = authors.Where(a => a.UserId == post.UserId).FirstOrDefault();

                var data = new { post = dto, images, categoriesList, likes = postLikes.Count, like, comments = authoredComments, author };

                detailedPosts.Add(data);
            });

            return detailedPosts;
        }

    }
}