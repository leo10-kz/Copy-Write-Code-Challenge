let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/server/index');

chai.should();
chai.use(chaiHttp);

describe('copyWrite Api', () => {
   /**
    * Test the by query GET route
    */
  describe('GET /iecho?text=test', () => {
      it('It should be able to return what is passed to me by inverted query', (done) => {
         let queryString = 'test';
         chai.request(server)
         .get('/iecho?text='+ queryString)
         .end((error, response) => {
             response.should.have.status(200);
             response.body.should.be.a('object');
             response.body.should.have.property('text');
             response.body.should.have.property('palindromo');
         done();    
         });  
      });

      it('it should i return a status code 400 if what they pass is a number', (done) => {
        let queryString = '1234';
        chai.request(server)
        .get('/iecho?text='+ queryString)
        .end((error, response) => {
            response.should.have.status(400);
        done();    
        });  
     });  
  });

});