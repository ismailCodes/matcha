import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Link,
  // Redirect,
} from 'react-router-dom';
import Login from './pages/Login';
import Browse from './pages/Browse';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Chat from './pages/Chat';
import Notifications from './pages/Notifications';
import ExternalProfile from './pages/ExternalProfile';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/browse' component={Browse} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/search' component={Search} />
        <Route exact path='/chat' component={Chat} />
        <Route exact path='/notifications' component={Notifications} />
        <Route exact path='/user/:id' component={ExternalProfile} />
      </Switch>
    </Router>
  );
}
