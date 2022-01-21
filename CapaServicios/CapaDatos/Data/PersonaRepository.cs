using Entidades.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDatos.Data
{
    public class PersonaRepository
    {
        private readonly ApplicationDbContext _context;
        public PersonaRepository(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<List<Persona>> GetAll()
        {
            var lista = await _context.Set<Persona>()
                                    .FromSqlRaw("exec spListarPersona")
                                    .ToListAsync();

            return lista;

        }

        public async Task<Persona> GetByID(int Id)
        {
            var idParam = new SqlParameter("@Id", Id);

            var Persona = await _context.Set<Persona>()
                                    .FromSqlRaw("exec spBuscarPersonaxId @Id", parameters: new[] { idParam })
                                    .ToArrayAsync();

            return MapToPersona(Persona);

        }

        public async Task<int> GetByName(string Nombre)
        {
            int cuantos = 0;
            var nombreParam = new SqlParameter("@nombre", Nombre);
            var cuantosParam = new SqlParameter("@cuantos", cuantos);
            cuantosParam.Direction = System.Data.ParameterDirection.Output;

            var x = await _context.Database
                                    .ExecuteSqlRawAsync("spBuscarPersona @nombre, @cuantos out", parameters: new[] { nombreParam, cuantosParam });

            return Convert.ToInt32(cuantosParam.Value);


        }


        public async Task Insert(Persona persona)
        {
            var param = new SqlParameter[] {
                        new SqlParameter() {
                            ParameterName = "@nombre",
                            SqlDbType =  System.Data.SqlDbType.VarChar,
                            Size = 100,
                            Direction = System.Data.ParameterDirection.Input,
                            Value = persona.Nombre
                        },
                        new SqlParameter() {
                            ParameterName = "@apellido",
                            SqlDbType =  System.Data.SqlDbType.VarChar,
                            Size = 100,
                            Direction = System.Data.ParameterDirection.Input,
                            Value = persona.Apellido
                        }
            };

            var x = await _context.Database
                                    .ExecuteSqlRawAsync("spInsertarPersona @nombre, @apellido", param);

            return;
        }

        public async Task DeleteById(int Id)
        {

            var param = new SqlParameter[] {
                        new SqlParameter() {
                            ParameterName = "@id",
                            SqlDbType =  System.Data.SqlDbType.Int,
                            Direction = System.Data.ParameterDirection.Input,
                            Value = Id
                        }};

            var x = await _context.Database
                                    .ExecuteSqlRawAsync("spEliminarPersona @id", param);

            return;

        }

        public async Task UpdateById(int Id, Persona persona)
        {

            var param = new SqlParameter[] {
                        new SqlParameter() {
                            ParameterName = "@nombre",
                            SqlDbType =  System.Data.SqlDbType.VarChar,
                            Size = 100,
                            Direction = System.Data.ParameterDirection.Input,
                            Value = persona.Nombre
                        },
                        new SqlParameter() {
                            ParameterName = "@apellido",
                            SqlDbType =  System.Data.SqlDbType.VarChar,
                            Size = 100,
                            Direction = System.Data.ParameterDirection.Input,
                            Value = persona.Apellido
                        },
                        new SqlParameter() {
                            ParameterName = "@id",
                            SqlDbType =  System.Data.SqlDbType.Int,
                            Direction = System.Data.ParameterDirection.Input,
                            Value = Id
                        }};

            var x = await _context.Database
                                    .ExecuteSqlRawAsync("spEditarPersona @nombre, @apellido, @id", param);

            return;
        }

        public Persona MapToPersona(Persona[] personas)
        {
            if (personas.Length > 0)
                return personas[0];

            return new Persona();
        }

    }
}
