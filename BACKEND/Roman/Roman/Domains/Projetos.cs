using System;
using System.Collections.Generic;

namespace Roman.Domains
{
    public partial class Projetos
    {
        public int IdProjeto { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public int? IdTema { get; set; }
        public int? IdProfessor { get; set; }

        public Professores IdProfessorNavigation { get; set; }
        public Temas IdTemaNavigation { get; set; }
    }
}
