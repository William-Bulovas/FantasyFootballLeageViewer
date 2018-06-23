import React, { Component } from "react";

export default class RetryButton extends Component {
  render() {
    return (
      <div>
        <h6>Could Not Complete Request</h6>
        <button className="btn btn-danger btn-sm" onClick={this.props.retry()}>
          Try Again?
        </button>
      </div>
    );
  }
}
