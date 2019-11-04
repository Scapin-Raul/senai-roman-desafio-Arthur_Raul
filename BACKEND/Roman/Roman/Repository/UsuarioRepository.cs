using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Roman.Domains;
using Senai.OpFlix.WebApi.ViewModels;

namespace Roman.Repository
{
    public class UsuarioRepository
    {
        public Professores BuscarPorEmailESenha(LoginViewModel login)
        {
            using (RomanContext ctx = new RomanContext())
            {
                var user = ctx.Professores.FirstOrDefault(x => x.Nome == login.Nome && x.Senha == login.Senha);
                if (user == null) return null;
                return user;
            }

        }
    }
}
