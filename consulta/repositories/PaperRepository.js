"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolhaRepository = void 0;
const folhas = [];
class FolhaRepository {
    listar() {
        return folhas;
    }
    cadastrar(folhasNovas) {
        folhasNovas.forEach((folha) => {
            folhas.push(folha);
        });
        return folhas;
    }
    consultar(cpf, mes, ano) {
        return folhas.find((folha) => folha.funcionario.cpf === cpf && folha.mes == mes &&
            folha.ano === ano);
    }
}
exports.FolhaRepository = FolhaRepository;
