'use strict';

const request = require('supertest');
const app = require('../routes/articles');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : true }));

describe('Article Router', function(){

  describe('POST /', function(){

    it('should respond with a success message', function(done){
      let article = {"title" : "Laura's Awesome Article", "author" : "Laura, Duh", "body" : "Awesome Stuff"};
      request(app)
        .post('/')
        .type('form')
        .send(article)
        .expect(200, {"success" : true }, done);
    });

  }); //Ends POST

}); //Ends Article Router