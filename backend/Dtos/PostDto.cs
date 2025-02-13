namespace backend.Dtos
{
    public class PostDto
    {
        public int PostId { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; } = null!;
        public string Content { get; set; } = null!;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? CreatedAt { get; set; }
        public IFormFile? ImageFile { get; set; }
        public List<int>? CategoryIds { get; set; } = null;
        
    }

}