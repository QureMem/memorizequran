import React from "react";
import "./App.css";
import "./tailwind.output.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./views/homepage";
import Pretest from "./views/pretest";
function App() {
  return (
    <Router>
      <Switch>
        {/* <Route path="/about">
            <About />
  </Route>*/}
        <Route path="/pretest/:id" exact>
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
