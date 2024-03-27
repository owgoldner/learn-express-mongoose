let async = require('async');
let Book = require('../models/book');
let BookInstance = require('../models/bookinstance');

function get_book(id) {
    if (typeof id !== "string") {
        return ({status: "error"});
    }
    return Book.findOne({'_id': {$eq: id}}).populate('author');
}

function get_book_dtl(id) {
  // fix sql-injection vulnerability by sanitizing input id
  const sanitizedId = id.replace(/[^\w\s]/gi, ''); // Remove non-alphanumeric characters

  return BookInstance
          .find({ 'book': sanitizedId })
          .select('imprint status');
}

exports.show_book_dtls = async (res, id) => {
  const results = await Promise.all([get_book(id).exec(), get_book_dtl(id).exec()])
  try {
    let book = await results[0];
    let copies = await results[1];
    res.send({
      title: book.title,
      author: book.author.name,
      copies: copies,
    });
  }
  catch(err) {
    res.send(`Book ${id} not found`);
  } 
}
