import { FolhaPagamento } from "../models/Paper";


const folhas: FolhaPagamento[] = [];

export class FolhaRepository {
  
  listar() : FolhaPagamento[] {
    return folhas;
  }

  consultar(cpf: string, mes: number, ano: number) : FolhaPagamento{
    return folhas.find((folha) => 
      folha.funcionario.cpf === cpf && folha.mes == mes && 
      folha.ano === ano)!;
  }

  cadastrar(folhasNovas: FolhaPagamento[]) : FolhaPagamento[]{
    folhasNovas.forEach((folha) => {
      folhas.push(folha);
    });
    return folhas;
  }
}
