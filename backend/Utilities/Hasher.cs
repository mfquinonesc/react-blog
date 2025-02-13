using System;
using System.Security.Cryptography;
using System.Text;

namespace backend.Utilities
{
   public class Hasher
   {
        private const int SaltSize = 16;
        private const int KeySize = 32;
        private const int Iterations = 100000;

        public static string HashPassword (string password)
        {
            var rng = RandomNumberGenerator.Create();
            byte[] salt = new byte[SaltSize];
            rng.GetBytes(salt);

            var pbkdf2 =  new Rfc2898DeriveBytes(password, salt, Iterations, HashAlgorithmName.SHA256);
            byte[] hash = pbkdf2.GetBytes(KeySize);

            byte[] hashBytes =  new byte[SaltSize +KeySize];
            Array.Copy(salt, 0, hashBytes, 0, SaltSize);
            Array.Copy(hash, 0, hashBytes, SaltSize, KeySize);

            return Convert.ToBase64String(hashBytes);
        }

        public static bool VerifyPassword(string password,string storedHash)
        {
            byte[] hashBytes = Convert.FromBase64String(storedHash);

            byte[] salt = new byte[SaltSize];
            Array.Copy(hashBytes, 0, salt, 0, SaltSize);

            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, Iterations, HashAlgorithmName.SHA256);
            byte[] computeHash = pbkdf2.GetBytes(KeySize);

            for(int i = 0; i <KeySize; i++)
            {
                if(hashBytes[i+SaltSize] != computeHash[i])
                    return false;
            }

            return true;
        }
   } 
}