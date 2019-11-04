using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Roman.Domains
{
    public partial class RomanContext : DbContext
    {
        public RomanContext()
        {
        }

        public RomanContext(DbContextOptions<RomanContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Professores> Professores { get; set; }
        public virtual DbSet<Projetos> Projetos { get; set; }
        public virtual DbSet<Temas> Temas { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=.\\SqlExpress; Initial Catalog=M_Roman;User Id=sa;Pwd=132");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Professores>(entity =>
            {
                entity.HasKey(e => e.IdProfessor);

                entity.HasIndex(e => e.Nome)
                    .HasName("UQ__Professo__7D8FE3B241807D01")
                    .IsUnique();

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Senha)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Projetos>(entity =>
            {
                entity.HasKey(e => e.IdProjeto);

                entity.Property(e => e.Descricao)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdProfessorNavigation)
                    .WithMany(p => p.Projetos)
                    .HasForeignKey(d => d.IdProfessor)
                    .HasConstraintName("FK__Projetos__IdProf__5070F446");

                entity.HasOne(d => d.IdTemaNavigation)
                    .WithMany(p => p.Projetos)
                    .HasForeignKey(d => d.IdTema)
                    .HasConstraintName("FK__Projetos__IdTema__4F7CD00D");
            });

            modelBuilder.Entity<Temas>(entity =>
            {
                entity.HasKey(e => e.IdTema);

                entity.HasIndex(e => e.Nome)
                    .HasName("UQ__Temas__7D8FE3B29A6824BE")
                    .IsUnique();

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });
        }
    }
}
