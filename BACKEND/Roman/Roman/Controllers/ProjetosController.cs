using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Roman.Domains;
using Roman.Repository;

namespace Roman.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class ProjetosController : ControllerBase
    {
        ProjetoRepository projetoRepository = new ProjetoRepository();

        [Authorize]
        [HttpGet]
        public IActionResult Listar ()
        {
            return Ok(projetoRepository.Listar());
        }

        [Authorize]
        [HttpPost]
        public IActionResult Cadastrar(Projetos projetos)
        {
            try
            {
                projetoRepository.Cadastrar(projetos);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Ocorreu um erro " + ex });
            }

        }
    }
}