function sanjuanController(SanJuan) {
  async function post(req, res) {
    const sanjuan = new SanJuan(req.body);
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
    const query = {};
    // filtering query params
    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    // call find method from Book model to fetch a book from the database
    SanJuan.find(query, (err, sanjuan) => {
      if (err) {
        return res.send(err);
      }
      const returnSanjuan = sanjuan.map((book) => {
        const newBook = book.toJSON();
        newBook.links = {};
        newBook.links.self = `http://${req.headers.host}/api/sanjuan/${book._id}`;
        return newBook;
      });
      return res.json(returnSanjuan);
    });
  }

  return { post, get };
}

module.exports = sanjuanController;
