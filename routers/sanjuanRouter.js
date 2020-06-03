const express = require('express');
const sanjuanController = require('../controllers/sanjuanController');
const debug = require('debug')('server:sanjuanRouter');
const Mongoose = require('mongoose');

function routes(SanJuan) {
  const sanjuanRouter = express.Router();
  const controller = sanjuanController(SanJuan);
  sanjuanRouter
    .route('/sanjuans')
    .get(controller.get)
    .post(controller.post);

  // Middleware to find the user by ID
  sanjuanRouter.use('/sanjuans/:sanjuanId', (req, res, next) => {
    const sanJuanID = new Mongoose.Types.ObjectId(
      req.params.sanJuanId,
    );
    SanJuan.findById(sanJuanID, (err, sanjuan) => {
      if (err) {
        debug(`ERROR: ${err}`);
        return res.send(err);
      }
      if (sanjuan && sanjuan.active === true) {
        debug('SANJUAN', sanjuan);
        req.sanjuan = sanjuan;
        return next();
      }
      return res.status(404).json({
        message: 'Sanjuan not found',
      });
    });
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
    })
    .delete((req, res) => {
      const { sanjuan } = req;
      sanjuan.active = false;

      sanjuan.save((e) => {
        if (e) {
          return res.status(500).json({
            message: `Object with id: ${sanjuan.id} could not be deleted`,
            error: e.toString(),
          });
        }
        return res.status(202).json({
          message: `Object with id: ${sanjuan.id} deleted successfully`,
        });
      });
    });

  return sanjuanRouter;
}

module.exports = routes;
