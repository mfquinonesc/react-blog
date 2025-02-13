using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class Rol
    {
        public int RolId { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
    }
}
