import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import './index.less';

// 1. Initialize
const app = dva({
  history: createHistory(),
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/articles'));
app.model(require('./models/tags'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');