import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Users from './Pages/users/Users';
import Login from './Pages/users/Login'
import Register from './Pages/users/Register'
import Places from './Pages/places/Places';
import UpdatePlace from './Pages/places/UpdatePlace';
import Nav from './Pages/Navigation/Nav';
import { useAuth } from './hooks/user-hook'
import NewPlace from './Pages/places/NewPlace';
import { AuthContext } from './context/user-context';

const App = props => {
  const { token, login, logout, userId } = useAuth()
  let routes
  if (token) {
    routes = (
      <Switch>

        <Route path="/" exact>
          <Users />
        </Route>

        <Route exact path="/:userId/places">
          <Places />
        </Route>

        <Route exact path="/places/new">
          <NewPlace />
        </Route>

        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>

        <Redirect to="/" />

      </Switch>
    )
  } else {
    routes = (
      <Switch>

        <Route path="/" exact>
          <Users />
        </Route>

        <Route path="/:userId/places">
          <Places />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Redirect to="/login" />

      </Switch>
    )
  }
  return (
    <AuthContext.Provider value={{ isLogin: !!token, token: token, login: login, logout: logout, userId: userId }}>
      <Router>
        <Nav />
        <main>
          <Switch>
            {routes}
          </Switch>
        </main>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
