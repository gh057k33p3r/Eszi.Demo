namespace Eszi.Demo.Database.Models
{
    public class User
    {
        public long Id { get; set; }
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public ICollection<UserRole> UserRoles { get; set; } = [];
    }
}
