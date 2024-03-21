let BookInstance = require('../models/bookinstance');

function get_available_books(id) {
  return BookInstance
    .find({ 'status' : 'Available' })
    .populate('book');
}

exports.show_all_books_status = async (res) => {
  try {
    let books = await get_available_books().exec();
    res.send(books.map(function(b) {
      return b.book.title + " : " + b.status;
    }));
  }
  catch(err) {
    console.log('Could not get availability ' + err);
  }
}