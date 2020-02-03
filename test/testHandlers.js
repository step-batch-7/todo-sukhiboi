const request = require('supertest');
const { app } = require('./../lib/app');

describe('GET /', () => {
  it('should response back with index page', done => {
    request(app)
      .get('/')
      .set('Accept', 'text/html, text/css, application/script')
      .expect(200)
      .expect('Content-Type', 'text/html')
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
      .expect('Content-Type', 'text/css', done);
  });
});

describe('GET /js/todo.css', () => {
  it('should response back with todo.js', done => {
    request(app)
      .get('/js/todo.js')
      .set('Accept', 'application/script')
      .expect(200)
      .expect('Content-Type', 'application/script', done);
  });
});

describe('POST /addTodo()', () => {
  it('should response back with OK', done => {
    request(app)
      .post('/addTodo')
      .send('id=890&title=My+first+todo')
      .expect(200)
      .expect(/OK/, done);
  });
});

describe('PATCH /toggleTodo()', () => {
  it('should response back with TOGGLED', done => {
    request(app)
      .patch('/toggleTodo')
      .send('id=890')
      .expect(200)
      .expect(/TOGGLED/, done);
  });
});

describe('DELETE /deleteTodo()', () => {
  it('should response back with DELETED', done => {
    request(app)
      .delete('/deleteTodo')
      .send('id=890')
      .expect(200)
      .expect(/DELETED/, done);
  });
});

describe('GET /todos()', () => {
  it('should response back with all the todos', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect('Content-Length', '696', done);
  });
});
