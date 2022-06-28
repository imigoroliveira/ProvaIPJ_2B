"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const PaperController_1 = require("../controllers/PaperController");
const routes = (0, express_1.Router)();
exports.routes = routes;
//Default
routes.get("/", (request, response) => {
    response.json({ message: "API de Produtos" });
});
const controller = new PaperController_1.FolhaPagamentoController();
//Folha de Pagamento
routes.get("/folha/consultar/:cpf/:mes/:ano", (request, response) => controller.consultar(request, response));
routes.get("/folha/listar", (request, response) => controller.listar(request, response));
