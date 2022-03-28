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
        [ProducesResponseType(200)]
        public async Task<IActionResult> GetInterns()
        {
            var interns =  await _internCollectionService.GetAll();
            return Ok(interns);
        }

        [HttpPost]
        [ProducesResponseType(200)]

        public async Task<IActionResult> CreateIntern([FromBody] Intern intern)
        {
            await _internCollectionService.Create(intern);
            return Ok(await _internCollectionService.GetAll());
        }
        [HttpPut("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> UpdateIntern(Guid id, [FromBody] Intern intern)
        {
            if (await _internCollectionService.Update(id, intern))
            {
                return Ok(await _internCollectionService.GetAll());
            }
            return NotFound($"Intern with id {id} not found");

        }
        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteIntern(Guid id)
        {
            if (await _internCollectionService.Delete(id))
            {
                return Ok(await _internCollectionService.GetAll());
            }
            return NotFound($"Intern with id {id} not found");
        }
    }
}
