using EvaluationAPI.Models;
using EvaluationAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EvaluationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InternsController : ControllerBase
    {
        private InternCollectionService _internCollectionService;
        public InternsController(ICollectionService<Intern> collectionService)
        {
            _internCollectionService = collectionService as InternCollectionService;
        }

        [HttpGet]
        public async Task<IActionResult> GetInterns()
        {
            var interns =  await _internCollectionService.GetAll();
            return Ok(interns);
        }

        [HttpPost]
        public async Task<IActionResult> CreateIntern([FromBody] Intern intern)
        {
            await _internCollectionService.Create(intern);
            return Ok(await _internCollectionService.GetAll());
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateIntern(Guid id, [FromBody] Intern intern)
        {
            if (await _internCollectionService.Update(id, intern))
            {
                return Ok("Update successful!");
            }
            return NotFound();

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIntern(Guid id)
        {
            if (await _internCollectionService.Delete(id))
            {
                return Ok("Delete successful!");
            }
            return NotFound();
        }
    }
}
