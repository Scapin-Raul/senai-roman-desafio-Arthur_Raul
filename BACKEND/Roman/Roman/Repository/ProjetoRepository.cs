using Microsoft.EntityFrameworkCore;
using Roman.Domains;
using Roman.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Roman.Repository
{
    public class ProjetoRepository
    {
        public List<ProjetoViewModel> Listar()
        {
            using (RomanContext ctx = new RomanContext())
            {
                var lista = ctx.Projetos.Include(x => x.IdTemaNavigation).Include(x => x.IdProfessorNavigation).ToList();
                List<ProjetoViewModel> projetoViewModel = new List<ProjetoViewModel>();
                foreach (var item in lista)
                {
                    ProjetoViewModel projeto = new ProjetoViewModel
                    {
                        IdProjeto = item.IdProjeto,
                        Nome = item.Nome,
                        Descricao = item.Descricao,
                        Professor = ctx.Professores.Find(item.IdProfessor).Nome,
                        Tema = ctx.Temas.Find(item.IdTema).Nome

                    };
                    projetoViewModel.Add(projeto);
                }
                return projetoViewModel;
            }
        }
        public void Cadastrar(Projetos projetos)
        {
            using (RomanContext ctx = new RomanContext())
            {
                ctx.Projetos.Add(projetos);
                ctx.SaveChanges();
            }
        }
    }
}
