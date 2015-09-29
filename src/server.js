/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import 'babel/polyfill';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Router from './Router';
import Html from './components/Html';

const server = global.server = express();

server.set('port', (process.env.PORT || 5000));
server.use(express.static(path.join(__dirname, 'public')));

//
// Register API middlewares
// -----------------------------------------------------------------------------
server.use('/api/content', require('./api/content'));
server.use('/api/theme', require('./api/theme'));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------

server.get('*', async (req, res, next) => {
  try {
    let statusCode = 200;
    let theme = 'default';
    const data = { title: '', description: '', css: '', body: '' };
    const css = [];
    const context = {
      onInsertCss: value => css.push(value),
      onSetTitle: value => data.title = value,
      onSetMeta: (key, value) => data[key] = value,
      onPageNotFound: () => statusCode = 404,
      cssTheme: {}
    };

    await Router.dispatch({ path: req.path, context, theme }, (state, component) => {
      data.body = ReactDOM.renderToString(component);
      data.css = css.join('');
    });

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(statusCode).send('<!doctype html>\n'+html);
  } catch (err) {
    next(err);
  }
});

//
// Launch the server
// -----------------------------------------------------------------------------

server.listen(server.get('port'), () => {
  if (process.send) {
    process.send('online');
  } else {
    console.log('The server is running at http://localhost:' + server.get('port'));
  }
});
