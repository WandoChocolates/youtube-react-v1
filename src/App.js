import React, { Component } from "react";
import { AppLayout } from "./components/AppLayout/AppLayout";
import { Home } from "./containers/Home/Home";
import { Routes, Route } from "react-router-dom";
import { Watch } from "./containers/Watch/Watch";

class App extends Component {
  render() {
    return (
      <AppLayout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/watch" element={<Watch />} />
        </Routes>
      </AppLayout>
    );
  }
}

export default App;
