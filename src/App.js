import React, { Component } from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import classes from "./App.module.css";

import Login from "./containers/Login/Login";
import Home from "./containers/Home/Home";

class App extends Component {

  render () {
    return (
      <Router>
        <div className={classes.App}>
          <Switch>
            <Route path="/login" component={Login}/>
            {this.props.authenticated ? <Route path="/home" component={Home} /> : null}
            <Redirect from="/" to="/login" />
          </Switch>
        </div>
      </Router>
    );
  }
}

const dataFromStore = state => {
  return {
    authenticated: state.authenticated
  }
}

export default connect(dataFromStore)(App);
