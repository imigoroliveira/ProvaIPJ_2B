import { Router } from "express";
import { FolhaPagamentoController } from "../controllers/PaperController";

const routes = Router();

//Default
routes.get("/", (request, response) => {
  response.json({ message: "API de Produtos" });
});

const controller = new FolhaPagamentoController();
//Folha de Pagamento
routes.get("/folha/consultar/:cpf/:mes/:ano", (request, response) => controller.consultar(request, response));
routes.get("/folha/listar", (request, response) => controller.listar(request, response));

export { routes };
