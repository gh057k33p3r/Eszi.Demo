using Eszi.Demo.Database.Models;
using Eszi.Demo.Server.Dtos;
using Mapster;

namespace Eszi.Demo.Server
{
    public static class MapsterConfigurator
    {
        public static void Configure()
        {
            TypeAdapterConfig<ProductDto, Product>
                .NewConfig()
                .Map(d => d.Id, s => s.Id)
                .Map(d => d.Name, s => s.Name)
                .Map(d => d.Description, s => s.Description)
                .Map(d => d.Price, s => s.Price);

            TypeAdapterConfig<Product, ProductDto>
                .NewConfig()
                //.Ignore(d => d.Price)
                .Map(d => d.Id, s => s.Id)
                .Map(d => d.Name, s => s.Name)
                .Map(d => d.Description, s => s.Description)
                .Map(d => d.Price, s => s.Price);
        }
    }
}
