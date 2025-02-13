using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class Image
    {
        public int ImageId { get; set; }
        public string Url { get; set; } = null!;
        public int PostId { get; set; }
        public int UserId { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
