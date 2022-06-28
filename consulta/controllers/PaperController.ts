import { RabbitmqServer } from './../rabbitmq-server';
import { Request, Response } from "express";
import { FolhaPagamento } from "../models/Paper";
import { FolhaRepository } from "../repositories/PaperRepository";

const folhaRepository = new FolhaRepository();

export class FolhaPagamentoController {
  private rabbitmqServer;

  constructor(){
    this.rabbitmqServer = RabbitmqServer.getInstance();
    this.rabbitmqServer.receive("teste", this.cadastrar.bind(this));
  }

  listar(request: Request, response: Response) {
    const folhas = folhaRepository.listar();
    const total = 
      folhas.reduce((total, folha) => total + folha.liquido, 0);
    const dados = {
      array: folhas,
      soma:  total
    };
    return response.status(200).json(dados);
  }

  consultar(request: Request, response: Response) {
    const {cpf, mes, ano} = request.params;
    const folha = folhaRepository.consultar(
      cpf, Number.parseInt(mes), Number.parseInt(ano)
    );
    return response.status(200).json(folha);
  }

  cadastrar(message : string) {
    let folhas: FolhaPagamento[] = JSON.parse(message);
    folhas = folhaRepository.cadastrar(folhas);
    console.log(folhas);
  }
}
