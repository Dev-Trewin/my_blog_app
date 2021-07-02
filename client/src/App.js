import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './Layouts/Navbar';
import Landing from './Layouts/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './Layouts/Alert';
import { Provider } from 'react-redux';

import store from './store';
import { loadUser } from './action/auth';
import setAuthToken from './utils/setAuthToken';
if(localStorage.token){

  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  },[])
  return (
    <Provider store={store}>
      <Router>
        <Fragment >
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </section>


        </Fragment>
      </Router>
    </Provider>
  )
}


export default App;
