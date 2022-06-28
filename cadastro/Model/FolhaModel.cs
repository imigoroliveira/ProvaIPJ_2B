using System.ComponentModel.DataAnnotations;

namespace cadastro.Model
{
    public class Funcionario
    {
        public string? nome { get; set; }
        public string? cpf { get; set; }
    }
    public class FolhaModel
    {
        public int id { get; set; }
        public int mes { get; set; }
        public int ano { get; set; }
        public int horas { get; set; }
        public int valor { get; set; }
        public bool processada { get; set; }

        public Funcionario? funcionario { get; set; }

        public double? irrf { get; set; }
        public double? inss { get; set; }
        public double? fgts { get; set; }
        public int? liquido { get; set; }
        public double? bruto { get; set; }
    }
}
