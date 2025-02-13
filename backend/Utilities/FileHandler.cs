using Microsoft.AspNetCore.StaticFiles;

namespace backend.Utilities
{
    public class FileHandler
    {
        public static readonly HashSet<string> AllowedFileTypes = new HashSet<string>
        {
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "image/bmp",
            "image/tiff",
            "image/svg+xml"
        };

        public byte[] Bytes { get; set; }
        public string MimeType { get; set; }
        public static string FolderPath
        {
            get { return Path.Combine(Directory.GetCurrentDirectory(), "Public", "Uploads"); }
        }

        public static string Save(IFormFile file)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("The file is empty or null");

            if (!Directory.Exists(FileHandler.FolderPath))
                Directory.CreateDirectory(FileHandler.FolderPath);

            string ext = Path.GetExtension(file.FileName);
            string fileName = Guid.NewGuid() + ext;

            using (var stream = new FileStream(fileName, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            return fileName;
        }

        public static FileHandler Retrieve(string fileName)
        {
            string path = Path.Combine(FileHandler.FolderPath,fileName);
           
            if(File.Exists(path))
            {
                FileExtensionContentTypeProvider provider = new();

                if(provider.TryGetContentType(fileName,out string mimeType))
                {
                    FileHandler handler = new();
                    handler.Bytes = File.ReadAllBytes(path);
                    handler.MimeType = mimeType;
                    
                    return handler;
                }
            }

            return null; 
        }

    }
}