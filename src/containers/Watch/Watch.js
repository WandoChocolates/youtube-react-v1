import React, { useEffect } from "react";
import WatchContent from "./WatchContent/WatchContent";

import { bindActionCreators } from "redux";
import * as watchActions from "../../store/actions/watch";
import { connect } from "react-redux";
import { getYoutubeLibraryLoaded } from "../../store/reducers/api";
import { getChannelId } from "../../store/reducers/videos";
import * as commentActions from "../../store/actions/comment";
import { getCommentNextPageToken } from "../../store/reducers/comments";

import { getSearchParam } from "../../services/url";
import { useLocation, useNavigate } from "react-router-dom";

export function Watch(props) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchWatchContent();
  }, [props.youtubeLibraryLoaded]);

  const videoId = getVideoId();

  const fetchMoreComments = () => {
    if (props.nextPageToken) {
      props.fetchCommentThread(getVideoId(), props.nextPageToken);
    }
  };

  return (
    <WatchContent
      videoId={videoId}
      channelId={props.channelId}
      bottomReachedCallback={fetchMoreComments}
      nextPageToken={props.nextPageToken}
    />
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

function mapStateToProps(state, props) {
  return {
    youtubeLibraryLoaded: getYoutubeLibraryLoaded(state),
    channelId: getChannelId(state, props.location, "v"),
    nextPageToken: getCommentNextPageToken(state, props.location)
  };
}

function mapDispatchToProps(dispatch) {
  const fetchWatchDetails = watchActions.details.request;
  const fetchCommentThread = commentActions.thread.request;
  return bindActionCreators(
    { fetchWatchDetails, fetchCommentThread },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Watch);
