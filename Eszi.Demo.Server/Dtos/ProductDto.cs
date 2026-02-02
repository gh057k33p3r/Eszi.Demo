namespace Eszi.Demo.Server.Dtos
{
    public class ProductDto
    {
        public long Id { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
        public double Price { get; set; }
    }
}
