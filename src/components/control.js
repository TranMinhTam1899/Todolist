import React, { Component } from "react";
import Search from "./search";

class Control extends Component {
  render() {
    return (
      <div className="row my-3">
        <Search onSearch={this.props.onSearch} />
      </div>
    );
  }
}
export default Control;
