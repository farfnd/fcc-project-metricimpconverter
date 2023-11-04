const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('Valid input', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=10L')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.strictEqual(res.body.initNum, 10);
        assert.strictEqual(res.body.initUnit, "L");
        assert.strictEqual(res.body.returnNum, 2.64172);
        assert.strictEqual(res.body.returnUnit, "gal");
        assert.strictEqual(res.body.string, "10 liters converts to 2.64172 gallons");
        done();
      });
  });
  
  test('Invalid unit', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=32g')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.strictEqual(res.text, "invalid unit");
        done();
      });
  });
  
  test('Invalid number', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=3/7.2/4kg')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.strictEqual(res.text, "invalid number");
        done();
      });
  });
  
  test('Invalid number & unit', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.strictEqual(res.text, "invalid number and unit");
        done();
      });
  });
  
  test('No number', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=kg')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.strictEqual(res.body.initNum, 1);
        assert.strictEqual(res.body.initUnit, "kg");
        assert.strictEqual(res.body.returnNum, 2.20462);
        assert.strictEqual(res.body.returnUnit, "lbs");
        assert.strictEqual(res.body.string, "1 kilograms converts to 2.20462 pounds");
        done();
      });
  });
});
