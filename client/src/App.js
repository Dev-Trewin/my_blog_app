import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './Layouts/Navbar';
import Landing from './Layouts/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './Layouts/Alert';
import { Provider } from 'react-redux';

import store from './store';
const App = () =>
  <Provider store={store}>
    <Router>
      <Fragment >
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert/>
          <auth/>
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>


      </Fragment>
    </Router>
  </Provider>



export default App;
