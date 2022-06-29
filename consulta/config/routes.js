"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express = require("express");
const PaperController = require("../controllers/PaperController");
const routes = (0, express.Router)();
exports.routes = routes;
//Default
routes.get("/", (request, response) => {
    response.json({ message: "API de Produtos" });
});
const controller = new PaperController.FolhaPagamentoController();
//Folha de Pagamento
routes.get("/folha/listar", (request, response) => controller.listar(request, response));
routes.get("/folha/total", (request, response) => controller.total(request, response));
routes.get("/folha/media", (request, response) => controller.media(request, response));
