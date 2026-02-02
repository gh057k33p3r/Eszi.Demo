using Eszi.Demo.Database;
using Eszi.Demo.Database.Models;
using Eszi.Demo.Server.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Eszi.Demo.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly CoreDbContext coreDbContext;

        public ProductController(CoreDbContext coreDbContext)
        {
            this.coreDbContext = coreDbContext;
        }

        // Mapper func
        Func<Product, ProductDto> mapProductToDto = p => new ProductDto
        {
            Id = p.Id,
            Name = p.Name,
            Price = p.Price,
            Description = p.Description,
        };

        // GET product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetAll()
        {
            // Nagyon vigyázni, mert a ToList memóriába tölt mindent. Célszerű szűrni és lapozni
            var products = await coreDbContext.Products.ToListAsync();

            var mapped = products.Select(mapProductToDto);

            return Ok(mapped);
        }

        // GET /product/1
        [HttpGet("{id:long}")]
        public async Task<ActionResult<ProductDto>> GetById(long id)
        {
            var product = await coreDbContext.Products.SingleOrDefaultAsync(p => p.Id == id);

            if (product == null) 
            {
                return NotFound();
            }

            var mapped = mapProductToDto(product);

            return Ok(mapped);
        }

        // Mapper func
        Func<ProductDto, Product> mapProductDtoToProduct = p => new Product
        {
            Id = p.Id,
            Name = p.Name,
            Price = p.Price,
            Description = p.Description,
        };

        [HttpPost] // POST /product
        [Authorize(Roles = BuiltInRoles.Admin)] // Csak adminnak
        public async Task<ActionResult<Product>> Post(ProductDto product)
        {
            var mapped = mapProductDtoToProduct(product);

            await coreDbContext.Products.AddAsync(mapped);
            await coreDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }

        // DELETE /product/1
        [HttpDelete("{id:long}")]
        [Authorize(Roles = BuiltInRoles.Admin)]
        public async Task<ActionResult> Delete(long id)
        {
            var product = await coreDbContext.Products.SingleOrDefaultAsync(p => p.Id == id);

            if(product == null)
            {
                return NotFound();
            }

            coreDbContext.Products.Remove(product);
            await coreDbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id:long}")]
        [Authorize(Roles = BuiltInRoles.Admin)]
        public async Task<ActionResult> Put(long id, ProductDto product) 
        { 
            if(id != product.Id)
            {
                return BadRequest("Id mismatch!");
            }

            var existingProduct = await coreDbContext.Products.SingleOrDefaultAsync(p => p.Id == product.Id);

            if (existingProduct == null) 
            {
                return NotFound();
            }

            existingProduct.Name = product.Name;
            existingProduct.Description = product.Description;
            existingProduct.Price = product.Price;

            await coreDbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
