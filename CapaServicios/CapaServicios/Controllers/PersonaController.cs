using CapaDatos.Data;
using Entidades.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CapaServicios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonaController : ControllerBase
    {

        PersonaRepository _repository;
        public PersonaController(PersonaRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }


        // GET: api/Persona
        [HttpGet]
        public async Task<List<Persona>> Get()
        {
            return await _repository.GetAll();
        }


        // GET: api/Persona/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Persona>> Get(int id)
        {
            var response = await _repository.GetByID(id);
            if (response == null) { return NotFound(); }
            return response;
        }


        // GET: api/Persona/GetByName/juan
        [HttpGet("GetByName/{nombre}")]
        public async Task<ActionResult<int>> Get(string nombre)
        {
            int response = await _repository.GetByName(nombre);
            return response;
        }

        // POST: api/Persona
        [HttpPost]
        public async Task Post([FromBody] Persona persona)
        {
            await _repository.Insert(persona);
        }

        // PUT: api/Persona/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] Persona persona)
        {
            await _repository.UpdateById(id, persona);
        }

        // DELETE: api/Persona/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _repository.DeleteById(id);
        }
    }
}
