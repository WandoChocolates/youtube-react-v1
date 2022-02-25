import React, { useState, useEffect } from "react";
import "./Watch.scss";
import { RelatedVideos } from "../../components/RelatedVideos/RelatedVideos";
import { Video } from "../../components/Video/Video";
import { VideoMetadata } from "../../components/VideoMetadata/VideoMetadata";
import { VideoInfoBox } from "../../components/VideoInfoBox/VideoInfoBox";
import { Comments } from "../Comments/Comments";

import { bindActionCreators } from "redux";
import * as watchActions from "../../store/actions/watch";
import { connect } from "react-redux";
import { getYoutubeLibraryLoaded } from "../../store/reducers/api";

import { getSearchParam } from "../../services/url";
import { useLocation, useNavigate } from "react-router-dom";

export function Watch(props) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchWatchContent();
  }, [props.youtubeLibraryLoaded]);

  return (
    <div className="watch-grid">
      <Video className="video" id="-7fuHEEmEjs" />
      <VideoMetadata className="metadata" viewCount={1000} />
      <VideoInfoBox className="video-info-box" />
      <Comments className="comments" />
      <RelatedVideos className="relatedVideos" />
    </div>
  );

  function getVideoId() {
    return getSearchParam(location, "v");
  }

  function fetchWatchContent() {
    const videoId = getVideoId();

    if (!videoId) {
      //this.props.history.push("/");
      navigate("/");
    }
    props.fetchWatchDetails(videoId, props.channelId);
  }
}

function mapStateToProps(state) {
  return {
    youtubeLibraryLoaded: getYoutubeLibraryLoaded(state)
  };
}

function mapDispatchToProps(dispatch) {
  const fetchWatchDetails = watchActions.details.request;
  return bindActionCreators({ fetchWatchDetails }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Watch);
