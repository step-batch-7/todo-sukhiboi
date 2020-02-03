const {
  err404,
  serveStaticPage,
  addTodo,
  toggleTodo,
  deleteTodo,
  sendTodos
} = require('./handlers');
const { bodyParser } = require('./middlewares');
const { Router } = require('./router');

const router = new Router();

router.use(bodyParser);

router.get('', serveStaticPage);
router.get('/', serveStaticPage);
router.get('/todos', sendTodos)
router.post('/addTodo', addTodo);
router.put('/toggleTodo', toggleTodo);
router.delete('/deleteTodo', deleteTodo);

router.get('', err404);
router.post('', err404);

const app = router.serve.bind(router);

module.exports = {
  app
};
