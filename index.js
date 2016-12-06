var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var collections = require('metalsmith-collections');
var watch       = require('metalsmith-watch');
var s3          = require('metalsmith-s3');

var handlebars  = require('handlebars');
handlebars.registerHelper('strong', require('./helpers/strong'));
handlebars.registerHelper('postTitle', require('./helpers/postTitle'));
handlebars.registerHelper('json', require('./helpers/json'));
handlebars.registerHelper('postLink', require('./helpers/postLink'));

Metalsmith(__dirname)
  .metadata({
    title: "nwpointer",
    description: "It's about saying »Hello« to the World.",
    generator: "Metalsmith",
    url: "http://www.metalsmith.io/"
  })
  .source('./src')
  .destination('./build')
  .clean(false)
  .use(collections({
    posts:{
      pattern: 'posts/*.md',
      sortBy: 'date',
      reverse: true
    } 
  }))
  .use(markdown())
  .use(layouts({
    engine: 'handlebars'
  }))
  // .use(watch({
  //   paths: {
  //     "${source}/**/*": true,
  //     "layouts/**/*": "**/*.md"
  //   },
  //   livereload: true,
  // }))
  .use(s3({
      action: 'write',
      bucket: 'nwpointer'
    }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
