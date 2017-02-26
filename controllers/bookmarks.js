'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');
const booklistStore = require('../models/booklist-store');

const bookmarks = {
  index(request, response) {
    logger.info('bookmarks rendering');
    const viewData = {
      title: 'Bookmarks',
      booklists: booklistStore.getAllBooklists(),
    };
    logger.info('about to render', booklistStore.getAllBooklists());
    response.render('bookmarks', viewData);
  },

  deleteBooklist(request, response) {
    const booklistId = request.params.id;
    logger.debug(`Deleting Booklist ${booklistId}`);
    booklistStore.removeBooklist(booklistId);
    response.redirect('/bookmarks');
  },

  addBooklist(request, response) {
    const newBookList = {
      id: uuid(),
      title: request.body.title,
      bookmarks: [],
    };
    logger.debug('Creating a new Booklist', newBookList);
    booklistStore.addBooklist(newBookList);
    response.redirect('/bookmarks');
  },
};

module.exports = bookmarks;
