const {
  err404,
  serveStaticPage,
  addTodo,
  toggleTodo,
  deleteTodo,
  sendTodos,
  createList,
  deleteList
} = require('./handlers');
const { bodyParser } = require('./middlewares');
const { Router } = require('./router');

const router = new Router();

router.use(bodyParser);

router.get('', serveStaticPage);
router.get('/', serveStaticPage);
router.get('/todos', sendTodos);
router.post('/createList', createList);
router.post('/addTodo', addTodo);
router.patch('/toggleTodo', toggleTodo);
router.delete('/deleteTodo', deleteTodo);
router.delete('/deleteList', deleteList)

router.get('', err404);
router.post('', err404);

const app = router.serve.bind(router);

module.exports = {
  app
};
