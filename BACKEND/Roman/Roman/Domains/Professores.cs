using System;
using System.Collections.Generic;

namespace Roman.Domains
{
    public partial class Professores
    {
        public Professores()
        {
            Projetos = new HashSet<Projetos>();
        }

        public int IdProfessor { get; set; }
        public string Nome { get; set; }
        public string Senha { get; set; }

        public ICollection<Projetos> Projetos { get; set; }
    }
}
