const debug = require('debug')('server:sanjuanController');

function sanjuanController(SanJuan) {
  async function post(req, res) {
    const sanjuan = new SanJuan(req.body);
    sanjuan.created_at = new Date();
    sanjuan.updated_at = new Date();
    sanjuan.active = true;

    // if (!req.body.name) {
    //   res.status(400);
    //   return res.send('Title is required');
    // }

    try {
      const result = await sanjuan.save();
      const response = {
        message: 'Sanjuan created succesfully',
        data: result,
      };

      return res.status(201).json(response);
    } catch (e) {
      res.status(500).json({
        message: 'Sanjuan could not be created',
        error: e.toString(),
      });
    }

    // res.status(201);
  }

  function get(req, res) {
    // call find method from Sanjuan model to fetch a sanjuan from the database
    SanJuan.find({ active: true }, (err, sanjuan) => {
      if (err) {
        return res.send(err);
      }

      // Checks if the array is empty
      if (sanjuan.length == 0) {
        return res.status(404).json({
          message: 'Sanjuan list is empty',
        });
      }

      const sanjuanList = sanjuan.map((sanjuan) => {
        const newSanjuan = sanjuan.toJSON();

        newSanjuan.id = newSanjuan._id;
        delete newSanjuan._id;
        delete newSanjuan.__v;
        delete newSanjuan.created_at;
        newSanjuan.links = {};
        newSanjuan.links.self = `http://${req.headers.host}/api/sanjuans/${sanjuan._id}`;

        return newSanjuan;
      });

      const sanjuanReturn = {
        message: 'Sanjuan List retrieved succesfully',
        data: sanjuanList,
      };

      return res.json(sanjuanReturn);
    });
  }

  return { post, get };
}

module.exports = sanjuanController;
