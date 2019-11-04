using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Roman.Repository;

namespace Roman.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class TemasController : ControllerBase
    {
        TemaRepository temaRepository = new TemaRepository();

        [Authorize]
        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(temaRepository.Listar());
        }
    }
}