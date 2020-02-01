const request = require('supertest');
const { app } = require('./../lib/app');

describe('GET /', () => {
  it('should response back with index page', done => {
    request(app)
      .get('/')
      .set('Accept', 'text/html, text/css, application/script')
      .expect(200)
      .expect('Content-Type', 'text/html')
      .expect('Content-Length', '278')
      .expect(/todo/, done);
  });
});

describe('GET /bad', () => {
  it('should response back with file not found page', done => {
    request(app)
      .get('/bad')
      .expect(404, done);
  });
});

describe('GET /styles/styles.css', () => {
  it('should response back with styles.css', done => {
    request(app)
      .get('/styles/styles.css')
      .set('Accept', 'text/css')
      .expect(200)
      .expect('Content-Type', 'text/css')
      .expect('Content-Length', '0', done);
  });
});

describe('GET /js/todo.css', () => {
  it('should response back with todo.js', done => {
    request(app)
      .get('/js/todo.js')
      .set('Accept', 'application/script')
      .expect(200)
      .expect('Content-Type', 'application/script')
      .expect('Content-Length', '0', done);
  });
});

describe('#POST /addTodo()', () => {
  it('should response back with OK', done => {
    request(app)
      .post('/addTodo')
      .send('id=890&title=My+first+todo')
      .expect(200)
      .expect(/OK/, done);
  });
});
