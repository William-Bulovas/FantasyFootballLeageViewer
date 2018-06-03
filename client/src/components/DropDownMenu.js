import React, { Component } from "react";

export default class DropDownMenu extends Component {
    state = { selection: 0 };
  
    static getDerivedStateFromProps(props, state) {
      if (state.selection == props.currentSelection) {
        return null;
      }
  
      return { selection: 0 };
    }
  
    createOptions() {
      let options = [];
  
      for (let i = 0; i < this.props.list.length; i++) {
        options.push(
          <a
            className="dropdown-item"
            onClick={() => {
              this.setState({ selection: i });
              this.props.onPicked(i);
            }}
          >
            {this.props.getText(i)}
          </a>
        );
      }
  
      return options;
    }
  
    render() {
      const pickerOptions = this.createOptions();
  
      return (
        <div className={"btn-group float-right mb-3" + this.props.classExtension}>
          <button
            type="button"
            className="btn btn-primary dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {this.props.getText(this.state.selection)}
          </button>
          <div className="dropdown-menu">{pickerOptions}</div>
        </div>
      );
    }
  }
  