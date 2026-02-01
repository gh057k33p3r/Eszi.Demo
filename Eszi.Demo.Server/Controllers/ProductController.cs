using Eszi.Demo.Database;
using Eszi.Demo.Database.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Eszi.Demo.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController(CoreDbContext coreDbContext) : ControllerBase
    {
        // Általában közvetlenül adatbázis entitást nem küldünk frontendre, ha marad idő megnézzük a mappelést
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Product>>> GetAll()
        {
            var products = await coreDbContext.Products.ToListAsync(); //veszélyes, memóriába betol mindent, az lenne a szép, ha egy filtert kapnánk paraméterben, a lehető legtovább IQueryable-ben kell tartani

            return Ok(products);
        }

        [Authorize]
        [HttpGet("{id:long}")]
        public async Task<ActionResult<Product>> GetById(long id)
        {
            var product = await coreDbContext.Products
                .SingleOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpPost]
        [Authorize(Roles = BuiltInRoles.Admin)]
        public async Task<ActionResult<Product>> Post(Product product) // Létrehozás
        {
            await coreDbContext.Products.AddAsync(product); // Ilyet soha
            await coreDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }

        [HttpPut("{id:long}")]
        [Authorize(Roles = BuiltInRoles.Admin)]
        public async Task<ActionResult<IEnumerable<Product>>> Put(long id, Product product) // Frissítés
        {
            if (id != product.Id)
                return BadRequest("Id mismatch");

            var existingProduct = await coreDbContext.Products.SingleOrDefaultAsync(p => p.Id == product.Id); // Ezt trackeli a dbContext

            if (existingProduct == null) 
            { 
                return NotFound();
            }

            coreDbContext
                .Entry(existingProduct)
                .CurrentValues
                .SetValues(product);

            await coreDbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id:long}")]
        [Authorize(Roles = BuiltInRoles.Admin)]
        public async Task<ActionResult<IEnumerable<Product>>> Delete(long id)
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
