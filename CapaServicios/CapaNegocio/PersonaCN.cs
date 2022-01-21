using CapaDatos.Data;
using Entidades.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaNegocio
{
   public class PersonaCN
    {

        PersonaRepository _repository;
        public PersonaCN(PersonaRepository repository)
        {
            _repository = repository;
        }


        public async Task<List<Persona>> GetAll()
        {
            return await _repository.GetAll();

        }

        public async Task<Persona> GetByID(int Id)
        {
            return await _repository.GetByID(Id);

        }

        public async Task<int> GetByName(string Nombre)
        {
            
            return await _repository.GetByName(Nombre); ;


        }


        public async Task Insert(Persona persona)
        {
            await _repository.Insert(persona);
            return;
        }

        public async Task DeleteById(int Id)
        {
            await _repository.DeleteById(Id);
            return;
        }

        public async Task UpdateById(int Id, Persona persona)
        {

            await _repository.UpdateById(Id, persona);
            return;
        }

    }
}
