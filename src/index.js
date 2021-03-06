import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import Articles from './models/articles';
import Tags from './models/tags';
import Login from './models/login';
import App from './models/app';
import Router from './router';
import './index.less';

// 1. Initialize
const app = dva({
  history: createHistory(),
});

// 2. Plugins
// app.use({});
app.use(createLoading());

// 3. Model
app.model(Articles);
app.model(App);
app.model(Tags);
app.model(Login);

// 4. Router
app.router(Router);

// 5. Start
app.start('#root');
