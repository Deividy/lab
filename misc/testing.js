/**
 * Module dependencies.
 */

var soda = require('soda')
  , assert = require('assert');

var browser = soda.createClient({
    host: 'dlogix'
  , port: 4444
  , url: 'http://www.vindecoder.net/'
  , browser: 'iehta'
});

browser.on('command', function(cmd, args){
  console.log(' \x1b[33m%s\x1b[0m: %s', cmd, args.join(', '));
});

browser
  .chain
  .session()
  .open('/')
  .type('vin', '2G2WP522651173085')
  .click('submit')
  .getText(function(t){
    console.log(t)
  })
  .waitForPageToLoad(2000)
  .end(function(err){
    browser.testComplete(function(){
      console.log('done');
      if (err) throw err;
    });
  });
