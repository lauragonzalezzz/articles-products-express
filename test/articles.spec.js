'use strict';
const express = require('express');
const request = require('supertest');
const app = require('../routes/articles');

describe('Article Router', function(){

  describe('POST /', function(){

    it('should', function(){
      return true;
    })

    it('should respond with a success message', function(done){
      let article = {"title" : "Laura's Awesome Article", "author" : "Laura, Duh", "body" : "Awesome Stuff"};
      request(app)
        .post('/')
        .type('json')
        .set('Version', "1.0")
        .send(article)
        .expect(200)
        .end(function(err, result){
          done();
        });
    });

  }); //Ends POST

}); //Ends Article Router