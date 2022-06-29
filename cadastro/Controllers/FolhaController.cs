using Microsoft.AspNetCore.Mvc;
using cadastro.Model;

namespace cadastro.Controllers
{
    [Route("folha/cadastrar")]
    [ApiController]
    public class FolhasController : ControllerBase
    {

        [HttpPost]
        public IActionResult CadastrarFolha([FromBody] FolhaModel folha)
        {
            // Pegar folha
            var newFolha = folha;

            // Calcular bruto
            newFolha.bruto = (newFolha.horas * newFolha.valor);

            // Calcular IRRF;
            double aliquotaIR = 1;
            double taxa = 1;

            if (newFolha.bruto <= 1903.98)
            {
                aliquotaIR = 1;
                taxa = 0;
            }
            if (newFolha.bruto >= 1903.99 && newFolha.bruto <= 2826.65)
            {
                aliquotaIR = 7.5;
                taxa = 142.80;
            }
            if (newFolha.bruto >= 2826.66 && newFolha.bruto <= 3751.05)
            {
                aliquotaIR = 15;
                taxa = 354.80;
            }
            if (newFolha.bruto >= 3751.06 && newFolha.bruto <= 4664.68)
            {
                aliquotaIR = 22.5;
                taxa = 636.13;
            }
            if (newFolha.bruto >= 4664.68)
            {
                aliquotaIR = 27.5;
                taxa = 869.36;
            }
            newFolha.irrf = ((newFolha.bruto * (aliquotaIR / 100)) - taxa);

            // Calcular inss
            double descontoUm = 135.49;
            double descontoDois = 101.62;
            double descontoTres = 310.51;
            double descontoQuatro = 621.03;

            if (newFolha.bruto <= 1693.72)
            {
                newFolha.inss = descontoUm;
            }
            else if (newFolha.bruto > 1693.72 && newFolha.bruto < 2822.91)
            {
                newFolha.inss = descontoUm + ((newFolha.bruto - 1693.73) * 0.09);
            }
            else if (newFolha.bruto > 2822.90 && newFolha.bruto < 5645.81)
            {
                newFolha.inss = descontoUm + descontoDois + ((newFolha.bruto - 2822.91) * 0.11);
            }
            else if (newFolha.bruto >= 5645.81)
            {
                newFolha.inss = descontoUm + descontoDois + descontoTres + descontoQuatro;
            }


            // Calcular fgts
            newFolha.fgts = (newFolha.bruto * 0.08);

            newFolha.liquido = Convert.ToInt32(newFolha.bruto - newFolha.irrf - newFolha.inss - newFolha.fgts);

            return Ok(newFolha);
        }


    }
}
