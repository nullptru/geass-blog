import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import './index.less';

// 1. Initialize
const app = dva({
  history: createHistory(),
});

// 2. Plugins
// app.use({});
app.use(createLoading());

// 3. Model
app.model(require('./models/articles'));
app.model(require('./models/tags'));
app.model(require('./models/tagsArticles'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
