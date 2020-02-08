const request = require('supertest');
const { app } = require('./../lib/app');

describe('GET /', () => {
  it('should response back with index page', done => {
    request(app)
      .get('/')
      .set('Accept', 'text/html, text/css, application/script')
      .expect(200)
      .expect('Content-Type', 'text/html')
      .expect(/newListInput/, done);
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

describe('GET /js/main.js', () => {
  it('should response back with main.js', done => {
    request(app)
      .get('/js/main.js')
      .set('Accept', 'application/script')
      .expect(200)
      .expect('Content-Type', 'application/script', done);
  });
});

describe('DELETE /deleteList', () => {
  it('should response back with DELETED', done => {
    request(app)
      .post('/createList')
      .send('listName=newList')
      .expect(200)
      .expect(/CREATED/, done);
  });
});

describe('DELETE /deleteList', () => {
  it('should response back with DELETED', done => {
    request(app)
      .post('/createList')
      .send('listName=newList')
      .expect(200)
      .end(() => {
        request(app)
          .delete('/deleteList')
          .send('todoListId=newList')
          .expect(/DELETED/)
          .expect(200, done);
      });
  });
});

describe('POST /addTodo', () => {
  it('should response back with OK', done => {
    request(app)
      .post('/createList')
      .send('listName=newList')
      .expect(200)
      .end(() => {
        request(app)
          .post('/addTodo')
          .send('todoListId=newList&id=89&title=NewTodo')
          .expect(200)
          .expect('{"title":"NewTodo","isCompleted":false,"id":"89"}', done);
      });
  });
});

describe('PATCH /toggleTodo', () => {
  it('should response back with TOGGLED', done => {
    request(app)
      .post('/createList')
      .send('listName=newList')
      .expect(200)
      .end(() => {
        request(app)
          .post('/addTodo')
          .send('todoListId=newList&id=89&title=NewTodo')
          .expect(200)
          .end(() => {
            request(app)
              .patch('/toggleTodo')
              .send('todoListId=newList&id=89')
              .expect(200)
              .expect(/TOGGLED/, done);
          });
      });
  });
});

describe('DELETE /deleteTodo', () => {
  it('should response back with DELETED', done => {
    request(app)
      .post('/createList')
      .send('listName=newList')
      .expect(200)
      .end(() => {
        request(app)
          .post('/addTodo')
          .send('todoListId=newList&id=89&title=NewTodo')
          .expect(200)
          .end(() => {
            request(app)
              .delete('/deleteTodo')
              .send('todoListId=newList&id=89')
              .expect(200)
              .expect(/DELETED/, done);
          });
      });
  });
});

describe('GET /todos', () => {
  it('should response back with all the todos', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect('Content-Length', '250', done);
  });
});

describe('PATCH /updateTodoTitle', () => {
  it('should response back with UPDATED', (done) => {
    request(app)
      .post('/createList')
      .send('listName=newList')
      .expect(200)
      .end(() => {
        request(app)
          .post('/addTodo')
          .send('todoListId=newList&id=89&title=NewTodo')
          .expect(200)
          .end(() => {
            request(app)
              .patch('/updateTodoTitle')
              .send('todoListId=newList&id=89&newTitle=some+greate')
              .expect(200)
              .expect(/UPDATED/, done);
          });
      });
  });
});
