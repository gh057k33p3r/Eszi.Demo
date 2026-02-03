
using Eszi.Demo.Database;
using Eszi.Demo.Server.Middlewares;
using Mapster;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;

namespace Eszi.Demo.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services
                .AddAuthenticationServices(builder.Configuration);

            MapsterConfigurator.Configure();
            builder.Services.AddSingleton(TypeAdapterConfig.GlobalSettings);
            builder.Services.AddScoped<IMapper, ServiceMapper>();

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors();

            builder.Services.AddDbContext<CoreDbContext>(options => 
                options.UseSqlite(builder.Configuration.GetConnectionString(nameof(CoreDbContext)))
            );

            var app = builder.Build();

            using var scope = app.Services.CreateScope();
            using var coreDbContext = scope.ServiceProvider.GetRequiredService<CoreDbContext>();
            coreDbContext.Database.Migrate();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors(builder =>
                builder
                    .AllowCredentials()
                    .WithOrigins("http://localhost:3000")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
            );

            app.UseMiddleware<AuthorizationHeaderSetterMiddleware>();
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
