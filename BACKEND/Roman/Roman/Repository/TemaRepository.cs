using Roman.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Roman.Repository
{
    public class TemaRepository
    {
        public List<Temas> Listar ()
        {
            using (RomanContext ctx = new RomanContext())
            {
                return ctx.Temas.ToList();
            }
        }
    }
}
