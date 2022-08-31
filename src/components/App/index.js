import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "../Header";
import Welcome from "../Welcome";
import Accueil from "../Accueil";
import Login from "../Login";
import SignUp from "../SignUp";
import ErrorPage from "../ErrorPage";
import ForgetPassword from "../ForgetPassword";
import Footer from "../Footer";
import '../../App.css';
import {IconContext} from "react-icons";

function App() {
  return (
    <Router>
        <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
          <Header />

          <Switch>
              <Route exact path="/" component={Accueil} />
              <Route path="/welcome" component={Welcome} />
              <Route path="/login" component={Login} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/forget-password" component={ForgetPassword} />
              <Route component={ErrorPage} />
          </Switch>

          <Footer />
        </IconContext.Provider>
    </Router>
  );
}

export default App;
