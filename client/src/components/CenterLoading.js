import React, { Component } from "react";

import ReactLoading from "react-loading";

export default class CenterLoading extends Component {
  render() {
    return (
      <div className="w-100 d-flex justify-content-center">
        <ReactLoading type="bars" color="#1919FF" />
      </div>
    );
  }
}
