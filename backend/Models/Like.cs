using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class Like
    {
        public int LikeId { get; set; }
        public int PostId { get; set; }
        public int UserId { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
