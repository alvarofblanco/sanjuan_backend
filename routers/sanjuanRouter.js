const express = require("express");
const sanjuanController = require("../controllers/sanjuanController");

function routes(SanJuan) {
  const sanjuanRouter = express.Router();
  const controller = sanjuanController(SanJuan);
  sanjuanRouter.route("/sanjuans").get(controller.get).post(controller.post);

  return sanjuanRouter;
}

module.exports = routes;
