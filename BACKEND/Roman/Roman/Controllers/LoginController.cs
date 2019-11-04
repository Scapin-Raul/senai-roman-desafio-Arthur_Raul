using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Roman.Domains;
using Roman.Repository;
using Senai.OpFlix.WebApi.ViewModels;

namespace Roman.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        UsuarioRepository usuarioRepository = new UsuarioRepository();


        [HttpPost]
        public IActionResult Login(LoginViewModel login)
        {
            try
            {
                Professores professor = usuarioRepository.BuscarPorEmailESenha(login);
                if (professor == null)
                    return NotFound(new { mensagem = "Email ou senha inválidos." });

                var claims = new[]
                {
                    // nome
                    new Claim(JwtRegisteredClaimNames.GivenName, professor.Nome),
                    // id
                    new Claim(JwtRegisteredClaimNames.Jti, professor.IdProfessor.ToString()),
                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("roman-chave-autenticacao"));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: "Roman.WebApi",
                    audience: "Roman.WebApi",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });

            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Erro." + ex.Message });
            }
        }




    }
}