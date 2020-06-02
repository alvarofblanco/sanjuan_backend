function sanjuanController(SanJuan) {
  function post(req, res) {
    const sanjuan = new SanJuan(req.body);
    if (!req.body.name) {
      res.status(400);
      return res.send("Title is required");
    }

    sanjuan.save();
    res.status(201);
    return res.json(sanjuan);
  }

  function get(req, res) {
    const query = {};
    // filtering query params
    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    // call find method from Book model to fetch a book from the database
    SanJuan.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      const returnBooks = books.map((book) => {
        const newBook = book.toJSON();
        newBook.links = {};
        newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`;
        return newBook;
      });
      return res.json(returnBooks);
    });
  }

  return { post, get };
}

module.exports = sanjuanController;
