import React, { Component } from "react";
import { AppLayout } from "./components/AppLayout/AppLayout";
import { Home } from "./containers/Home/Home";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <AppLayout>
          <Home />
        </AppLayout>
      </React.Fragment>
    );
  }
}

export default App;
