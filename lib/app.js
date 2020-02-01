const { err404, serveStaticPage } = require('./handlers');
const { bodyParser } = require('./middlewares');
const { Router } = require('./router');

const router = new Router();

router.use(bodyParser);

router.get('', serveStaticPage);
router.get('/', serveStaticPage);

router.get('', err404);
router.post('', err404);

const app = router.serve.bind(router);

module.exports = {
  app
};
