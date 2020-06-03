const express = require('express');
const sanjuanController = require('../controllers/sanjuanController');
const debug = require('debug')('server:sanjuanRouter');

function routes(SanJuan) {
  const sanjuanRouter = express.Router();
  const controller = sanjuanController(SanJuan);
  sanjuanRouter
    .route('/sanjuans')
    .get(controller.get)
    .post(controller.post);

  sanjuanRouter.use('/sanjuans/:sanjuanId', (req, res, next) => {
    SanJuan.find(
      { id: req.params.sanjuanId, active: true },
      (err, sanjuan) => {
        if (err) {
          return res.send(err);
        }
        if (sanjuan) {
          req.sanjuan = sanjuan;
          return next();
        }
        return res.status(404).json({
          message: 'sanjuan not found',
        });
      },
    );
  });

  sanjuanRouter
    .route('/sanjuans/:sanjuanId')
    .get((req, res) => {
      // Format the response
      const sanjuanData = req.sanjuan.toJSON();
      sanjuanData.id = sanjuanData._id;
      delete sanjuanData._id;
      delete sanjuanData.__v;
      delete sanjuanData.created_at;

      // Adds a link to its own route in the API
      sanjuanData.links = {};
      sanjuanData.links.self = `http://${req.headers.host}/sanjuans/${sanjuanData.id}`;

      // Sends the data to the client
      res.status(200).json({
        message: 'Sanjuan retrieved succesfully',
        data: sanjuanData,
      });
    })
    .put((req, res) => {
      const { sanjuan } = req;
      sanjuan.name = req.body.name;
      sanjuan.description = req.body.description;
      sanjuan.hours = req.body.hours;
      sanjuan.days = req.body.days;
      sanjuan.contact = req.body.contact;
      sanjuan.updated_at = new Date();

      sanjuan.save((error) => {
        if (error) {
          return res.send(error);
        }
        return res
          .status(200)
          .json({ message: 'Resource updated successfully' });
      });
    });

  return sanjuanRouter;
}

module.exports = routes;
