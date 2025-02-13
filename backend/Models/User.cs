using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class User
    {
        public int UserId { get; set; }
        public string Email { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string Lastname { get; set; } = null!;
        public DateTime Birthday { get; set; }
        public string Password { get; set; } = null!;
        public DateTime? LastAccess { get; set; }
        public int? Attempts { get; set; }
        public int? RolId { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
