import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./views/homepage";
import Pretest from "./views/pretest";
import Test from "./views/test";
import Results from "./views/results"

function App() {
  return (
    <Router>
      <Switch>
      <Route path="/results" exact>
          <Results />
        </Route>
        <Route path="/practice/:id/:start/:end" exact>
          <Test />
        </Route>
        <Route path="/settings/:id" exact>
          <Pretest />
        </Route>
        <Route path="/" exact>
          <Homepage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
