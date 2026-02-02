using Eszi.Demo.Database;
using Eszi.Demo.Database.Models;
using Eszi.Demo.Server.Dtos;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Eszi.Demo.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController(CoreDbContext coreDbContext, IMapper mapper) : ControllerBase
    {
        // Általában közvetlenül adatbázis entitást nem küldünk frontendre, ha marad idő megnézzük a mappelést
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetAll()
        {
            var products = await coreDbContext.Products.ToListAsync(); //veszélyes, memóriába betol mindent, az lenne a szép, ha egy filtert kapnánk paraméterben, a lehető legtovább IQueryable-ben kell tartani

            var mapped = mapper.Map<List<ProductDto>>(products);

            return Ok(mapped);
        }

        [Authorize]
        [HttpGet("{id:long}")]
        public async Task<ActionResult<ProductDto>> GetById(long id)
        {
            var product = await coreDbContext.Products
                .SingleOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            var mapped = mapper.Map<ProductDto>(product);

            return Ok(mapped);
        }

        [HttpPost]
        [Authorize(Roles = BuiltInRoles.Admin)]
        public async Task<ActionResult> Post(ProductDto product) // Létrehozás
        {
            var mapped = mapper.Map<Product>(product);

            await coreDbContext.Products.AddAsync(mapped); // Ilyet soha
            await coreDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }

        [HttpPut]
        [Authorize(Roles = BuiltInRoles.Admin)]
        public async Task<ActionResult> Put(ProductDto product) // Frissítés
        {

            var existingProduct = await coreDbContext.Products.SingleOrDefaultAsync(p => p.Id == product.Id); // Ezt trackeli a dbContext

            if (existingProduct == null) 
            { 
                return NotFound();
            }

            var mapped = mapper.Map<Product>(product);

            coreDbContext
                .Entry(existingProduct)
                .CurrentValues
                .SetValues(mapped);

            await coreDbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id:long}")]
        [Authorize(Roles = BuiltInRoles.Admin)]
        public async Task<ActionResult> Delete(long id)
        {
            var product = await coreDbContext.Products.SingleOrDefaultAsync(p => p.Id == id);

            if (product == null) 
            {
                return NotFound();
            }

            coreDbContext.Products.Remove(product);
            await coreDbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
