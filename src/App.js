import React from "react";
import { AppLayout } from "./components/AppLayout/AppLayout";
import Home from "./containers/Home/Home";
import { Routes, Route } from "react-router-dom";
import Watch from "./containers/Watch/Watch";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { youtubeLibraryLoaded } from "./store/actions/api";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const API_KEY = "put-your-api-key-in-here";

function App(props) {
  let location = useLocation();

  useEffect(() => {
    loadYoutubeApi();
  });

  return (
    <AppLayout>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/watch"
          element={<Watch key={location.key} location={location} />}
        />
      </Routes>
    </AppLayout>
  );

  function loadYoutubeApi() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      window.gapi.load("client", () => {
        window.gapi.client.setApiKey(API_KEY);
        window.gapi.client.load("youtube", "v3", () => {
          props.youtubeLibraryLoaded();
        });
      });
    };

    document.body.appendChild(script);
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ youtubeLibraryLoaded }, dispatch);
}

export default connect(null, mapDispatchToProps)(App);
