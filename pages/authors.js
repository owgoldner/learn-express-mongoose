let Author = require('../models/author');

function get_author_list () {
  return Author.find({})
    .sort({family_name : 1, first_name : 1});
}

exports.show_all_authors = function(res) {
  get_author_list()
    .then((authors_list) => {
      let data = authors_list.map(function(a) {
        return Author(a).name + " : " + Author(a).lifespan;
      });
      res.send(data);
    })
    .catch((_) => res.send('No authors found'));
}
