import React from "react";
import { CommentsHeader } from "./CommentsHeader/CommentsHeader";
import { AddComment } from "./AddComment/AddComment";
import { Comment } from "./Comment/Comment";

export class Comments extends React.Component {
  render() {
    if (!this.props.comments) {
      return <div />;
    }

    const comments = this.props.comments.map((comment) => {
      return <Comment comment={comment} key={comment.id} />;
    });

    return (
      <div>
        <CommentsHeader amountComments={this.props.amountComments} />
        <AddComment />
        {comments}
      </div>
    );
  }
}
