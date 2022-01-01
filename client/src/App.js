import React from "react";

// We use Route in order to define the different routes of our application
import { Route } from "react-router-dom";

// We import all the components we need in our app
import "bootstrap/dist/css/bootstrap.css";

import Redirect from "./components/redirect";
import Create from "./components/create";

const App = () => {
  return (
    <div>
      <Route exact path="/">
        <Create />
      </Route>
      {!(window.location.href.indexOf("create") > -1) && <Route path="/:url" component={Redirect} />}
    </div>
  );
};

export default App;