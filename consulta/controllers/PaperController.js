"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolhaPagamentoController = void 0;
const rabbitmq_server_1 = require("./../rabbitmq-server");
const PaperRepository_1 = require("../repositories/PaperRepository");
const folhaRepository = new PaperRepository_1.FolhaRepository();
class FolhaPagamentoController {
    constructor() {
        this.rabbitmqServer = rabbitmq_server_1.RabbitmqServer.getInstance();
        this.rabbitmqServer.receive("teste", this.cadastrar.bind(this));
    }
    listar(request, response) {
        const folhas = folhaRepository.listar();
        const total = folhas.reduce((total, folha) => total + folha.liquido, 0);
        const dados = {
            array: folhas,
            soma: total
        };
        return response.status(200).json(dados);
    }

    cadastrar(message) {
        let folhas = JSON.parse(message);
        folhas = folhaRepository.cadastrar(folhas);
        console.log(folhas);
    }
    consultar(request, response) {
        const { cpf, mes, ano } = request.params;
        const folha = folhaRepository.consultar(cpf, Number.parseInt(mes), Number.parseInt(ano));
        return response.status(200).json(folha);
    }
}
exports.FolhaPagamentoController = FolhaPagamentoController;
