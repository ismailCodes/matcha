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
import Research from './pages/Research';
import Chat from './pages/Chat';
import Notifications from './pages/Notifications';
import ExternalProfile from './pages/ExternalProfile';

export default function App() {
  // let loggedIn = false;
  return (
    <Router>
      {/* <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/browse">Browse</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/research">Research</Link>
            </li>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
            <li>
              <Link to="/notifications">Notifications</Link>
            </li>
          </ul>
        </nav>
      </div>
      <hr /> */}

      <Switch>
        <Route exact path='/'>
          {/* {loggedIn ? <Redirect to="/browse" /> : <LoginPage />} */}
          <Login />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/register'>
          <Register />
        </Route>
        <Route exact path='/browse'>
          <Browse />
        </Route>
        <Route exact path='/profile'>
          <Profile />
        </Route>
        <Route exact path='/research'>
          <Research />
        </Route>
        <Route exact path='/chat'>
          <Chat />
        </Route>
        <Route exact path='/notifications'>
          <Notifications />
        </Route>
        <Route exact path='/user/:id'>
          <ExternalProfile />
        </Route>
      </Switch>
    </Router>
  );
}
